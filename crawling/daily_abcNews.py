#!/usr/bin/env python3.8
# coding: utf-8


# news data crawling from ABC NEWS

from datetime import datetime, timedelta
import requests
from bs4 import BeautifulSoup
from bs4 import BeautifulSoup, NavigableString, Tag
from tqdm import tqdm
import pandas as pd


def month_string_to_number(string):
    m = {
        'January': '01',
        'February': '02',
        'March': '03',
        'April':'04',
         'May':'05',
         'June':'06',
         'July':'07',
         'Augist':'08',
         'September':'09',
         'October':'10',
         'November':'11',
         'December':'12'
        }

    try:
        out = m[string]
        return out
    except:
        raise ValueError('Not a month')


def crawling(news_df):
    
    html = requests.get("https://abcnews.go.com/meta/sitemap?page=date&sub=2022").text
    soup = BeautifulSoup(html, 'html.parser')

    smresults = soup.find('div',attrs={"class":"sm-results"}).find_all('div')

    pages = []
    for res in smresults :
        atags = res.find_all('a')

        for atag in atags :
            pageurl = atag.get('href')
            pages.append(pageurl)

    pages.reverse()
    today_datetime = datetime.today() - timedelta(1)

    today = str(today_datetime.year) + "/" + str(today_datetime.month) + "/" + str(today_datetime.day)
    results = []

    for page in tqdm(pages, desc="page progress") : 
        try :
            html = requests.get("https://abcnews.go.com/meta/sitemap"+page).text
            soup = BeautifulSoup(html, 'html.parser')
            soup
        except :
            continue
        flag = True

        articles = soup.find_all('li', attrs={"class":"sm-results-li"})
        articleurls = []
        for article in articles :
            articleurl = article.find('a').get('href')
            articleurls.append(articleurl)

        articleurls.reverse()

        # 페이지 내의 기사들 조회
        for articleurl in articleurls :
            try:
                html = requests.get(articleurl).text
                soup = BeautifulSoup(html, 'html.parser')
                soup
            except :
                continue

            category = articleurl.split('/')[3]
            title = ''
            content = ''
            origin = 'ABC NEWS'
            url = articleurl
            date = ''
            thumbnail = ''
            
            # 오늘 날짜 값 추가
            today_datetime = datetime.today() - timedelta(1)
            d = today_datetime.day
            day = (("0"+str(d)) if (d<10) else str(d))
            m = today_datetime.month
            month = (("0"+str(m)) if (m<10) else str(m))

            date = str(today_datetime.year) + "-" + month + "-" + day
            

            # 기사 정보 구하기
            title = soup.select('#themeProvider > div.FITT_Article_main.exfBe.HZPhA.rQqmM.iHic.KrUxN.xflKQ.WLXON.AQuph.yMUze > span > div > div > span > div:nth-child(1) > h1')[0].text
            content_list = soup.select('#themeProvider > div.FITT_Article_main.exfBe.HZPhA.rQqmM.iHic.KrUxN.xflKQ.WLXON.AQuph.yMUze > span > div > div > span > article')[0].children
            content = ''
            dateArr = soup.select('#themeProvider > div.FITT_Article_main.exfBe.HZPhA.rQqmM.iHic.KrUxN.xflKQ.WLXON.AQuph.yMUze > span > div > div > span > div.ShareByline.rQqmM.rOGzA > div.rQqmM.HZPhA > div > div.rQqmM > div')[0].text.split(',')
            monthAndDate = dateArr[0].split(' ')

            if int(month_string_to_number(monthAndDate[0])) != today_datetime.month :
                flag = False
                break

            if int(monthAndDate[1]) > today_datetime.day :
                continue

            if int(monthAndDate[1]) < today_datetime.day :
                flag = False
                break

            for con in content_list :
                if con.name == 'p' :
                    content += con.text + "\n"
                elif con.name == 'div' :
                    try:
                        imgsrc = con.find('img').get('src')
                        content += "@@divimg"+imgsrc+"@@div"
                        if thumbnail == '':
                            thumbnail = imgsrc
                    except :
                        continue
                elif con.name == 'h2' :
                    content += "@@divsubtitle"+con.text+"@@div"

            try :
                thumbnail = soup.select('#themeProvider > div.FITT_Article_main.exfBe.HZPhA.rQqmM.iHic.KrUxN.xflKQ.WLXON.AQuph.yMUze > span > div > div > span > div.InlineImage.fnIPT > figure > picture > img')[0].get('src')
            except :
                empty = ''

            result = [category, title, content, origin, url, date, thumbnail]
            results.append(result)
        if flag == False :
            break;

    column_name = ["c_id", "title", "content", "origin", "url", "date", "thumbnail"]
    abcnews_df = pd.DataFrame(results, columns=column_name)

    news_df = pd.concat([news_df, abcnews_df])
    print ("ABC NEWS 데이터 수집 완료")
    
    return news_df

