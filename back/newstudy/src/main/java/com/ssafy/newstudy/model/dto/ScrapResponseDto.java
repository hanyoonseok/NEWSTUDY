package com.ssafy.newstudy.model.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ScrapResponseDto {
    private String thumbnail;
    private String title;
    private Integer level;
    private Integer n_id;
}
