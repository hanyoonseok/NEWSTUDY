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
     * 카테고리 아이디를 받아 해당 카테고리의 빈출단어를 보여준다
     * @param c_id
     * @return 빈출단어
     */
    public List<DailyResponseDto> getDailyKeyword(Integer c_id){
        return dailyDao.selectDailyKeyword(c_id);
    }
}
