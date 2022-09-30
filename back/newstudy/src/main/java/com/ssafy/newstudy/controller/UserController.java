package com.ssafy.newstudy.controller;

import com.ssafy.newstudy.exception.ExistingEmailException;
import com.ssafy.newstudy.model.dto.ImageDto;
import com.ssafy.newstudy.model.dto.MailDto;
import com.ssafy.newstudy.model.dto.UserDto;
import com.ssafy.newstudy.model.response.Response;
import com.ssafy.newstudy.model.service.MailService;
import com.ssafy.newstudy.model.service.UserService;
import com.ssafy.newstudy.util.JwtTokenUtil;
import io.swagger.annotations.*;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final MailService mailService;
    private final Response response;
    private final JwtTokenUtil jwtTokenUtil;

//    @Value("${spring.servlet.multipart.location}")
//    private String root;


    @PostMapping("/signup")
    @ApiOperation(value = "회원 가입", notes = "<strong>이메일와 패스워드</strong>를 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> signup(
            @RequestBody @ApiParam(value="회원가입 정보", required = true) UserDto userDto) {
        userService.createUser(userDto);
        return response.success("signup success");
    }

    @PostMapping("/mail")
    @ApiOperation(value ="인증 메일 발송")
    public ResponseEntity<?> mail(@RequestBody UserDto userDto){
        try{
            //존재한다면 ExistingEmailException 예외 발생
            userService.checkExistingEmail(userDto.getEmail());
        }catch (ExistingEmailException e){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        MailDto mail = mailService.createMailAndChangePassword(userDto.getEmail());
        mailService.mailSend(mail);

        @Getter
        class MailRes {
            String email;
            String tempPassword;

            public MailRes(String email, String tempPassword) {
                this.email = email;
                this.tempPassword = tempPassword;
            }

        }

        return response.success(new MailRes(userDto.getEmail(), mail.getTmpPassword()), "메일 발송 성공", HttpStatus.OK);
    }

    @PutMapping("/level/{level}")
    @ApiOperation(value = "레벨 변경", notes = "레벨테스트 결과에 따라 레벨을 변경한다.")
    public ResponseEntity<?> updateLevel(@RequestHeader("Authorization") String bearerToken, @PathVariable int level) {
        userService.updateLevel(jwtTokenUtil.getEmailFromBearerToken(bearerToken), level);
        return response.success("updateLevel success");
    }
    @GetMapping("")
    @ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String bearerToken) {
        return response.success((userService.getUserByEmail(jwtTokenUtil.getEmailFromBearerToken(bearerToken)))
                ,"user information success"
                ,HttpStatus.OK);
    }

    @PostMapping("/avatar")
    public ResponseEntity<?> addImage(@RequestPart("file") MultipartFile file, @RequestHeader("Authorization") String bearerToken) {
        try{
            int u_id = userService.getUidFromBearerToken(bearerToken);
            userService.saveImage(u_id, file);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/avatar")
    public ResponseEntity<?> getImage(@RequestHeader("Authorization") String bearerToken) throws IOException {
        String src = userService.getUserByUid(userService.getUidFromBearerToken(bearerToken)).getSrc();
        return new ResponseEntity<>(src, HttpStatus.OK);
    }
}
