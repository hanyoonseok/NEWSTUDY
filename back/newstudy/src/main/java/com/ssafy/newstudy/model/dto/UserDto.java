package com.ssafy.newstudy.model.dto;

import lombok.*;

import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String email;
    private String pw;
    private int level;
    private String nickname;
    private String src;
    private Set<Authority> authorities;
}