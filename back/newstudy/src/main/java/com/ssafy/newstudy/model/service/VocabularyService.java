package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.model.dao.VocabularyDao;
import com.ssafy.newstudy.model.dto.VocabularyRequestDto;
import com.ssafy.newstudy.model.dto.VocabularyResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VocabularyService{
    private final VocabularyDao vocabularyDao;

    public List<VocabularyResponseDto> getVocabulary(Integer u_id) {
        return vocabularyDao.selectVocabulary(u_id);
    }

    public int addVocabulary(VocabularyRequestDto voca) {
        List<VocabularyResponseDto> voca_list = getVocabulary(voca.getU_id());
        String eng = voca.getEng();
        for (VocabularyResponseDto response : voca_list) {
            String savedEng = response.getEng();
            if (savedEng.equals(eng)) return -1;
        }
        return vocabularyDao.insertVocabulary(voca);
    }

    public int updateVocabulary(VocabularyRequestDto voca) {
        return vocabularyDao.updateVocabulary(voca);
    }

    public int deleteVocabulary(VocabularyRequestDto voca) {
        return vocabularyDao.deleteVocabulary(voca);
    }
}