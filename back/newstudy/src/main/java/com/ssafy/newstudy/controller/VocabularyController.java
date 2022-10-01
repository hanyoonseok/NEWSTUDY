package com.ssafy.newstudy.controller;

import com.ssafy.newstudy.model.dto.BadgeRequestDto;
import com.ssafy.newstudy.model.dto.VocabularyRequestDto;
import com.ssafy.newstudy.model.dto.VocabularyResponseDto;
import com.ssafy.newstudy.model.service.BadgeService;
import com.ssafy.newstudy.model.service.PapagoService;
import com.ssafy.newstudy.model.service.UserService;
import com.ssafy.newstudy.model.service.VocabularyService;
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
public class VocabularyController {

    private final VocabularyService vocabularyService;
    private final BadgeService badgeService;
    private final UserService userService;
    private final PapagoService papagoService;


    @GetMapping()
    @ApiOperation(value = "단어장 목록 보기", notes = "로그인 한 회원의 단어장 목록을 반환한다")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음" , response = String.class),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<?> getVocabulary(@ApiParam(value = "유저 토큰", required = true) @RequestHeader("Authorization") String bearerToken){
        // 1. 유저 정보 가져오기
        Integer u_id;
        try{
            u_id = userService.getUidFromBearerToken(bearerToken);
        }catch (Exception e){
            return new ResponseEntity<>("유효하지 않은 토큰", HttpStatus.UNAUTHORIZED);
        }

        // 2. 단어장 목록 가져오기
        List<VocabularyResponseDto> vocabularyList;
        try{
            vocabularyList = vocabularyService.getVocabulary(u_id);
        }catch (Exception e){
            return new ResponseEntity<>("단어장 가져오기 실패", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<List<VocabularyResponseDto>>(vocabularyList, HttpStatus.OK);
    }

    @PostMapping()
    @ApiOperation(value = "단어 추가하기", notes = "입력된 단어를 회원의 단어장에 추가한다. \n 추가된 단어 수에 따라 단어 배지 자동 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<?> addVocabulary(@ApiParam(value = "유저 토큰", required = true) @RequestHeader("Authorization") String bearerToken,
                                                    @ApiParam(value = "추가할 단어", required = true) @RequestBody VocabularyRequestDto vocabularyRequestDto) {
        // 1. 유저 정보 가져오기
        Integer u_id;
        try{
            u_id = userService.getUidFromBearerToken(bearerToken);
        }catch (Exception e){
            return new ResponseEntity<>("유효하지 않은 토큰", HttpStatus.UNAUTHORIZED);
        }

        // 2. 단어 및 사용자 정보 저장
        try {
            String eng = vocabularyRequestDto.getEng();
            String response = papagoService.translate(eng);
            String kor = response.substring(response.indexOf("translatedText") + 17,response.indexOf("engineType")-3);

            System.out.println(response);
            int addVoca = vocabularyService.addVocabulary(new VocabularyRequestDto(u_id, eng, kor));
            if(addVoca == 0) {
                return new ResponseEntity<String>("단어 추가 중 문제가 발생했습니다", HttpStatus.NOT_FOUND);
            }else if(addVoca == -1) {
                return new ResponseEntity<String>("이미 추가된 단어입니다", HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            return new ResponseEntity<String>("단어 추가 중 문제가 발생했습니다", HttpStatus.NOT_FOUND);
        }

        // 3. 저장된 단어 수에 따라 배지 부여
        List<VocabularyResponseDto> vocabularyList;
        try{
            vocabularyList = vocabularyService.getVocabulary(u_id);
        }catch (Exception e){
            return new ResponseEntity<String>("단어장 목록 조회에 실패했습니다", HttpStatus.NOT_FOUND);
        }

        try{
            if (vocabularyList.size() == 1) {
                badgeService.addBadge(new BadgeRequestDto(u_id, 13));
            }
            else if (vocabularyList.size() == 100) {
                badgeService.addBadge(new BadgeRequestDto(u_id, 14));
            }
            else if (vocabularyList.size() == 500) {
                badgeService.addBadge(new BadgeRequestDto(u_id, 15));
            }
        }catch (Exception e){
            return new ResponseEntity<String>("배지 부여 실패", HttpStatus.NOT_FOUND);

        }

        // 단어 추가 성공
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @ApiOperation(value = "단어 외움 여부 변경", notes = "외움 상태(true)이면 외우지 않음(false), 외우지 않은 경우(false) 외운상태(true)로 변경")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공"),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<?> updateVocabulary(@ApiParam(value = "유저 토큰", required = true) @RequestHeader("Authorization") String bearerToken,
                                                       @ApiParam(value = "외움여부 변경할 단어 id", required = true) @PathVariable Integer id) {
        // 1. 유저 정보 가져오기
        Integer u_id;
        try{
            u_id = userService.getUidFromBearerToken(bearerToken);
        }catch (Exception e){
            return new ResponseEntity<>("유효하지 않은 토큰", HttpStatus.UNAUTHORIZED);
        }

        // 2. 단어 외움여부 변경
        try{
            if(vocabularyService.updateVocabulary(new VocabularyRequestDto(u_id, id)) == 0){
                throw new Exception();
            }
        }catch (Exception e){
            return new ResponseEntity<>("단어 외움여부 변경 실패", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "단어 삭제하기", notes = "입력된 단어를 회원의 단어장에서 삭제한다")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공"),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<?> deleteVocabulary(@ApiParam(value = "유저 토큰", required = true) @RequestHeader("Authorization") String bearerToken,
                                              @ApiParam(value = "삭제할 단어 id", required = true) @PathVariable Integer id) {
        // 1. 유저 정보 가져오기
        Integer u_id;
        try{
            u_id = userService.getUidFromBearerToken(bearerToken);
        }catch (Exception e){
            return new ResponseEntity<>("유효하지 않은 토큰", HttpStatus.UNAUTHORIZED);
        }

        // 2. 단어 외움여부 변경
        try{
            if(vocabularyService.deleteVocabulary(new VocabularyRequestDto(u_id, id)) == 0){
                throw new Exception();
            }
        }catch (Exception e){
            return new ResponseEntity<>("단어 삭제 실패", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
