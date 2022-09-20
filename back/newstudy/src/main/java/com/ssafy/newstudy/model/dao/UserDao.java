package com.ssafy.newstudy.model.dao;

import com.ssafy.newstudy.model.dto.UserDto;

public interface UserDao {
    UserDto selectUserByEmail(String email);
    void insertUser(UserDto userDto);
    void updateUser(UserDto userDto);
}