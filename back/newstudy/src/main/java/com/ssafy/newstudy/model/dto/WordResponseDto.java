package com.ssafy.newstudy.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WordResponseDto {
    private Integer level;
    private String eng;
    private String kor;
    private String part;
    private String description;

    private Integer r;
    private Integer c;
    private Integer d;

    public WordResponseDto setWord(Integer r, Integer c, Integer d, String eng){
        this.r = r;
        this.c = c;
        this.d = d;
        this.eng = eng;
        this.description = "";

        return this;
    }
}
