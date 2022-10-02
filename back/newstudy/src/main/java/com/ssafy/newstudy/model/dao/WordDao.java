package com.ssafy.newstudy.model.dao;

import com.ssafy.newstudy.model.dto.WordResponseDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WordDao {
    List<WordResponseDto> selectWordTestList();
    List<WordResponseDto> selectWordGameList();
}
