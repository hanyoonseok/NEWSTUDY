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

    @PostMapping("/{id}")
    @ApiOperation(value = "관심 카테고리 추가", notes = "받아온 카테고리 id를 유저의 관심 카테고리 목록에 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<?> addCategory(@ApiParam(value = "유저 토큰", required = true) @RequestHeader("Authorization") String bearerToken,
                                             @ApiParam(value = "관심항목으로 추가할 카테고리 id", required = true) @PathVariable Integer id) {
        // 1. 유저 정보 가져오기
        Integer u_id;
        try{
            u_id = userService.getUidFromBearerToken(bearerToken);
        }catch (Exception e){
            return new ResponseEntity<String>("유효하지 않은 토큰", HttpStatus.UNAUTHORIZED);
        }

        System.out.println("u_id" + u_id);
        // 2. 관심 카테고리 추가
        try {
            if(categoryService.addCategory(new CategoryRequestDto(u_id, id)) == 0){
                throw new Exception();
            }
        }catch (Exception e){
            return new ResponseEntity<String>("이미 추가한 카테고리", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
