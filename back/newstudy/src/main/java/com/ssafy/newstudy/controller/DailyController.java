package com.ssafy.newstudy.controller;

import com.ssafy.newstudy.model.dto.DailyResponseDto;
import com.ssafy.newstudy.model.service.DailyService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "Daily Content API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/daily")
public class DailyController {
    private final DailyService dailyService;

    @GetMapping("/{c_id}")
    @ApiOperation(value = "오늘 가장 많이 사용된 단어 목록", notes = "가장 많이 사용된 단어, 횟수의 목록을 준다")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<List<DailyResponseDto>> getDailyKeyword(@PathVariable Integer c_id){
        //데일리 키워드 리스트
        List<DailyResponseDto> responseArray = dailyService.getDailyKeyword(c_id);
        return new ResponseEntity<List<DailyResponseDto>>(responseArray, HttpStatus.OK);
    }
}
