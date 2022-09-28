package com.ssafy.newstudy.model.dao;

import com.ssafy.newstudy.model.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao {
    int selectUidByEmail(String email);
    UserDto selectUserByEmail(String email);
    UserDto selectUserByUid(int uId);
    void insertUser(UserDto userDto);
    void updateUser(UserDto userDto);
    void saveLoginLog(int u_id);
    int checkLoginCnt(int u_id);
}