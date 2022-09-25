package com.ssafy.newstudy.controller;

import com.ssafy.newstudy.model.dto.VocabularyRequestDto;
import com.ssafy.newstudy.model.dto.VocabularyResponseDto;
import com.ssafy.newstudy.model.service.UserService;
import com.ssafy.newstudy.model.service.VocabularyService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest //Springboot올려서 테스트
@Transactional  //Rollback 하기 위함
public class VocaburlaryControllerTest {

    @Autowired
    VocabularyService vocabularyService;
    @Autowired
    UserService userService;

    @Test
    public void getVocabulary() throws Exception{
        //given
        String bearerToken = "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJhdXRoIjoiIiwiaXNzIjoic3NhZnkuY29tIiwiZXhwIjoxNjY0MDg1ODc2LCJpYXQiOjE2NjQwODQwNzZ9.nlalGM3oScdp0p6QIF_xRUXYh4MW--apArOhCabFILTPsBDDYNyZxQxYdBYmUYqCYdmq0nlHC_nfxQpG3vEsTQ";

        //when
        Integer u_id = userService.getUidFromBearerToken(bearerToken);
//        Integer u_id = 3;
        List<VocabularyResponseDto> result = vocabularyService.getVocabulary(u_id);

        //then
        List<VocabularyResponseDto> answer = new ArrayList<VocabularyResponseDto>();
        answer.add(new VocabularyResponseDto(2, "word", false));
        assertEquals(result.get(0).getV_id(), answer.get(0).getV_id());
        assertEquals(result.get(0).getEng(), answer.get(0).getEng());
        assertEquals(result.get(0).isDone(), answer.get(0).isDone());
    }

    @Test
    public void addVocabulary() {
        //given
        Integer u_id = 1;
        String voca = "word";

        //when
        vocabularyService.addVocabulary(new VocabularyRequestDto(u_id, voca));
        List<VocabularyResponseDto> response = vocabularyService.getVocabulary(u_id);
        boolean success = false;
        for( VocabularyResponseDto res : response){
            if(res.getEng().equals(voca)){
                success = true;
            }
        }

        //then
        assertTrue(success);
    }

    @Test
    public void updateVocabulary() {
        //given

        //when

        //then
    }
}