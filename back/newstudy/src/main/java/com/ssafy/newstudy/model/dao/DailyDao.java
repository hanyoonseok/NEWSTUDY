package com.ssafy.newstudy.model.dao;

import com.ssafy.newstudy.model.dto.DailyResponseDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DailyDao {
    public List<DailyResponseDto> selectDailyKeyword(Integer c_id);
}
