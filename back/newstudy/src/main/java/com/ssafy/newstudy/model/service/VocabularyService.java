package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.model.dao.VocabularyDao;
import com.ssafy.newstudy.model.dto.UserTmp;
import com.ssafy.newstudy.model.dto.VocabularyRequestDto;
import com.ssafy.newstudy.model.dto.VocabularyResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VocabularyService{
    private final VocabularyDao vocabularyDao;

    public List<VocabularyResponseDto> getVocabulary(String email) {
        return vocabularyDao.getVocabulary(email);
    }

    public int addVocabulary(VocabularyRequestDto voca) {
        return vocabularyDao.addVocabulary(voca);
    }

    public int updateVocabulary(VocabularyRequestDto voca) {
        return vocabularyDao.updateVocabulary(voca);
    }
}