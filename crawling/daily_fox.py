#!/usr/bin/env python
# coding: utf-8


# news data crawling from FOX NEWS

from datetime import datetime, timedelta
import requests
from bs4 import BeautifulSoup
from bs4 import BeautifulSoup, NavigableString, Tag
from tqdm import tqdm
import pandas as pd
import json


def get_article(url, thumbnail, category):
    # 구분자
    separator = "@@div"
    separator_subTitle = "@@divsubtitle"
    separator_image = "@@divimg"
    
    dict = {}
    dict['c_id'] = category
    dict['url'] = article_url
    dict['origin'] = 'foxnews'
    
    # BeautifulSoup 사용
    html = requests.get(dict['url']).text
    soup = BeautifulSoup(html, 'html.parser')
    
    # beautifulsoup 사용해서 페이지에서 정보 뽑아오기
    article_body =  soup.find('div', attrs={"class":'article-body'})
    article_content = article_body.children

    # 뉴스 제목
    title = soup.find('h1', attrs={"class":'headline'}).text
    title.replace("'", "\'")
    title.replace('"', '\"')
    dict['title'] = title
    
    # 날짜 포맷 맞추기
    try :
        date =  soup.find('div', attrs={"class":'article-date'}).text[11:]    
        date = date.split(' ')
    except :
        print(date)
    
    today_datetime = datetime.today() - timedelta(1)
    d = today_datetime.day
    day = (("0"+str(d)) if (d<10) else str(d))
    m = today_datetime.month
    month = (("0"+str(m)) if (m<10) else str(m))
    
    dict['date'] = str(today_datetime.year) + "-" + month + "-" + day

    dict['thumbnail'] = thumbnail
    
    content = ''
    imgCnt = 0
    for tag in article_content :
        if tag.name == 'div':
           # video타입 무시
            if tag.get("type") and tag.get("type") == 'video':
                continue
            article_img = tag.find('img')
            if article_img is not None and imgCnt > 0: 
                img_src= article_img.get("src")
                # 이미지중에 src 속성이 없는 경우 pass
                if article_img.get("src") is not None:
                    # 이미지중에 clear.gif 있는 경우 pass
                    if img_src == 'https://global.fncstatic.com/static/v/all/img/clear.gif' : 
                        continue
                    content += separator_image + img_src + separator
                    
            else : 
                continue
                
        elif tag.name == 'p' :
            a_tag = tag.find('a')
            if a_tag is not None: 
                strong_tag = a_tag.find('strong')
                if strong_tag is not None : 
                    # CLICK으로 시작하는 STRONG태그 pass
                    if strong_tag.text.find('CLICK') >= 0 : 
                        continue
                    else : 
                        # STRONG이 포함된 부분만 구분자를 넣어주고, 나머지 부분은 그대로 넣어주기
                        sub_title = separator_subTitle + strong_tag.text + separator
                        strong_text = tag.text.replace(strong_tag.text, sub_title)
                        content += strong_text
                else : 
                    content += tag.text  
            else: 
                content += tag.text
        imgCnt +=1
    
    content.replace("'", "\'")
    content.replace('"', '\"')
    dict['content'] = content
    
    return pd.DataFrame(dict, index = [0])


def dateToInt(date):
    tmp = date.split("-")
    return int(tmp[0])*10000 + int(tmp[1])*100 + int(tmp[2])


def crawling(news_df):

    # 크롤링할 사이트 메인으로 가기
    category = ['us', 'tech', 'food-drink','health', 'science', 'world', 'person', 'auto', 'politics', 'media', 'opinion', 'business', 'entertainment', 'sports', 'lfestyle', 'weather']

    # 저장된 기간 (2022년9월21일 ->220921)
    today_datetime = datetime.today() - timedelta(1)
    d = today_datetime.day
    day = (("0"+str(d)) if (d<10) else str(d))
    m = today_datetime.month
    month = (("0"+str(m)) if (m<10) else str(m))

    today_date = str(today_datetime.year) + "-" + month + "-" + day
    today_date_int = dateToInt(today_date)

    for c in tqdm(range(len(category)), desc='category') : 
        find_today = False

        origin_url = 'https://www.foxnews.com/api/article-search?searchBy=categories&values=fox-news%2F' + category[c]

        for i in range(0, 10000, 100) :
            if find_today : 
                break
            datas = {
                'from' : i,
            }

            json_txt = requests.get(origin_url, params=datas).text
            document = json.loads(json_txt)
            for j in range(len(document)) : 
                if document[j]['category']['name'] == "VIDEO" : 
                    continue 
                news_date = document[j]['publicationDate'][:10]

                if dateToInt(news_date) > today_date_int : # 오늘 이후 날짜 수집 안함
                    continue
                if dateToInt(news_date) < today_date_int : # 오늘 이전 날짜 pass
                    find_today = True
                    break

                article_url = 'https://www.foxnews.com' + document[j]['url']
                try : 
                    fox_df = get_article(article_url, document[j]['imageUrl'], document[j]['category']['url'][10:].replace('/','_'))
                    news_df = pd.concat([news_df,fox_df])
                except : 
                    continue

    print ("FOX 데이터 수집 완료")
    
    return news_df

