package com.ssafy.newstudy.controller;

import com.ssafy.newstudy.model.dto.ScrapRequestDto;
import com.ssafy.newstudy.model.dto.ScrapResponseDto;
import com.ssafy.newstudy.model.service.ScrapService;
import com.ssafy.newstudy.model.service.UserService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 회원 Badge 관련 처리를 위한 컨트롤러
 */
@Api(value = "회원 news scrap API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/scrap")
public class ScrapController {
    private final ScrapService scrapService;
    private final UserService userService;

    @GetMapping()
    @ApiOperation(value = "회원의 뉴스 스크랩 목록", notes = "로그인 한 회원의 스크랩 목록을 준다")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<List<ScrapResponseDto>> getScrap(@ApiParam(value = "로그인된 유저 정보", required = true) @RequestHeader("Authorization") String bearerToken){
        List<ScrapResponseDto> responseArray = scrapService.getScrap(userService.getUidFromBearerToken(bearerToken));
        return new ResponseEntity<List<ScrapResponseDto>>(responseArray, HttpStatus.OK);
    }

    @PostMapping()
    @ApiOperation(value = "뉴스 스크랩 더하기", notes = "로그인 회원의 뉴스 스크랩 추가, 'n_id'를 보내면 해당하는 뉴스를 로그인 한 회원의 뉴스 스크랩에 추가한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<HttpStatus> addScrap(@ApiParam(value = "로그인된 유저 정보", required = true) @RequestHeader("Authorization") String bearerToken, Integer n_id){
        ScrapRequestDto scrapRequestDto = new ScrapRequestDto(userService.getUidFromBearerToken(bearerToken), n_id);
        int result = scrapService.addScrap(scrapRequestDto);
        // 스크랩 추가 실패
        if(result == 0){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @DeleteMapping("/{n_id}")
    @ApiOperation(value = "뉴스 스크랩 삭제", notes = "로그인 회원의 뉴스 스크랩 삭제, 'n_id'를 보내면 로그인 한 회원의 n_id에 해당하는 뉴스 스크랩을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<HttpStatus> deleteScrap(@ApiParam(value = "로그인된 유저 정보", required = true) @RequestHeader("Authorization") String bearerToken, @PathVariable Integer n_id){
        ScrapRequestDto scrapRequestDto = new ScrapRequestDto(userService.getUidFromBearerToken(bearerToken), n_id);
        int result = scrapService.deleteScrap(scrapRequestDto);
        // 스크랩 삭제 실패
        if(result == 0){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
}