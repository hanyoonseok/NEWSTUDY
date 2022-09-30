package com.ssafy.newstudy.controller;

import com.ssafy.newstudy.model.dto.NewsRequestDto;
import com.ssafy.newstudy.model.dto.NewsResponseDto;
import com.ssafy.newstudy.model.dto.UserDto;
import com.ssafy.newstudy.model.service.NewsService;
import com.ssafy.newstudy.model.service.UserService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

/**
 * 뉴스 관련 처리를 위한 컨트롤러
 */
@Api(value = "뉴스 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/news")
public class NewsController {
    private final NewsService newsService;
    private final UserService userService;

    @GetMapping("/{n_id}")
    @ApiOperation(value = "뉴스 상세 내용", notes = "n_id로 뉴스 기사를 가져온다")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 404, message="뉴스 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<NewsResponseDto> getNews(@PathVariable Integer n_id){
        NewsResponseDto response = newsService.getNews(n_id);
        if(response != null) {
            newsService.updateViewCnt(n_id);    //어차피 cnt를 보여주지 않으니 이대로 간다 (속도)
            return new ResponseEntity<NewsResponseDto>(response, HttpStatus.OK);
        }else{
            return new ResponseEntity<NewsResponseDto>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    @ApiOperation(value = "뉴스 리스트", notes = "뉴스 리스트(newsList)를 담은 HashMap을 가져온다  \n " +
            "(newsList 로 가져올 수 있음, totalCnt로 총 검색 결과 카운트 가져오기) \n" +
            "=> level(없으면 로그인한 유저의 lv), startcategoryid, endcategory (둘이 세트. 둘 다 없거나 둘 다 0이면 전체), \n" +
            "titlekeyword, categorykeyword (타이틀만 검색 -> titlekeyword, 카테고리만 -> categorykeyword, 둘 다 하려면 양쪽에) \n" +
            "startdate, enddate 추가 \n"+
            ", page(필수!) 사용 가능 //하둡으로 검색 바꿀 예정")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<HashMap> getNewsList(@ApiParam(value = "로그인된 유저 정보", required = true) @RequestHeader("Authorization") String bearerToken,
                                               @RequestBody NewsRequestDto newsRequestDto){
        //request에 레벨 범위가 없다면 본인레벨 start, end
        if(newsRequestDto == null || newsRequestDto.getStartlevel() == null) {
            UserDto user = userService.getUserByUid(userService.getUidFromBearerToken(bearerToken));
            Integer level = user.getLevel();
            if(level != null && level != 0)
                newsRequestDto.setStartlevelAndEndlevel(level, level);
            else
                newsRequestDto.setStartlevelAndEndlevel(1, 6);  //유저 정보에도 없으면 그냥 전체 봐라.
        }

        //레벨 범위 있으면 그대로
        List<NewsResponseDto> responseArray = newsService.getNewsList(newsRequestDto);
        //카운트 세기
        Integer total_cnt = 0;
        if(newsRequestDto.getTotal_cnt() == null) {
            total_cnt = newsService.getSearchListTotalCnt(newsRequestDto);
        }else
            total_cnt = newsRequestDto.getTotal_cnt();

        //Map
        HashMap map = new HashMap();
        map.put("newsList", responseArray);
        map.put("totalCnt", total_cnt);
        return new ResponseEntity<HashMap>(map, HttpStatus.OK);
    }

    @GetMapping("/keyword/{n_id}")
    @ApiOperation(value = "뉴스 키워드", notes = "n_id로 뉴스 기사의 키워드를 가져온다")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 404, message="뉴스 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<List<String>> getNewsKeyword(@PathVariable Integer n_id){
        List<String> responseArray = newsService.getNewsKeyword(n_id);
        return new ResponseEntity<List<String>>(responseArray, HttpStatus.OK);
    }

    @GetMapping(value={"/hot" })
    @ApiOperation(value = "전체 조회 수 상위 10개씩 기사를 가져온다", notes = "어제자 뉴스 중 조회 수 상위 10개씩 기사를 가져온다")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<List<NewsResponseDto>> getNewsHot(){
        List<NewsResponseDto> responseArray = newsService.getNewsHot();
        return new ResponseEntity<List<NewsResponseDto>>(responseArray, HttpStatus.OK);
    }

    @GetMapping("/related/{n_id}")
    @ApiOperation(value = "관련 기사를 가져온다", notes = "관련 기사를 6개 제공한다 => 6 미정 // 현재는 category 동일한 것 6개")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<List<NewsResponseDto>> getNewsRelated(@PathVariable(required = false) Integer n_id){
        List<NewsResponseDto> responseArray = newsService.getNewsRelated(n_id);
        return new ResponseEntity<List<NewsResponseDto>>(responseArray, HttpStatus.OK);
    }

    @GetMapping("/recommend")
    @ApiOperation(value = "추천 기사를 가져온다", notes = "추천 기사를 20개 제공한다 => 추천 알고리즘 생길 때 까지는 HOT과 동일하게")
    @ApiResponses({
            @ApiResponse(code = 200, message="성공", response = List.class),
            @ApiResponse(code = 401, message="로그인정보 없음"),
            @ApiResponse(code = 500, message="서버오류")
    })
    public ResponseEntity<List<NewsResponseDto>> getNewsRecommend(){
        List<NewsResponseDto> responseArray = newsService.getNewsRecommend();
        return new ResponseEntity<List<NewsResponseDto>>(responseArray, HttpStatus.OK);
    }
}
