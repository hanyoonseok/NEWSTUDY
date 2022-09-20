package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.exception.InvalidEmailAndPasswordException;
import com.ssafy.newstudy.model.dao.UserDao;
import com.ssafy.newstudy.model.dto.UserDto;
import com.ssafy.newstudy.util.JWToken;
import com.ssafy.newstudy.util.JwtTokenUtil;
import com.ssafy.newstudy.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service("userService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenUtil jwtTokenUtil;
    private final RedisUtil redisUtil;

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public void createUser(UserDto userDto) {
        userDto.setPw(passwordEncoder.encode(userDto.getPw()));
        userDao.insertUser(userDto);
    }
    @Override
    public UserDto getUserByEmail(String email) {
        return userDao.selectUserByEmail(email);
    }

    //response.success(JwtTokenUtil.getToken(loginInfo.getEmail()), "login success", HttpStatus.OK)
    @Override
    public JWToken login(UserDto userDto) {
        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if (checkRightPw(userDto)) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
//            JwtTokenUtil.getToken(loginInfo.getEmail())
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDto.getEmail(), userDto.getPw());
            Authentication auth = authenticationManagerBuilder.getObject().authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(auth);
            return jwtTokenUtil.createToken(userDto, auth);
//            return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(loginInfo.getEmail())));
        }

        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
//        return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
        throw new InvalidEmailAndPasswordException();
    }

    @Override
    public boolean checkRightPw(UserDto userDto) {
        UserDto user = getUserByEmail(userDto.getEmail());
        return passwordEncoder.matches(userDto.getPw(), user.getPw());
    }

    @Override
    public void logout(String refreshToken) {
        redisUtil.delete(refreshToken);
    }

    @Override
    public void updateLevel(String email, int level) {
        UserDto userDto = userDao.selectUserByEmail(email);
        userDto.setLevel(level);
        userDao.updateUser(userDto);
    }

    @Override
    public JWToken reissue(String refreshToken) {
        String email = jwtTokenUtil.getEmailFromRefreshToken(refreshToken);

        if(email==null){
            //예외처리
            return null;
        }

        if(!refreshToken.equals(redisUtil.get(email))){
            //예외처리
            return null;
        }
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        return jwtTokenUtil.reissueAccessToken(email, auth);
    }

    @Override
    public String saveImage(MultipartFile multipartFile) throws IOException {
        String path = System.getProperty("user.dir")+"\\"+ LocalDateTime.now().getMonthValue();
        logger.info("path : {}",path);
        String fileName = UUID.randomUUID().toString().substring(0, 10)+multipartFile.getOriginalFilename();

        File dest = new File(path, fileName);
        if(!dest.exists()){
            dest.mkdirs();
        }
        multipartFile.transferTo(dest);

        return LocalDateTime.now().getMonthValue()+"`"+fileName;
    }
}
