package com.ssafy.newstudy.controller;

import com.ssafy.newstudy.model.dto.*;
import com.ssafy.newstudy.model.service.CategoryService;
import com.ssafy.newstudy.model.service.NewsService;
import com.ssafy.newstudy.model.service.UserService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    private final CategoryService categoryService;

    private int[] category_start_id = {1, 20, 28, 40, 62, 67};
    private int[] category_end_id = {19, 27, 39, 61, 66, 97};

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
            "level(없으면 로그인한 유저의 lv), " +
            "categoryid 를 int 배열로 받아서, 해당되는 배열만 가져옴 \n" +
            "titlekeyword, categorykeyword (타이틀만 검색 -> titlekeyword, 카테고리만 -> categorykeyword, 둘 다 하려면 양쪽에) \n" +
            "startdate, enddate 추가 \n"+
            ", page(필수!) 사용 가능")
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

        //키워드 검색일 경우
        if((newsRequestDto.getContentkeyword() != null && !newsRequestDto.getContentkeyword().equals(""))
                || (newsRequestDto.getTitlekeyword() != null && !newsRequestDto.getTitlekeyword().equals(""))) {
            HashMap<Integer, Integer> categoryCnt = new HashMap<>();

            //키워드 찾기
            String keyword = "";
            if(newsRequestDto.getContentkeyword() != null && !newsRequestDto.getContentkeyword().equals(""))
                keyword = newsRequestDto.getContentkeyword();
            else
                keyword = newsRequestDto.getTitlekeyword();

            //카테고리 범위 모두 다
            for(int i = 0 ; i < 6 ; i++){
                HashMap tmp_map = new HashMap();
                tmp_map.put("startcategoryid", category_start_id[i]);
                tmp_map.put("endcategoryid", category_end_id[i]);

                Integer[] categoryid = new Integer[category_end_id[i]-category_start_id[i]+1];
                for(int j = 0 ; j < categoryid.length ; j++){
                    categoryid[j] = j+category_start_id[i];
                }
                tmp_map.put("categoryid", categoryid);
                tmp_map.put("search", keyword);
                int result = newsService.selectNewsCountByCategory(tmp_map);
                categoryCnt.put(category_start_id[i], result);
            }
            map.put("categoryCnt", categoryCnt);
        }
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
    public ResponseEntity<List<NewsResponseDto>> getNewsRecommend(@ApiParam(value = "로그인된 유저 정보", required = true) @RequestHeader("Authorization") String bearerToken){
        NewsRequestDto newsRequestDto = new NewsRequestDto();
        UserDto user = userService.getUserByUid(userService.getUidFromBearerToken(bearerToken));

        //유저 레벨 넣고
        newsRequestDto.setStartlevelAndEndlevel(user.getLevel(), user.getLevel());
        //유저 카테고리 넣고
        List<CategoryResponseDto> tmp = categoryService.getCategorys(user.getU_id());
        Integer[] categorys = null;
        if(tmp != null && !tmp.isEmpty()) {
            categorys = tmp.toArray(new Integer[0]);
            newsRequestDto.setCategoryid(categorys);
        }

        List<NewsResponseDto> responseArray = newsService.getNewsRecommend(newsRequestDto);
        return new ResponseEntity<List<NewsResponseDto>>(responseArray, HttpStatus.OK);
    }
}
