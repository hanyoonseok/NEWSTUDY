#!/usr/bin/env python
# coding: utf-8


# get Part Of Speech

import pandas as pd
from tqdm import tqdm
import datetime
import spacy


def getPOS(news_df):
    # 구분자
    separator = "@@div"
    separator_subTitle = "@@divsubtitle"
    separator_image = "@@divimg"
    
    # 레벨 단어 csv 가져오기
    tmp_csv_name = 'ref_word'
    ref_word_df = pd.read_csv('/home/ubuntu/crawling/' + tmp_csv_name + '.csv')

    # contents에 제대로 된 값이 없는 경우 삭제
    delete_list = []
    
    # 품사 확인 라이브러리 설정 가져오기
    nlp = spacy.load("en_core_web_sm")

    # level 분류를 위한 커트라인
    cut_line = [2.847826086956522, 3.0, 3.1774891774891776, 3.3551401869158877, 3.515151515151515, 6.0]

    # news_df 인덱스 정리 후 가져오기
    news_df = news_df.reset_index(drop=True)
    idx_list = news_df.index.to_list()

    # 뉴스 하나씩 가져오기
    for idx in tqdm(idx_list): 
        # news_dict (hashMap 같은것) 초기화
        news_dict = {}

        # 구분자 삭제 및 작은 문장들로 나누기
        tmp_content_lines = news_df.loc[idx]['content'].replace(separator, '\n').replace(separator_subTitle, '\n').replace(separator_image, '\n')
        tmp_content_lines = tmp_content_lines.split('\n')

        for tmp_content in tmp_content_lines:
            doc = nlp(tmp_content)
            for token in doc:
                if token.pos_ == 'ADJ' or token.pos_ == 'ADV' or token.pos_ == 'CONJ' or token.pos_ == 'NOUN' or token.pos_ == 'VERB' :
                    tmp_pos = token.pos_
                    if token.pos_ == 'ADJ' :
                        tmp_pos = 'ADJECTIVE'
                    elif token.pos_ == 'ADV' :
                        tmp_pos = 'ADVERB'
                    elif token.pos_ == 'CONJ' :
                        tmp_pos = 'CONJUNCTION'
                    tmp_key = token.text.upper()+':'+tmp_pos
                    if tmp_key in news_dict.keys():
                        news_dict[tmp_key] = news_dict[tmp_key] + 1
                    else :
                        news_dict[tmp_key] = 1

        # 단어 전체 레벨 더하기 (나중에 total_level / len(news_dict) 하여 레벨 구할 것임 )
        total_level = 0

        # 해당 dict를 비교하여 레벨 확인
        # data frame 간 교집합
        tmp_word_df = pd.DataFrame(list(news_dict.items()),columns = ['eng','cnt']) 
        tmp_df = pd.merge(tmp_word_df, ref_word_df, on='eng')
        tmp_df['comb'] = tmp_df['level']*tmp_df['cnt']
        tmp_total_cnt = tmp_df['cnt'].sum()
        total_level = tmp_df['comb'].sum(axis=0)

        res = 0 if (tmp_total_cnt==0) else total_level/tmp_total_cnt

        # 값이 0이면 삭제
        if res == 0 :
            delete_list.append(idx)
        else :
            for i in range(6) :
                if res <= cut_line[i] :
                    news_df.loc[idx, 'level'] = i+1
                    break
    
    return news_df.drop(index=delete_list)

