package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.model.dao.NewsDao;
import com.ssafy.newstudy.model.dto.NewsRequestDto;
import com.ssafy.newstudy.model.dto.NewsResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {
    private final NewsDao newsDao;

    /**
     * 뉴스 id를 받아서 해당 뉴스를 리턴
     * @param n_id
     * @return 해당 뉴스
     */
    public NewsResponseDto getNews(Integer n_id) {
        return newsDao.selectNews(n_id);
    }

    /**
     * 뉴스 검색 조건 받아서 해당하는 뉴스 리스트를 리턴
     * @param newsRequestDto
     * @return 뉴스 리스트
     */
    public List<NewsResponseDto> getNewsList(NewsRequestDto newsRequestDto) {
        return newsDao.selectNewsList(newsRequestDto);
    }

    /**
     * 뉴스 검색 조건 받아서 해당하는 뉴스 카운트를 리턴
     * @param newsRequestDto
     * @return total_cnt
     */
    public Integer getSearchListTotalCnt(NewsRequestDto newsRequestDto){
        return newsDao.selectNewsListCnt(newsRequestDto);
    }

    /**
     * 뉴스 id를 받아서 해당 뉴스의 keyword를 리턴
     * @param n_id
     * @return 해당 뉴스 keyword (string) 리스트
     */
    public List<String> getNewsKeyword(Integer n_id) {
        return newsDao.getNewsKeyword(n_id);
    }

    /**
     * 조회수 상위 10개씩 기사를 가져온다
     * @return 뉴스 리스트
     */
    public List<NewsResponseDto> getNewsHot() {
        return newsDao.selectNewsListOrderByCnt();
    }

    /**
     * 관련 기사를 가져온다
     * @param n_id
     * @return 뉴스 리스트
     */
    public List<NewsResponseDto> getNewsRelated(Integer n_id) {
        return newsDao.selectRelatedNewsList(n_id);
    }

    /**
     * 추천 기사를 가져온다
     * @param
     * @return 뉴스 리스트
     */
    public List<NewsResponseDto> getNewsRecommend(NewsRequestDto newsRequestDto) {
        return newsDao.selectRecommendNewsList(newsRequestDto);
    }

    /**
     * News테이블의 cnt를 하나 올려준다
     * @param n_id
     */
    public void updateViewCnt(Integer n_id){
        newsDao.updateViewCnt(n_id);
    }

    /**
     * categoryid로 title 또는 content를 센다
     * @param map
     * @return
     */
    public Integer selectNewsCountByCategory(HashMap map){
        return newsDao.selectNewsCountByCategory(map);
    }
}
