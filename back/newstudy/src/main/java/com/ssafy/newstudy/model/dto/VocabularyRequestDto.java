package com.ssafy.newstudy.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class VocabularyRequestDto {
    private Integer u_id; // 유저 id
    private Integer v_id; // 단어 id
    private String eng;   // 영단어

    public VocabularyRequestDto(Integer u_id, Integer v_id){
        this.u_id = u_id;
        this.v_id = v_id;
    }
    public VocabularyRequestDto(Integer u_id, String eng){
        this.u_id = u_id;
        this.eng = eng;
    }
}
