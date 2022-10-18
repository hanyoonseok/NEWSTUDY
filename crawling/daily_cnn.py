#!/usr/bin/env python
# coding: utf-8


# news data crawling from CNN

from datetime import datetime, timedelta

from selenium import webdriver
from selenium.webdriver.common.by import By
import requests
from bs4 import BeautifulSoup
from bs4 import BeautifulSoup, NavigableString, Tag
from tqdm import tqdm

import pandas as pd


def driver_setting():
    # selenium 사용을 위한 크롬 드라이버 설정
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome("chromedriver", options=chrome_options)
    return driver


def crawling(news_df):
    # 구분자
    separator = "@@div"
    separator_subTitle = "@@divsubtitle"
    separator_image = "@@divimg"
    
    # 저장되지 않은 기사 url 목록
    unsaved_list = []

    # 오늘 날짜 계산
    today_datetime = datetime.today() - timedelta(1)
    d = today_datetime.day
    day = (("0"+str(d)) if (d<10) else str(d))
    m = today_datetime.month
    month = (("0"+str(m)) if (m<10) else str(m))
    today = str(today_datetime.year) + "-" + month + "-" + day

    driver = driver_setting()
    
    url = 'https://edition.cnn.com/article/sitemap-2022.html'
    driver.get(url)
    month_tags = driver.find_elements(By.CLASS_NAME, 'month-section-container')

    month_list = []
    for tag in month_tags :
        category_str = tag.text.replace("United Kingdom", "uk")
        category_list = category_str.split("\n")
        del category_list[0]
        month_list.append(category_list)

    try : 
        # 카테고리별
        month = today_datetime.month
        for category in month_list[month-1] :
            url = 'https://edition.cnn.com/' + category + '/article/sitemap-2022-' + str(month) + '.html'
            driver.get(url)

            date_list = driver.find_elements(By.CLASS_NAME, 'date') # 날짜
            url_list = driver.find_elements(By.CLASS_NAME, 'sitemap-link')

            for i in range(len(url_list)):
                if(url_list[i].text == 'Title') :
                    continue
                if(date_list[i].text != today) :
                    continue

                dict = {}

                dict['origin'] = "CNN"

                # 제목
                dict['title'] = url_list[i].text

                # url
                dict['url'] = url_list[i].find_element(By.TAG_NAME, 'a').get_attribute('href') 

                html = requests.get(dict['url']).text
                soup = BeautifulSoup(html, 'html.parser')

                # 발행일시 및 카테고리
                url_info = dict['url'].replace("https://edition.cnn.com/", "").split("/")
                dict['date'] = url_info[0] + "." + url_info[1] + "." + url_info[2]
                dict['c_id'] = url_info[3]

                if len(url_info) > 6 :
                    dict['c_id'] += '_' + url_info[4]

                # 본문 내용
                content = ""

                class_list = ["article__content", "article__main", "article__content-container"]

                # 본문 내용 - read-all 후 부분    
                for class_name in class_list :

                    tag_list = soup.find('div', attrs={"class":class_name})

                    if tag_list is not None :

                        # 기사 상세 수집
                        isThumbnail = False

                        for tag in tag_list.children:
                            if isinstance(tag, NavigableString):
                                continue

                            elif isinstance(tag, Tag):

                                if(tag.name == 'p') : # 본문
                                    if(tag.text[1:5]=='READ') : # 링크 첨부된 부분 제거
                                        continue
                                    else :
                                        content += tag.text[7:]

                                elif(tag.name == 'h2') : # 소제목
                                    content += separator_subTitle + tag.text[5:] + separator

                                elif ((tag.text.find('image__dam-img')) and (tag.find('img') is not None)): # 이미지
                                    img_src = tag.find('img').get('src')
                                    content += separator_image + img_src + separator
                                    if isThumbnail is False :
                                        dict["thumbnail"] = img_src
                                        isThumbnail = True
                        break

                if len(content) > 0 :
                    dict['content'] = content
                    thumbnail_tag = soup.select_one('body > div.layout__content-wrapper.layout-with-rail__content-wrapper > section.layout__wrapper.layout-with-rail__wrapper > section.layout__main-wrapper.layout-with-rail__main-wrapper > section.layout__main.layout-with-rail__main > article > section.body.tabcontent.active > main > div.image__lede.article__lede-wrapper > div > div.image__container > picture > img')
                    if thumbnail_tag is not None : 
                        thumbnail = thumbnail_tag.get('src')
                        dict['thumbnail'] = thumbnail
                    df = pd.DataFrame(dict, index = [0])
                    news_df = pd.concat([news_df,df])
                else :
                    unsaved_list.append(dict['url'])

    except :
        print(year + " of", m, ',', category, ' pass')
    
    # 메모리 해제 후 드라이버 확실히 종료
    driver.quit()
    
    print ("CNN 데이터 수집 완료")
    
    return news_df
