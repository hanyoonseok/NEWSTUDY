package com.ssafy.newstudy.model.dto;

import com.ssafy.newstudy.util.JWToken;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JWTokenDto {
    private String grantType;
    private String accessToken;

    public static JWTokenDto of(JWToken token){
        JWTokenDto jwToken = new JWTokenDto();
        jwToken.accessToken = token.getAccessToken();
        jwToken.grantType = "Bearer";
        return jwToken;
    }
}