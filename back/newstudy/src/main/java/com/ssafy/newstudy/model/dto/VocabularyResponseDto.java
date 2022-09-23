package com.ssafy.newstudy.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class VocabularyResponseDto {
    private String eng;   // 영단어
    private boolean done; // 외움 여부
}
