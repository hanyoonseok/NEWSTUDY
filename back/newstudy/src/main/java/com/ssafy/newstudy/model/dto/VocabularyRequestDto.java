package com.ssafy.newstudy.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VocabularyRequestDto {
    private Integer u_id; // 유저 id
    private String eng;   // 영단어
}
