package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.model.dao.DailyDao;
import com.ssafy.newstudy.model.dto.DailyResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
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
        HashMap map = new HashMap();
        map.put("c_id", c_id);
        //해당 카테고리의 가장 최근 daily_word는?
        String date = dailyDao.findDailyKeywordLastDate(c_id);
        List<DailyResponseDto> resultList = new ArrayList<>();
        if(date != null){
            map.put("date", date);
            resultList = dailyDao.selectDailyKeyword(map);
        } //이게 없으면 아예 없는거임 => 줄 수가 없다..
        return resultList;
    }

    /**
     * daily world 카테고리 통합 - 워드클라우드용
     * @param
     * @return
     */
    public List<DailyResponseDto> getDailyWorldKeyword(){
        String date = dailyDao.findDailyWorldKeywordLastDate();
        if(date != null)
            return dailyDao.selectDailyWorldKeyword(date);
        else
            return new ArrayList<>();
    }

    /**
     * 월드 소카테고리 아이디를 받아 해당 카테고리의 최근 단어 5개를 보여준다 (최근, cnt)
     * 나라 태그용
     * @param c_id
     * @return 단어
     */
    public List<DailyResponseDto> getWorldKeyword(Integer c_id){
        return dailyDao.selectWorldKeyword(c_id);
    }
}
