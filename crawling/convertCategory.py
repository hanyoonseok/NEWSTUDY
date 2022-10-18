#!/usr/bin/env python3.8
# coding: utf-8


# 수집한 카테고리를 db에 저장할 c_id로 매핑

from datetime import datetime
import os
import pandas as pd

category = {"uk" : 95,
"europe" : 75,
"sport" : 48,
"football" : 50,
"sports_golf" : 51,
"sports_nascar" : 48,
"sports_ncaaf" : 41,
"sports_mlb" : 44,
"sports_nfl" : 41,
"sports_soccer" : 59,
"nletter_2022" : 21,
"sports_mls" : 59,
"news_2022" : 21,
"entertainment_tv" : 3,
"opinion_columnists" : 24,
"sports_tennis" : 61,
"sports_nba" : 44,
"news_politics" : 25,
"travel_news" : 17,
"money_personalfinance" : 4,
"money_food" : 4,
"opinion_policing" : 24,
"tech_columnist" : 63,
"sports_nhl" : 53,
"news_world" : 74,
"sports_college" : 48,
"news_nation" : 23,
"entertainment_celebrities" : 3,
"money_2022" : 1,
"entertainment_movies" : 10,
"sports_ftw" : 49,
"sports_motor" : 55,
"entertainment_music" : 11,
"Travel" : 17, 
"Health" : 8, 
"Sports" : 48, 
"Politics" : 25, 
"US" : 97, 
"International" : 74, 
"Entertainment" : 3, 
"Business" : 29, 
"Technology" : 63, 
"Lifestyle" : 4, 
"Weird" : 37, 
"News" : 21, 
"ABCNews" : 21, 
"2020" : 21, 
"Primetime" : 21, 
"Nightline" : 21, 
"Live" : 4, 
"WNT" : 21, 
"theview" : 21,
"ThisWeek" : 21,
"Staging" : 21,
"GMA" : 69,
"Press_Release" : 21,
"Site" : 21,
"Photos" : 4,
"WhatWouldYouDo" : 18,
"Test" : 4,
"VR" : 63,
"Unit" : 21,
"PollingUnit" : 21,
"motorsport" : 55}


def convertCategory(news_df):
    
    # 카테고리 매핑 (값 변경)
    news_df.replace({'c_id': category}, inplace=True)   
    
    # 미분류된 카테고리 변환
    checkUnchangedCategory(news_df)


def checkUnchangedCategory(news_df):
    
    unchanged_category = set()
    idx_list = news_df.index.to_list()
    
    for idx in idx_list : 
        if(type(news_df.loc[idx]['c_id'])== str) :
            unchanged_category.add(news_df.loc[idx, 'c_id'])
            news_df.loc[idx,'c_id'] = 37    # other_etc
            
    with open("./unchangedCategory.txt", "w") as file:
        file.write(str(unchanged_category))

