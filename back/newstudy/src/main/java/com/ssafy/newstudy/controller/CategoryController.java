package com.ssafy.newstudy.controller;

import com.ssafy.newstudy.model.dto.CategoryRequestDto;
import com.ssafy.newstudy.model.dto.CategoryResponseDto;
import com.ssafy.newstudy.model.service.CategoryService;
import com.ssafy.newstudy.model.service.UserService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Api(value = "Category API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/category")
public class CategoryController {

    private final UserService userService;
    private final CategoryService categoryService;

    @GetMapping()
    @ApiOperation(value = "전체 카테고리 목록", notes = "전체 뉴스기사 카테고리 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<?> getCategorysAll(){
        List<CategoryResponseDto> categoryList;
        try {
            categoryList = categoryService.getCategorysAll();
        }catch (Exception e){
            return new ResponseEntity<>("전체 카테고리 조회 실패", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<CategoryResponseDto>>(categoryList, HttpStatus.OK);
    }

    @GetMapping("/me")
    @ApiOperation(value = "관심 카테고리 목록", notes = "회원의 관심 카테고리 목록 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<?> getCategorys(@ApiParam(value = "유저 토큰", required = true) @RequestHeader("Authorization") String bearerToken){
        // 1. 유저 정보 가져오기
        Integer u_id;
        try{
            u_id = userService.getUidFromBearerToken(bearerToken);
        }catch (Exception e){
            return new ResponseEntity<String>("유효하지 않은 토큰", HttpStatus.UNAUTHORIZED);
        }

        // 2. 관심 카테고리 목록 조회
        List<CategoryResponseDto> categoryList;
        try {
            categoryList = categoryService.getCategorys(u_id);
        }catch (Exception e){
            return new ResponseEntity<>("관심 카테고리 목록 조회 실패", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<List<CategoryResponseDto>>(categoryList, HttpStatus.OK);
    }

    @PostMapping()
    @ApiOperation(value = "관심 카테고리 수정", notes = "받아온 카테고리 목록에 맞게 유저의 관심 카테고리 목록을 업데이트 한다")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<?> updateCategorys(@ApiParam(value = "유저 토큰", required = true) @RequestHeader("Authorization") String bearerToken,
                                             @ApiParam(value = "업데이트 할 관심 카테고리 목록", required = true) @RequestBody List<CategoryRequestDto> requestList) {
        // 1. 유저 정보 가져오기
        Integer u_id;
        try{
            u_id = userService.getUidFromBearerToken(bearerToken);
        }catch (Exception e){
            return new ResponseEntity<String>("유효하지 않은 토큰", HttpStatus.UNAUTHORIZED);
        }

        // 2. 기존 관심 카테고리 조회
        ArrayList<Integer> existingList = new ArrayList<Integer>();
        try {
            List<CategoryResponseDto> responseList = categoryService.getCategorys(u_id);
            // c_id만 따로 저장
            for(CategoryResponseDto response : responseList) {
                existingList.add(response.getC_id());
            }
        }catch (Exception e){
            return new ResponseEntity<>("기존 관심 카테고리 목록 조회 실패", HttpStatus.NOT_FOUND);
        }

        // 3. 추가 및 삭제할 카테고리 분류
        ArrayList<Integer> addList = new ArrayList<Integer>();
        try{
            for (CategoryRequestDto request : requestList) {
                Integer c_id =request.getC_id();
                if(existingList.contains(c_id)) {
                    existingList.remove((Object) c_id);
                }else{
                    addList.add(c_id);
                }
            }
        }catch (Exception e){
            return new ResponseEntity<>("카테고리 분류 실패", HttpStatus.NOT_FOUND);
        }

        // 4. 신규 카테고리 추가
        try {
            if(categoryService.addCategory(u_id, addList) == 0){
                throw new Exception();
            }
        }catch (Exception e){
            return new ResponseEntity<String>("이미 추가한 카테고리", HttpStatus.NOT_FOUND);
        }

        // 5. 삭제된 카테고리 제거
        try{
            if(categoryService.deleteCategory(u_id, existingList) == 0){
                throw new Exception();
            }
        }catch (Exception e){
            return new ResponseEntity<>("관심 카테고리 삭제 실패", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
