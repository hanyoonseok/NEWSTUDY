package com.ssafy.newstudy.model.dto;

import lombok.Data;

@Data
public class UserTmp {
    private Integer u_id;
    private String email;
    private String pw;
    private int level;
    private String nickname;
    private String src;
}
