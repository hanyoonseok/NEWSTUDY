package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.model.dao.ScrapDao;
import com.ssafy.newstudy.model.dto.ScrapRequestDto;
import com.ssafy.newstudy.model.dto.ScrapResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScrapService {
    private final ScrapDao scrapDao;

    /**
     * 유저를 받아서 해당 유저의 스크랩 뉴스 리스트를 돌려줌
     * @param u_id
     * @return 유저의 스크랩 리스트
     */
    public List<ScrapResponseDto> getScrap(Integer u_id) {
        return scrapDao.selectScrapList(u_id);
    }

    /**
     * 유저 뉴스 스크랩을 추가함
     * @param scrapRequestDto
     * @return 성공 row 수
     */
    public int addScrap(ScrapRequestDto scrapRequestDto) {
        int result = 0;
        try{
            result = scrapDao.insertScrap(scrapRequestDto);
        }catch(Exception e){
            return 0;
        }
        return result;
    }

    /**
     * 유저 뉴스 스크랩을 삭제함
     * @param scrapRequestDto
     * @return 성공 row 수
     */
    public int deleteScrap(ScrapRequestDto scrapRequestDto) {
        return scrapDao.deleteScrap(scrapRequestDto);
    }

    /**
     * 유저 뉴스 스크랩 갯수 확인
     * @param scrapRequestDto
     * @return
     */
    public int selectScrapCnt(ScrapRequestDto scrapRequestDto){
        return scrapDao.selectScrapCnt(scrapRequestDto);
    }
}
