#!/usr/bin/env python
# coding: utf-8


# news data preprocessing with Spark

from timeit import default_timer as timer
from datetime import timedelta

import calcTFIDF
import afterTFIDF

start = timer()


# 1. TF-IDF 계산
# 불용어 설정
stop_words = calcTFIDF.setStopwords()
print("불용어 설정 완료")

# 데이터 가져오기
data = calcTFIDF.getNewsData('select * from news where date = date(now() - INTERVAL 1 DAY)')
print("데이터 가져오기 완료")

# 불용어 제거
data = calcTFIDF.removeStopwords(stop_words, data)
print("불용어 제거 완료")

# TF-IDF 계산
tfidf = calcTFIDF.calcTFIDF(data)
print("TF-IDF 계산 완료")



# 2. 핵심단어 및 관련기사 저장
# db 연결
conn = afterTFIDF.connectMysql()
print("db 연결 완료")

# TF-IDF 피벗테이블 생성
table = afterTFIDF.makePibot(tfidf)
print("피벗테이블 생성 완료")

# 핵심단어 저장
afterTFIDF.getKeyword(conn, table)
print("핵심단어 저장 완료")

# 관련기사 저장
afterTFIDF.getRecommandNews(conn, table)
print("관련기사 저장 완료")


end = timer()
print("Time elapsed: ", timedelta(seconds=end-start))

