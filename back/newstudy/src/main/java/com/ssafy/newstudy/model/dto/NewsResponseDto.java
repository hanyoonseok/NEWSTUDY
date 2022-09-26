package com.ssafy.newstudy.model.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NewsResponseDto {
    private Integer n_id;
    private Integer c_id;
    private String title;
    private String content;
    private String origin;
    private String url;
    private Integer level;
    private Integer cnt;
    private LocalDateTime date;
    private String thumbnail;
}
