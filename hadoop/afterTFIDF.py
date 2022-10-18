#!/usr/bin/env python
# coding: utf-8

from datetime import datetime
import os
import pandas as pd
import pymysql
from tqdm import tqdm
from sqlalchemy import create_engine
from sklearn.metrics.pairwise import cosine_similarity

pymysql.install_as_MySQLdb()
import MySQLdb


def makePibot(input_df):
    # 피벗 테이블 형성
    table = pd.pivot_table(input_df, values="TF-IDF", index='n_id', columns=['word']).fillna(0)
    table['n_id'] = table.index # 컬럼 값 추가
    table = table[table.columns.to_list()[::-1]] # 역순으로 정렬
    return table

def connectMysql():
#     db_connection_str = 'mysql+pymysql://newstudy:dhdwhf7xladb!@localhost/newstudy' # 로컬
    db_connection_str = 'mysql+pymysql://newstudy:gksdbstjr555!mysql@j7b207.p.ssafy.io/newstudy' # 서버
    db_connection = create_engine(db_connection_str)
#     conn = db_connection.connect()
    return db_connection

def getKeyword(db_connection, table) :
    
    # 핵심단어 테이블 생성
    column_name = ["n_id", "eng"]
    keyword_df = pd.DataFrame(columns=column_name)
    
    # 핵심단어 추출
    idx_list = table.index
    for idx in tqdm(idx_list): 
        tmp_dict = table.loc[idx].to_dict()
        tmp_dict = dict(sorted(tmp_dict.items(), key = lambda item: item[1], reverse = True))

        keyword_list = list(tmp_dict.keys())
        cnt = 0
        for keyword in keyword_list :
            if len(keyword) > 50 : 
                break
            if cnt >= 10 :
                break
            df = pd.DataFrame({"n_id":idx, "eng":keyword}, index = [0])
            keyword_df = pd.concat([keyword_df,df])
            cnt += 1
        
    # keyword db에 넣기
    keyword_df.to_sql(name='keyword', con=db_connection, if_exists='append',index=False)  

def getRecommandNews(db_connection, table) :
    
    # 관련 기사 테이블 생성
    column_name = ["n_id", "recommend"]
    ref_df = pd.DataFrame(columns=column_name)
    
    # 코사인 유사도 계산
    idx_list = table.index
    cos_sim_df = pd.DataFrame(cosine_similarity(table, table), columns = idx_list, index = idx_list)

    # 유사도 높은 순으로 추출
    for idx in tqdm(idx_list): 
        tmp_dict = cos_sim_df.loc[idx].to_dict()
        tmp_dict = dict(sorted(tmp_dict.items(), key = lambda item: item[1], reverse = True))

        ref_list = list(tmp_dict.keys())
        for ref in ref_list[1:7] :
            df = pd.DataFrame({"n_id":idx, "recommend":ref}, index = [0])
            ref_df = pd.concat([ref_df,df])
            
    # ref_news db에 넣기
    ref_df.to_sql(name='ref_news', con=db_connection, if_exists='append',index=False)  

