package com.ssafy.newstudy.model.dao;

import com.ssafy.newstudy.model.dto.ScrapRequestDto;
import com.ssafy.newstudy.model.dto.ScrapResponseDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ScrapDao {
    List<ScrapResponseDto> selectScrapList(Integer u_id);
    int insertScrap(ScrapRequestDto scrapRequestDto) throws Exception;
    int deleteScrap(ScrapRequestDto scrapRequestDto);
    int selectScrapCnt(ScrapRequestDto scrapRequestDto);
}
