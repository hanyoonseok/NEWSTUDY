#!/usr/bin/env python
# coding: utf-8

# performance analysis with spark, sklearn

import pandas as pd

from timeit import default_timer as timer
from datetime import timedelta
from sklearn.feature_extraction.text import TfidfVectorizer

import calcTFIDF
import afterTFIDF


# 불용어 설정
stop_words = calcTFIDF.setStopwords()
print("불용어 설정 완료")

# 데이터 가져오기
data = calcTFIDF.getNewsData('SELECT * FROM news WHERE n_id BETWEEN 1 AND 1000')
print("데이터 가져오기 완료")

# 불용어 제거
data = calcTFIDF.removeStopwords(stop_words, data)
print("불용어 제거 완료")

# TF-IDF 계산 - spark version
start = timer()
tfidf = calcTFIDF.calcTFIDF(data)
print("TF-IDF 계산 완료")
end = timer()
print("Spark Time elapsed: ", timedelta(seconds=end-start))

test_list = ["" for i in range(1001)]

print(test_list)
for d in data :
    test_list[d[0]] += d[1] + " "

# TF-IDF 계산 - sklearn version
start = timer()

tfidfv = TfidfVectorizer().fit(test_list)
# print(tfidfv.transform(test_list).toarray())
# print(tfidfv.vocabulary_)

print("TF-IDF 계산 완료")
end = timer()
print("sklearn Time elapsed: ", timedelta(seconds=end-start))

