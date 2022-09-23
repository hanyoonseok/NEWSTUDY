package com.ssafy.newstudy.model.dao;

import com.ssafy.newstudy.model.dto.VocabularyRequestDto;
import com.ssafy.newstudy.model.dto.VocabularyResponseDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface VocabularyDao {
    List<VocabularyResponseDto> getVocabulary(String email);

    int addVocabulary(VocabularyRequestDto voca);

    int updateVocabulary(VocabularyRequestDto voca);
}