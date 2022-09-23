package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.model.dao.BadgeDao;
import com.ssafy.newstudy.model.dto.BadgeRequest;
import com.ssafy.newstudy.model.dto.BadgeResponse;
import com.ssafy.newstudy.model.dto.UserTmp;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BadgeServiceImpl implements BadgeService{
    private final BadgeDao badgeDao;

    @Override
    public List<BadgeResponse> getBadge(UserTmp user) {
        return badgeDao.getBadge(user.getU_id());
    }

    @Override
    public int addBadge(BadgeRequest badge) {
        return badgeDao.addBadge(badge);
    }
}
