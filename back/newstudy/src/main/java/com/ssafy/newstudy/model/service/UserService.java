package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.model.dao.UserDao;
import com.ssafy.newstudy.model.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

//    private final JwtTokenUtil jwtTokenUtil;
//    private final RedisUtil redisUtil;

//    @Value("${spring.servlet.multipart.location}")
//    private String root;

    public void createUser(UserDto userDto){
        userDao.insertUser(userDto);
    }

    public UserDto getUserByEmail(String email) {
        UserDto userDto = userDao.selectUserByEmail(email);
        if (userDto==null)
            throw new UsernameNotFoundException("존재하지 않는 이메일입니다.");
        return userDto;
    }

    public void updateLevel(String email, int level) {
        UserDto userDto = userDao.selectUserByEmail(email);
        userDto.setLevel(level);
        userDao.updateUser(userDto);
    }

//    public User getUserById(Long id) {
//        Optional<User> user = userRepository.findUserById(id);
//        if (!user.isPresent()) throw new UsernameNotFoundException("존재하지 않는 유저입니다.");
//        return user.get();
//    }

    public String saveImage(MultipartFile multipartFile) throws IOException {
        String path = System.getProperty("user.dir")+"\\"+LocalDateTime.now().getMonthValue();
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