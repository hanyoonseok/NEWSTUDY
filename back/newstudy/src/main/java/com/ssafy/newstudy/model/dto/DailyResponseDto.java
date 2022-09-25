package com.ssafy.newstudy.model.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DailyResponseDto {
    private Integer c_id;
    private String eng;
    private String kor; // 한국어 뜻  // 오늘의 단어
    private Integer cnt;
}
