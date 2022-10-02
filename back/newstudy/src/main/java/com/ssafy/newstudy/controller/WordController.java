package com.ssafy.newstudy.controller;

import com.ssafy.newstudy.model.dto.WordResponseDto;
import com.ssafy.newstudy.model.service.WordService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/word")
public class WordController {
    private final WordService wordService;

    @GetMapping("/test")
    @ApiOperation(value = "테스트용 단어 제공", notes = "레벨 테스트용 단어 ( 1 - 6 레벨, 레벨 당 5개 단어) 랜덤 제공")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<List<WordResponseDto>> getWordTest(){
        // 테스트용 단어 랜덤으로
        return new ResponseEntity<List<WordResponseDto>>(wordService.getWordTest(), HttpStatus.OK);
    }

    @GetMapping("/game")
    @ApiOperation(value = "게임용 단어 제공", notes = "게임용 단어 10개 랜덤 제공, crossword 인 경우 param으로 type에 'cross' 주면 됨. 나머지는 speed ")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<List<WordResponseDto>> getWordGame(@RequestParam(required = false) String type){
        // 게임용 단어 랜덤으로
        List<WordResponseDto> list = wordService.getWordGame();
        // cross인 경우에는
        if(type != null && (type.equals("cross") || type.equals("crossword"))){
            list = wordService.getCrossWord(list);
        }
        // 기본적으로 speed라 생각한다
        return new ResponseEntity<List<WordResponseDto>>(list, HttpStatus.OK);


    }
}
