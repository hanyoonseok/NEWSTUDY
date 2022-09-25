package com.ssafy.newstudy.model.dao;

import com.ssafy.newstudy.model.dto.VocabularyRequestDto;
import com.ssafy.newstudy.model.dto.VocabularyResponseDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface VocabularyDao {
    List<VocabularyResponseDto> selectVocabulary(Integer u_id);

    int insertVocabulary(VocabularyRequestDto voca);

    int updateVocabulary(VocabularyRequestDto voca);

    int deleteVocabulary(VocabularyRequestDto voca);
}