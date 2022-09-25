package com.ssafy.newstudy.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VocabularyResponseDto {
    private Integer v_id; // 단어 id
    private String eng;   // 영단어
    private boolean done; // 외움 여부
}
