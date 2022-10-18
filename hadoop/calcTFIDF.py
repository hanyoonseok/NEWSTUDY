#!/usr/bin/env python
# coding: utf-8


import findspark
findspark.init()
import pandas as pd
import os
import numpy as np

from pyspark.sql.types import StructType,StructField, StringType, IntegerType
from pyspark.sql import SparkSession
from pyspark import SparkConf, SparkContext

import pymysql
from sqlalchemy import create_engine
pymysql.install_as_MySQLdb()
import MySQLdb

import math
from pyspark.sql.functions import *


#pandas future warning
warnings.simplefilter(action='ignore', category=FutureWarning) 
sc = SparkContext.getOrCreate()
spark = SparkSession(sc)

    
os.environ["PYARROW_IGNORE_TIMEZONE"] = "1"


# 불용어 설정
def setStopwords():
    # 구분자
    split_end_str = '@@div' # 종료 구분자
    split_subtitle = '@@divsubtitle' # 소제목 구분자
    split_image = '@@divimg' # 이미지 구분자

    stop_words = set()
    stop_words.add(split_end_str)
    stop_words.add(split_subtitle)
    stop_words.add(split_image)
    stop_words.update(['--', '—', '', 'time', 'told', 'day', 'news', 'people'])

    os.getcwd()
    f = open('./stopword.txt', 'r', encoding='UTF-8')
    lines = f.readlines()
    for i in lines:
        stop_words.add(i.replace('\n',''))
    return stop_words
    
    
# 데이터 가져오기 
def getNewsData(select_quary):
    global sc
    global spark
    sc = SparkContext.getOrCreate()
    spark = SparkSession(sc)

    #서버연결
    db_connection_str = 'mysql+pymysql://newstudy:gksdbstjr555!mysql@j7b207.p.ssafy.io/newstudy' # 서버
    db_connection = create_engine(db_connection_str)
    conn = db_connection.connect()

    #df = pd.read_sql_table('category', conn)
    result = pd.read_sql_query(select_quary, conn)
    result = result.dropna(axis='columns', how='all')
    documents = spark.createDataFrame(result)

    # rdd to dataframe
    df = (documents
      .rdd
      .map(lambda x : (x.n_id, x.c_id, x.content))
      .toDF()
      .withColumnRenamed("_1","news_id")
      .withColumnRenamed("_2","category_id")
      .withColumnRenamed("_3","content"))

    spark.conf.set("spark.sql.execution.arrow.pyspark.enabled", "true")
    return df.toPandas()


# 불용어 제거
def removeStopwords(stop_words, dataframe):
    result_data = []

    index_list = dataframe.index.to_list()
    for i in index_list:
        strr = dataframe.loc[i]["content"].lower().replace("subtitle", "").replace("@@div", "다빈").replace("\n", "다빈").replace("img", "다빈").split("다빈")

        words = []
        for s in strr :
            doc = nlp(s)
            for tok in doc:
                if tok.pos_ in pos and len(str(tok))>2 :
                    words.append(str(tok))

        for word in words:
            if word.isalpha() and word not in stop_words :
                 result_data.append((dataframe.loc[i]["news_id"], word))
                    
    return result_data


# TF-IDF 계산
def calcTFIDF(result_data):
    global spark


    lines=sc.parallelize(result_data)
    map1=lines.flatMap(lambda x: [((x[0],x[1]),1)])

    reduce=map1.reduceByKey(lambda x,y:x+y)
    tf=reduce.map(lambda x: (x[0][1],(x[0][0],x[1])))

    map3=reduce.map(lambda x: (x[0][1],(x[0][0],x[1],1)))
    map4=map3.map(lambda x:(x[0],x[1][2]))
    reduce2=map4.reduceByKey(lambda x,y:x+y)
    idf=reduce2.map(lambda x: (x[0],math.log10(len(result_data)/x[1])))
    rdd=tf.join(idf)
    rdd=rdd.map(lambda x: (x[1][0][0],(x[0],x[1][0][1],x[1][1],x[1][0][1]*x[1][1]))).sortByKey()
    rdd=rdd.map(lambda x: (x[0],x[1][0],x[1][1],x[1][2],x[1][3]))
    
    result = rdd.collect()

    spark.stop()

    return pd.DataFrame(result, columns=["n_id","word","TF","IDF","TF-IDF"])



