package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.exception.ExistingEmailException;
import com.ssafy.newstudy.model.dao.UserDao;
import com.ssafy.newstudy.model.dto.UserDto;
import com.ssafy.newstudy.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
@RequiredArgsConstructor
public class UserService {
//    public static final String INFO = "INFO::";
//    private static final String HEART = "HEART";

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;

    private final JwtTokenUtil jwtTokenUtil;
//    private final RedisUtil redisUtil;

//    @Value("${spring.servlet.multipart.location}")
//    private String root;

    public void createUser(UserDto userDto){
        userDto.setPw(passwordEncoder.encode(userDto.getPw()));
        userDao.insertUser(userDto);
    }

    public UserDto getUserByEmail(String email) {
        UserDto userDto = userDao.selectUserByEmail(email);
        if (userDto==null)
            throw new UsernameNotFoundException("존재하지 않는 이메일입니다.");
        return userDto;
    }

    public UserDto getUserByUid(int uId){
        UserDto userDto = userDao.selectUserByUid(uId);
        if(userDto == null){
            throw new UsernameNotFoundException("존재하지 않는 u_id입니다.");
        }
        return userDto;
    }

    public void updateLevel(String email, int level) {
        UserDto userDto = userDao.selectUserByEmail(email);
        userDto.setLevel(level);
        userDao.updateUser(userDto);
    }

    public void checkExistingEmail(String email) throws ExistingEmailException{
        UserDto userDto = userDao.selectUserByEmail(email);
        if(userDto != null){
            throw new ExistingEmailException();
        }
    }

    public int getUidFromBearerToken(String BearerToken) {
        return userDao.selectUidByEmail(jwtTokenUtil.getEmailFromBearerToken(BearerToken));
    }

    public void saveImage(int u_id, MultipartFile multipartFile) throws IOException {

        String encodedImage = Base64.getEncoder().encodeToString(multipartFile.getBytes());
        String ext = multipartFile.getOriginalFilename().substring(multipartFile.getOriginalFilename().lastIndexOf(".") + 1);
       String src ="data:image/"+ext+";base64,"+encodedImage;
        userDao.saveImage(new UserDto().builder().u_id(u_id).src(src).build());
    }
}