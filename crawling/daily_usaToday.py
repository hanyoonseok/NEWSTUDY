#!/usr/bin/env python
# coding: utf-8


# news data crawling from USA TODAY

from datetime import datetime, timedelta
import requests
from bs4 import BeautifulSoup
from bs4 import BeautifulSoup, NavigableString, Tag
from tqdm import tqdm
from time import sleep
import pandas as pd


def crawling(news_df):
    # 구분자
    separator = "@@div"
    separator_subTitle = "@@divsubtitle"
    separator_image = "@@divimg"
    
    # 달 목록
    month_list = ['january', 'february', 'march', 'april', 'may', 'june', 
                  'july', 'august', 'september', 'october', 'november', 'december']

    # 제외할 카테고리 (하위 카테고리 기준)
    excepted_categorys = ['sports-betting', 'reviewed']

    # 이미지 찾을 attribute 목록
    img_attr_list = ["data-gl-src", "src"] 

    # 저장되지 않은 기사 url 목록
    unsaved_list = [] 
    passed_list = []

    df_idx = 0

    # 저장된 기간 (2022년9월21일 ->220921)
    today_datetime = datetime.today() - timedelta(1)

    today = str(today_datetime.year) + "/" + month_list[today_datetime.month-1] + "/" + str(today_datetime.day)
    url_main = "https://www.usatoday.com/sitemap/" + today  + "/"

    html = requests.get(url_main).text
    soup = BeautifulSoup(html, 'html.parser')

    pages = len(soup.find('ul', attrs={"class":"sitemap-list sitemap-pagination"}))

    for p in range(pages) :
        if p > 0 :
            url = url_main + '?page=' + str(p+1)
            html = requests.get(url).text
            soup = BeautifulSoup(html, 'html.parser')

        article_list = soup.find_all('ul', attrs={"class":"sitemap-list"})[1].find_all('li')

        for article in article_list :

            dict = {}
            dict['origin'] = "USA TODAY"
            dict['url'] = article.find('a').get('href')
            dict['title'] = article.find('a').text

            today_datetime = datetime.today() - timedelta(1)
            d = today_datetime.day
            day = (("0"+str(d)) if (d<10) else str(d))
            m = today_datetime.month
            month = (("0"+str(m)) if (m<10) else str(m))

            dict['date'] = str(today_datetime.year) + "-" + month + "-" + day

            # 기사 상세
            try : 
                # BeautifulSoup 사용
                html = requests.get(dict['url']).text
                soup = BeautifulSoup(html, 'html.parser')

                # 카테고리
                url_info = dict['url'].replace("https://www.usatoday.com/", "").split("/")
                dict['c_id'] = url_info[1] + "_" + url_info[2] 

                if (url_info[0] != "story") or (url_info[2] in excepted_categorys) : # 제외할 카테고리
                    continue


                # 본문 내용
                content = ""
                isThumbnail = False

                contents = soup.find('div', attrs={"class":"gnt_ar_b"})

                if contents is None :
                    passed_list.append(dict['url'])
                    continue


                for tag in contents.children :
                    if isinstance(tag, NavigableString):
                            continue

                    elif isinstance(tag, Tag):

                        if(tag.name == 'p') : # 본문
                            if tag.text[:7] == "Review:" :
                                continue
                            else :
                                content += tag.text +"\n"
                                if tag.text.find("Contributing:") >= 0:
                                    break
                        elif(tag.name == 'figure') : # 이미지
                            for attr in img_attr_list :
                                img_src = tag.find('img').get(attr)
                                if img_src is not None :
                                    break

                            content += separator_image + img_src + separator

                            if isThumbnail is False :
                                dict["thumbnail"] = img_src
                                isThumbnail = True


                if len(content) > 0 :
                    dict['content'] = content
                    df = pd.DataFrame(dict, index = [df_idx])
                    df_idx += 1
                    news_df = pd.concat([news_df,df])
                else :
                    unsaved_list.append(dict['url'])

            except :
                print('pass => ' + dict['url'])
                passed_list.append(dict['url'])

    print ("USA TODAY 데이터 수집 완료")
    
    return news_df

