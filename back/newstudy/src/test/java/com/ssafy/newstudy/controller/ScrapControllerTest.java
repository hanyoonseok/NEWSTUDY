package com.ssafy.newstudy.controller;

import com.ssafy.newstudy.model.dto.BadgeResponseDto;
import com.ssafy.newstudy.model.dto.ScrapResponseDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
class ScrapControllerTest {

    @Autowired
    private ScrapController scrapController;

    @Test
    @DisplayName("스크랩 가져오기")
    void getScrap() {
        //given
        String b_token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJhdXRoIjoiIiwiaXNzIjoic3NhZnkuY29tIiwiZXhwIjoxNjY0MDk0NjIyLCJpYXQiOjE2NjQwOTI4MjJ9.XGOEdgg5sqRiDDi6nv_9rV1oL0bDs_fD1ZyKeMS8j0twPU_n4DwdQgS2ayeF_YaIkEpWY-LpVNllsk4Zuu7wDg";
        // what
        List<ScrapResponseDto> list = scrapController.getScrap(b_token).getBody();
        // then
        System.out.print(list.get(0));
    }

    @Test
    @DisplayName("스크랩 추가하기")
    void addScrap() {
        //given
        String b_token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJhdXRoIjoiIiwiaXNzIjoic3NhZnkuY29tIiwiZXhwIjoxNjY0MDk0NjIyLCJpYXQiOjE2NjQwOTI4MjJ9.XGOEdgg5sqRiDDi6nv_9rV1oL0bDs_fD1ZyKeMS8j0twPU_n4DwdQgS2ayeF_YaIkEpWY-LpVNllsk4Zuu7wDg";
        // what
        HttpStatus status = scrapController.addScrap(b_token, 100).getStatusCode();
        // then
        assertEquals(status, HttpStatus.OK);
    }

    @Test
    @DisplayName("스크랩 삭제하기")
    void deleteScrap() {
        //given
        String b_token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJhdXRoIjoiIiwiaXNzIjoic3NhZnkuY29tIiwiZXhwIjoxNjY0MDk0NjIyLCJpYXQiOjE2NjQwOTI4MjJ9.XGOEdgg5sqRiDDi6nv_9rV1oL0bDs_fD1ZyKeMS8j0twPU_n4DwdQgS2ayeF_YaIkEpWY-LpVNllsk4Zuu7wDg";
        // what
        HttpStatus status = scrapController.deleteScrap(b_token, 99).getStatusCode();
        // then
        assertEquals(status, HttpStatus.OK);
    }
}