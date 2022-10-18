# count dailyword from news


import findspark
findspark.init()

# pyspark 사용
import pyspark

# csv로 받아와서 df로 사용 
# 임시 -> 나중에는 mysql과 연결하여 df로 사용할 것
import pandas as pd

from pyspark import SparkContext
from pyspark.sql import SparkSession
# from nltk.corpus import stopwords

import os
os.environ["PYARROW_IGNORE_TIMEZONE"] = "1"

import pymysql
from sqlalchemy import create_engine
pymysql.install_as_MySQLdb()
import MySQLdb

import datetime
import requests
from googletrans import Translator

# 구분자
split_end_str = '@@div' # 종료 구분자
split_subtitle = '@@divsubtitle' # 소제목 구분자
split_image = '@@divimg' # 이미지 구분자

# pyspark에 데이터 연결
# db에서 어제자 뉴스 가져오기
db_connection_str = 'mysql+pymysql://newstudy:gksdbstjr555!mysql@j7b207.p.ssafy.io/newstudy'
db_connection = create_engine(db_connection_str)
conn = db_connection.connect()
result = pd.read_sql_query('SELECT * FROM news WHERE date(`date`) = date(now() - INTERVAL 1 DAY)', conn)
news_df_pandas = result.dropna(axis='columns', how='all')

# 영어 불용어 가져오기
stop_words = set()
stop_words.add(split_end_str)
stop_words.add(split_subtitle)
stop_words.add(split_image)
stop_words.update(['--', '—', '', 'time', 'told', 'day', 'news', 'people'])
# print(stop_words)
os.getcwd()
f = open('/home/j7b207/stopword.txt', 'r', encoding='UTF-8')
lines = f.readlines()
for i in lines:
    stop_words.add(i.replace('\n',''))

# pyspark 사용설정
spark = SparkSession.builder\
                    .master('local[*]')\
                    .appName('daily_wordcount')\
                    .getOrCreate()
spark.conf.set("spark.sql.execution.arrow.pyspark.enabled", "true")
# pandas의 df를 spark의 dataframe으로
news_df = spark.createDataFrame(news_df_pandas)
# news_df.select("*").collect() # 전체 보여주기

def lowerclass(x):
    return ''.join([i.lower() for i in x])

def deletesubtitle(x):
    if x.startswith('subtitle'):
        x = x.replace('subtitle', '')
    return x

def deletehttps(x):
    if x.startswith('https'):
        return false
    return true

# 번역기
translator = Translator()

# 카테고리별로 가져오기
category = [[0, 97], [1, 19], [20, 27], [28, 39], [40, 61], [62, 66]]
world_category = [67, 97]

# 각 카테고리 별로 돌리기
for cate in range(0, len(category)):
    # 카테고리 범위 안에 있는 뉴스 가져오기
    tmp_news_df = news_df[news_df['c_id'].between(category[cate][0], category[cate][1])]

    # 가져온 모든 news의 content를 단어로 분리
    # news_rdd = tmp_news_df.rdd.map(lambda x: x.content.replace(split_image,'').replace(split_subtitle,'').replace(split_end_str,'').split())

    # 링크 없애기
    news_rdd = tmp_news_df.rdd.flatMap(lambda x : x.content.split(split_end_str))
    news_rdd = news_rdd.flatMap(lambda x : x.split('\n'))
    news_rdd = news_rdd.filter(lambda x : not x.startswith('img'))

    # 만약 subtitle로 시작하면 'subtitle'만 없애주기 (서브타이틀은 기사 내용임)
    news_rdd = news_rdd.map(deletesubtitle)

    # 소문자 변경
    news_rdd = news_rdd.map(lowerclass)

    # 가져온 모든 news의 content를 단어로 분리
    news_rdd = news_rdd.flatMap(lambda x : x.split())

    # 가져온 용어중 불용어 제거 (1차)
    news_rdd = news_rdd.filter(lambda x: x.lower() not in stop_words)

    # 알파벳만 남긴다
    news_rdd = news_rdd.map(lambda x: ''.join(list(filter(str.isalpha, x))))

    # 위의 단어들 중 불용어 제거(2차)
    news_rdd = news_rdd.filter(lambda x: x.lower() not in stop_words)

    # 위의 단어들 중 http로 시작하면 제거
    news_rdd = news_rdd.filter(lambda x : not x.startswith('http'))

    # key - value 값으로 구성
    news_rdd = news_rdd.map(lambda x: (x,1))

    # pair RDD 생성
    news_rdd = news_rdd.groupByKey()
    news_rdd = news_rdd.mapValues(sum)
    # 결과가 있으면
    if not news_rdd.isEmpty():
        # pandas로 바꿈
        news_pandas = news_rdd.toDF().withColumnRenamed('_1', 'eng').withColumnRenamed('_2', 'cnt').toPandas()
        if not news_pandas.empty:
            # 지금은 db에 넣을 것이다 c_id = category[cate][0]으로 해서 넣을것
            news_pandas = news_pandas.sort_values(by = 'cnt', ascending=False, ignore_index=True).head(50)

            # 만약 전체 카테고리 wordcount이고, 상위 10개 안에 든다면 api 호출 후 번역하여 kor에 저장
            if(category[cate][0] == 0):
                for i in range(0, 10):
                    tmp_trans_kor = translator.translate(news_pandas.loc[i,'eng'], dest='ko')
                    news_pandas.loc[i,'kor'] = tmp_trans_kor.text

            news_pandas.insert(1, 'c_id', category[cate][0])
            news_pandas.insert(2, 'date', datetime.datetime.now() - datetime.timedelta(1))
            news_pandas.head(50).to_sql(name='daily_word', con = db_connection, index=False, if_exists='append')
            # print(news_pandas.head(50))

# 나라별 넣기
for cate in range(world_category[0], (world_category[1]+1)):
    # 카테고리 범위 안에 있는 뉴스 가져오기
    tmp_news_df = news_df[news_df['c_id'] == cate]

    # 링크 없애기
    news_rdd = tmp_news_df.rdd.flatMap(lambda x : x.content.split(split_end_str))
    news_rdd = news_rdd.flatMap(lambda x : x.split('\n'))
    news_rdd = news_rdd.filter(lambda x : not x.startswith('img'))

    # 만약 subtitle로 시작하면 'subtitle'만 없애주기 (서브타이틀은 기사 내용임)
    news_rdd = news_rdd.map(deletesubtitle)

    # 소문자 변경
    news_rdd = news_rdd.map(lowerclass)

    # 가져온 모든 news의 content를 단어로 분리
    news_rdd = news_rdd.flatMap(lambda x : x.split())

    # 알파벳만 남긴다
    news_rdd = news_rdd.map(lambda x: ''.join(list(filter(str.isalpha, x))))

    # 위의 단어들 중 불용어 제거
    news_rdd = news_rdd.filter(lambda x: x.lower() not in stop_words)

    # key - value 값으로 구성
    news_rdd = news_rdd.map(lambda x: (x,1))

    # pair RDD 생성
    news_rdd = news_rdd.groupByKey()
    news_rdd = news_rdd.mapValues(sum)

    # 결과가 있으면
    if not news_rdd.isEmpty():
        # pandas로 바꿈
        news_pandas = news_rdd.toDF().withColumnRenamed('_1', 'eng').withColumnRenamed('_2', 'cnt').toPandas()
        if not news_pandas.empty:
            # db에 넣을 것이다 c_id = cate로 해서 넣을 것
            news_pandas = news_pandas.sort_values(by = 'cnt', ascending=False).head(50)
            news_pandas.insert(1, 'c_id', cate)
            news_pandas.insert(2, 'date', datetime.datetime.now() - datetime.timedelta(1))
            news_pandas.head(50).to_sql(name='daily_word', con = db_connection, index=False, if_exists='append')
            # print(news_pandas.head(50))
