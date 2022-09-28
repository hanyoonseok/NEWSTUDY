package com.ssafy.newstudy.controller;


import com.ssafy.newstudy.model.dto.JWTokenDto;
import com.ssafy.newstudy.model.dto.UserDto;
import com.ssafy.newstudy.model.response.Response;
import com.ssafy.newstudy.model.service.AuthService;
import com.ssafy.newstudy.model.service.UserService;
import com.ssafy.newstudy.util.JWToken;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;
    private final UserService userService;
    private final Response response;
//    private final OAuthService oAuthService;

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserDto.class),
            @ApiResponse(code = 401, message = "인증 실패", response = Response.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = Response.class),
            @ApiResponse(code = 500, message = "서버 오류", response = Response.class)
    })
    public ResponseEntity<?> login(@RequestBody @ApiParam(value = "로그인 정보", required = true) UserDto userDto, HttpServletResponse resp) {

        JWToken jwt = authService.login(userDto);

        int u_id = userService.getUidFromBearerToken("Bearer "+jwt.getAccessToken());
        authService.saveLoginLog(u_id);
        authService.checkLoginCnt(u_id);

//        ResponseCookie cookie = ResponseCookie.from("refresh-token", jwt.getRefreshToken())
//                .maxAge(60*60*24*15)
//                .httpOnly(true)
//                .secure(true)
//                .domain("")
//                .path("/")
//                .sameSite("None")
//                .build();
//
//        resp.setHeader("Set-Cookie", cookie.toString());
        return response.success(JWTokenDto.of(jwt));
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue(value="refresh-token", required = false) String refreshToken, HttpServletResponse resp){
        authService.logout(refreshToken);

//        ResponseCookie cookie = ResponseCookie.from("refresh-token",null)
//                .maxAge(0)
//                .httpOnly(true)
//                .secure(true)
//                .domain("")
//                .path("/")
//                .sameSite("None")
//                .build();
//
//        resp.setHeader("Set-Cookie",cookie.toString());
        return response.success("logout success");
    }

//    //api docs에 추가해야겠다.
//    //프론트에서 access token 확인한 뒤에 만료됐다면 다시 신청해줘야함.
//    @GetMapping("/reissue")
//    public ResponseEntity<?> reissue(@CookieValue(value="refresh-token", required = false) String refreshToken){
//        JWToken jwt = authService.reissue(refreshToken);
//        return response.success(JWTokenDto.of(jwt));
//    }

//    @GetMapping("/oauth2/{type}")
//    public void socialLogin(@PathVariable String type) throws IOException {
//        oAuthService.request(SocialLoginType.valueOf(type.toUpperCase()));
//    }
//
//    @GetMapping("/oauth2/{type}/callback")
//    public void callback(@PathVariable String type, @RequestParam String code){
//        oAuthService.oauthLogin(SocialLoginType.valueOf(type.toUpperCase()),code);
//    }
}