package com.ssafy.newstudy.model.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private int uId;
    private String email;
    private String pw;
    private int level;
    private String nickname;
    private String src;
    private List<Authority> authorities = new ArrayList<>();
}