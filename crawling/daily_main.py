#!/usr/bin/env python3.8
# coding: utf-8

# news data crawling main code

import pymysql
from sqlalchemy import create_engine
from datetime import datetime, timedelta
pymysql.install_as_MySQLdb()
import MySQLdb
from tqdm import tqdm
import pickle
import pandas as pd

# 사용자 모듈 import
import daily_cnn as cnn
import daily_usaToday as usaToday
import daily_abcNews as abcNews
import daily_fox as fox
from getPOS import getPOS
from convertCategory import convertCategory


def addcount(x) :
    if len(str(x)) > 4 :
        return 1
    else :
        return 0


# DB에 저장할 Dataframe 설정
column_name = ["c_id", "title", "content", "origin", "url", "level", "date", "thumbnail"]
news_df = pd.DataFrame(columns=column_name)

# 크롤링
origin_list = [usaToday, abcNews, fox]
for origin in tqdm(origin_list):
    news_df = origin.crawling(news_df)


# 내용 > 300 만 남김
news_df = news_df[news_df['content'].apply(lambda x : len(str(x)) > 300)]

# 썸네일 있는거 카운트 올림
news_df["cnt"] = news_df["thumbnail"].apply(lambda x : addcount(x))


# 레벨 부여
news_df = getPOS(news_df)

# 카테고리 변환
convertCategory(news_df)

# 인덱스 재정렬
news_df = news_df.reset_index(drop=True)



# DB로 저장
db_connection_str = 'mysql+pymysql://newstudy:[NEWSTUDY_PW]@j7b207.p.ssafy.io/newstudy'
db_connection = create_engine(db_connection_str)
conn = db_connection.connect()

# news db에 넣기
news_df.to_sql(name='news', con=db_connection, if_exists='append',index=False)  

