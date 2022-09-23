package com.ssafy.newstudy.controller;

import com.ssafy.newstudy.model.dto.UserDto;
import com.ssafy.newstudy.model.dto.VocabularyResponseDto;
import com.ssafy.newstudy.model.service.BadgeService;
import com.ssafy.newstudy.model.service.UserService;
import com.ssafy.newstudy.model.service.VocabularyService;
import com.ssafy.newstudy.util.JwtTokenUtil;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 회원별 단어장 관리를 위한 컨트롤러
 */
@Api(value = "Vocaburaly API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/vocaburary")
public class VocaburalyController {

    private final VocabularyService vocabularyService;
    private final BadgeService badgeService;
    private final UserService userService;

    private final JwtTokenUtil jwtTokenUtil;


    @GetMapping()
    @ApiOperation(value = "단어장 목록 보기", notes = "로그인 한 회원의 단어장 목록을 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<List<VocabularyResponseDto>> getVocabulary(@ApiParam(value = "유저 토큰", required = true) @RequestHeader("Authorization") String bearerToken){
        UserDto userDto = userService.getUserByEmail(jwtTokenUtil.getEmailFromBearerToken(bearerToken));
        List<VocabularyResponseDto> vocabularyList = vocabularyService.getVocabulary(userDto.getEmail());

        return new ResponseEntity<List<VocabularyResponseDto>>(vocabularyList, HttpStatus.OK);
    }


    @PostMapping()
    @ApiOperation(value = "단어 추가하기", notes = "입력된 단어를 회원의 단어장에 추가한다")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<HttpStatus> addVocabulary(@ApiParam(value = "유저 토큰", required = true) @RequestHeader("Authorization") String bearerToken,
                                                    @ApiParam(value = "추가할 단어", required = true) String eng) {
        UserDto userDto = userService.getUserByEmail(jwtTokenUtil.getEmailFromBearerToken(bearerToken));
        List<VocabularyResponseDto> responseArray = vocabularyService.getVocabulary(userDto.getEmail());


//        // 단어 및 사용자 정보 저장
//        VocabularyRequestDto voca = new VocabularyRequestDto(user.getU_id(), eng);

//        // 단어 추가 실패
//        if(vocabularyService.addVocabulary(voca) == 0) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }

        // 저장된 단어 수에 따라 배지 부여
//        List<VocabularyResponseDto> vocabularyList = vocabularyService.getVocabulary(userDto.getEmail());
//
//        if (vocabularyList.size() == 1) {
//            badgeService.addBadge(new BadgeRequest(u_id, b_id));
//        }
//        else if (vocabularyList.size() == 100) {
//            badgeService.addBadge(new BadgeRequest(u_id, b_id));
//        }
//        else if (vocabularyList.size() == 500) {
//            badgeService.addBadge(new BadgeRequest(u_id, b_id));
//        }


        // 단어 추가 성공
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping()
    @ApiOperation(value = "단어 외움 여부 변경", notes = "외움 상태(true)이면 외우지 않음(false), 외우지 않은 경우(false) 외운상태(true)로 변경")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<HttpStatus> updateVocabulary(@ApiParam(value = "유저 토큰", required = true) @RequestHeader("Authorization") String bearerToken,
                                                       @ApiParam(value = "외움여부 변경할 단어", required = true) String eng) {
        UserDto userDto = userService.getUserByEmail(jwtTokenUtil.getEmailFromBearerToken(bearerToken));
        List<VocabularyResponseDto> responseArray = vocabularyService.getVocabulary(userDto.getEmail());

        //        // 단어 외움여부 변경 성공
//        if(vocabularyService.addVocabulary(voca) == 0) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }

        // 단어 외움여부 변경 성공
        return new ResponseEntity<>(HttpStatus.OK);

    }
}
