package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.model.dao.BadgeDao;
import com.ssafy.newstudy.model.dto.BadgeRequestDto;
import com.ssafy.newstudy.model.dto.BadgeResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BadgeService{
    private final BadgeDao badgeDao;

    /**
     * 유저를 받아서 해당 유저의 배지 리스트를 돌려줌
     * @param u_id
     * @return 유저의 배지 리스트
     */
    public List<BadgeResponseDto> getBadge(Integer u_id) {
        return badgeDao.selectBadgeList(u_id);
    }

    /**
     * 유저를 받아서 해당 유저의 새로운 배지 리스트를 돌려줌
     * @param u_id
     * @return 유저의 확인하지 않은 배지 리스트
     */
    public List<BadgeResponseDto> getNewBadge(Integer u_id) {
        return badgeDao.selectNewBadgeList(u_id);
    }

    public void setNewBadge_old(List<BadgeResponseDto> list){
        for(BadgeResponseDto dto : list){
            badgeDao.updateBadge(dto.getB_id());
        }
    }

    /**
     * 유저와 배지 넘버를 받아서 user-badge에 저장함
     * @param badge
     * @return성공 row 수
     */
    public int addBadge(BadgeRequestDto badge) {
        int result = 0;
        try {
            result = badgeDao.insertBadge(badge);
        }catch(Exception e){
            result = 0;
        }
        return result;
    }
}
