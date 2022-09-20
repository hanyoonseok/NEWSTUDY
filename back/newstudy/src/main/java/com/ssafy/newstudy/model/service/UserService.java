package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.model.dto.UserDto;
import com.ssafy.newstudy.util.JWToken;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    void createUser(UserDto userDto);
    UserDto getUserByEmail(String Email);
    String saveImage(MultipartFile file) throws IOException;
    JWToken login(UserDto userDto);
    boolean checkRightPw (UserDto userDto);
    void logout(String refreshToken);
    void updateLevel(String email, int level);
    JWToken reissue(String refreshToken);
}
