package com.ssafy.newstudy.controller;

import com.ssafy.newstudy.model.dto.BadgeRequestDto;
import com.ssafy.newstudy.model.dto.BadgeResponseDto;
import com.ssafy.newstudy.model.service.BadgeService;
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
@Api(value = "회원 Badge API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/badge")
public class BadgeController {

    private final BadgeService badgeService;
    private final UserService userService;

    @GetMapping()
    @ApiOperation(value = "회원의 배지 목록", notes = "로그인 한 회원의 배지 목록을 준다")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<List<BadgeResponseDto>> getBadge(@ApiParam(value = "로그인된 유저 정보", required = true) @RequestHeader("Authorization") String bearerToken){
        // 유저 id를 가지고 온다
        // 배지 목록을 가지고 온다
        List<BadgeResponseDto> responseArray = badgeService.getBadge(userService.getUidFromBearerToken(bearerToken));
        return new ResponseEntity<List<BadgeResponseDto>>(responseArray, HttpStatus.OK);
    }

    @GetMapping("/new")
    @ApiOperation(value = "회원의 새로운 배지 목록", notes = "로그인 한 회원의 확인하지 않은 배지 목록을 준다")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<List<BadgeResponseDto>> getNewBadge(@ApiParam(value = "로그인된 유저 정보", required = true) @RequestHeader("Authorization") String bearerToken){
        // 유저 id를 가지고 온다
        // 배지 목록을 가지고 온다
        List<BadgeResponseDto> responseArray = badgeService.getNewBadge(userService.getUidFromBearerToken(bearerToken));
        badgeService.setNewBadge_old(responseArray);
        return new ResponseEntity<List<BadgeResponseDto>>(responseArray, HttpStatus.OK);
    }

    @PostMapping()
    @ApiOperation(value = "회원에게 배지 추가", notes = "로그인 한 회원에게 배지를 준다 (b_id에 해당하는 배지를 로그인한 회원에게 준다)")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 404, message="배지 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<HttpStatus> addBadge(@ApiParam(value = "로그인된 유저 정보", required = true) @RequestHeader("Authorization") String bearerToken,
                                     @ApiParam(value = "추가할 배지 id", required = true) int b_id){
        // 배지와 유저 정보 받기
        BadgeRequestDto badge = new BadgeRequestDto(userService.getUidFromBearerToken(bearerToken), b_id);
        // 배지를 추가한다
        int result = badgeService.addBadge(badge);
        // 배지 추가 실패 ( 배지 없음 )
        if(result == 0){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }



}
