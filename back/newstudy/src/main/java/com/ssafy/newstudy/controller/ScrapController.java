package com.ssafy.newstudy.controller;

import com.ssafy.newstudy.model.dto.BadgeRequestDto;
import com.ssafy.newstudy.model.dto.BadgeResponseDto;
import com.ssafy.newstudy.model.dto.ScrapRequestDto;
import com.ssafy.newstudy.model.dto.ScrapResponseDto;
import com.ssafy.newstudy.model.service.BadgeService;
import com.ssafy.newstudy.model.service.ScrapService;
import com.ssafy.newstudy.model.service.UserService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
    private final BadgeService badgeService;

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
            @ApiResponse(code = 400, message="이미 스크랩 된 뉴스"),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<HttpStatus> addScrap(@ApiParam(value = "로그인된 유저 정보", required = true) @RequestHeader("Authorization") String bearerToken, Integer n_id){
        Integer u_id = userService.getUidFromBearerToken(bearerToken);
        ScrapRequestDto scrapRequestDto = new ScrapRequestDto(u_id, n_id);

        //스크랩
        int result = scrapService.addScrap(scrapRequestDto);
        // 스크랩 추가 실패
        if(result == 0){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        //배지 작업
        //이 사람이 몇개의 스크랩을 가지고 있나?
        int scrap_cnt = scrapService.selectScrapCnt(scrapRequestDto);
        int target_b_id = 0;
        if(scrap_cnt >= 50) target_b_id = 12;
        else if(scrap_cnt >= 10) target_b_id = 11;
        else if(scrap_cnt >= 1) target_b_id = 10;

        //이 사람이 이미 해당 배지 가지고 있는가?
        boolean flag = false;
        List<BadgeResponseDto> badgeResponseDtoList = badgeService.getBadge(u_id);
        for(BadgeResponseDto badgeDto : badgeResponseDtoList){
            if(badgeDto.getB_id() == target_b_id) {
                flag = true;
                break;    //있음
            }
            else if(badgeDto.getB_id() > target_b_id){  //없음
                break;
            }
        }
        if(!flag){
            //넣어줘야지
            BadgeRequestDto badgeRequestDto = new BadgeRequestDto(u_id, target_b_id);
            badgeService.addBadge(badgeRequestDto);
        }
        //리턴
        return new ResponseEntity<>(HttpStatus.OK);
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