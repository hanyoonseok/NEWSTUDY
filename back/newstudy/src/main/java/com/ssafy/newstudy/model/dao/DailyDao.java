package com.ssafy.newstudy.model.dao;

import com.ssafy.newstudy.model.dto.DailyResponseDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface DailyDao {
    public List<DailyResponseDto> selectDailyKeyword(HashMap map);
    public List<DailyResponseDto> selectWorldKeyword(Integer c_id);
    public List<DailyResponseDto> selectDailyWorldKeyword(String date);
    public String findDailyKeywordLastDate(Integer c_id);
    public String findDailyWorldKeywordLastDate();
}
