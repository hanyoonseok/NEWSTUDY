package com.ssafy.newstudy.model.dao;

import com.ssafy.newstudy.model.dto.BadgeRequest;
import com.ssafy.newstudy.model.dto.BadgeResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BadgeDao {
    List<BadgeResponse> getBadge(Integer u_id);
    int addBadge(BadgeRequest badge);
}
