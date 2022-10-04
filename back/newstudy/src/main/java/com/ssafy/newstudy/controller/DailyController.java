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

    @GetMapping(value = {"/{c_id}", "/", ""})
    @ApiOperation(value = "오늘 가장 많이 사용된 단어 목록", notes = "카테고리별(c_id 없으면 전체 기준) 가장 많이 사용된 단어, 횟수의 목록을 준다")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<List<DailyResponseDto>> getDailyKeyword(@ApiParam(value = "카테고리 넘버", required = false,
                                                                            defaultValue = "0") @PathVariable(required = false) Integer c_id){
        if(c_id == null) c_id = 0;
        //데일리 키워드 리스트
        List<DailyResponseDto> responseArray = dailyService.getDailyKeyword(c_id);
        return new ResponseEntity<List<DailyResponseDto>>(responseArray, HttpStatus.OK);
    }

    @GetMapping("/world/{c_id}")
    @ApiOperation(value="월드 카테고리 1개 당 최근 5개 키워드(날짜가 같으면 cnt순)", notes="월드 소분류별 daily_word를 5개 가져온다. 최근 키워드를 우선으로 가져오고, 없는 경우 이전 날짜에서 가져온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<List<DailyResponseDto>> getWorldKeyword(@ApiParam(value="월드 소분류 카테고리 넘버") @PathVariable Integer c_id){
        System.out.println(c_id);
        List<DailyResponseDto> responseArray = dailyService.getWorldKeyword(c_id);
        System.out.println(responseArray.size());
        return new ResponseEntity<List<DailyResponseDto>>(responseArray, HttpStatus.OK);
    }
}
