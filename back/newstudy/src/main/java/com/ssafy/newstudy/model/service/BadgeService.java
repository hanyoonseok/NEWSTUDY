package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.model.dto.BadgeRequest;
import com.ssafy.newstudy.model.dto.BadgeResponse;
import com.ssafy.newstudy.model.dto.UserTmp;

import java.util.List;

public interface BadgeService {
    /**
     * 유저를 받아서 해당 유저의 배지 리스트를 돌려줌
     * @param user
     * @return 유저의 배지 리스트
     */
    List<BadgeResponse> getBadge(UserTmp user);

    /**
     * 유저와 배지넘버를 받아서 user-badge에 저장함
     * @param badge
     * @return 성공 row 수
     */
    int addBadge(BadgeRequest badge);
}
