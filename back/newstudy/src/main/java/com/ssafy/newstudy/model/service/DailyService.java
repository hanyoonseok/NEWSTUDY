package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.model.dao.DailyDao;
import com.ssafy.newstudy.model.dto.DailyResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DailyService {
    private final DailyDao dailyDao;

    /**
     * 카테고리 아이디를 받아 해당 카테고리의 그날 나온 단어를 보여준다
     * @param c_id
     * @return daily 단어
     */
    public List<DailyResponseDto> getDailyKeyword(Integer c_id){
        return dailyDao.selectDailyKeyword(c_id);
    }

    /**
     * 월드 소카테고리 아이디를 받아 해당 카테고리의 최근 단어 5개를 보여준다 (최근, cnt)
     * @param c_id
     * @return 단어
     */
    public List<DailyResponseDto> getWorldKeyword(Integer c_id){
        return dailyDao.selectWorldKeyword(c_id);
    }
}
