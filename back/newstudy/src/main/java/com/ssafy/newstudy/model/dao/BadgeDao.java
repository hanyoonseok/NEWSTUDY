package com.ssafy.newstudy.model.dao;

import com.ssafy.newstudy.model.dto.BadgeRequestDto;
import com.ssafy.newstudy.model.dto.BadgeResponseDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BadgeDao {
    List<BadgeResponseDto> selectBadgeList(Integer u_id);
    int insertBadge(BadgeRequestDto badge);
}
