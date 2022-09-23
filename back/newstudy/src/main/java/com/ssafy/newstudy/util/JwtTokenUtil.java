package com.ssafy.newstudy.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.newstudy.model.dao.UserDao;
import com.ssafy.newstudy.model.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.stream.Collectors;

//import static com.google.common.collect.Lists.newArrayList;

/**
 * jwt 토큰 유틸 정의.
 */
@Component
public class JwtTokenUtil {
    private static String secretKey;
    public static Integer expirationTime;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String ISSUER = "ssafy.com";
    private final RedisUtil redisUtil;


    @Autowired
    public JwtTokenUtil(@Value("${jwt.secret}") String secretKey, @Value("${jwt.expiration}") Integer expirationTime, RedisUtil redisUtil) {
        this.secretKey = secretKey;
        this.expirationTime = expirationTime;
        this.redisUtil=redisUtil;
    }


    public static JWTVerifier getVerifier() {
        return JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }

    public static String getToken(String userId) {
        Date expires = JwtTokenUtil.getTokenExpiration(expirationTime);
        return JWT.create()
                .withSubject(userId)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    public static String getToken(Instant expires, String userId) {
        return JWT.create()
                .withSubject(userId)
                .withExpiresAt(Date.from(expires))
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    public static Date getTokenExpiration(int expirationTime) {
        Date now = new Date();
        return new Date(now.getTime() + expirationTime);
    }

    public static void handleError(String token) {
        JWTVerifier verifier = JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();

        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }

    public static void handleError(JWTVerifier verifier, String token) {
        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }




    public JWToken createToken(UserDto userDto, Authentication auth) {
        Date date = new Date();
        Long accessExpires = 30*60*1000L; // 30minutes
        Long refreshExpires = 60*60*24*15*1000L; // 15days

        String authorities = auth.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        String accessToken = JWT.create()
                .withSubject(userDto.getEmail())
                .withClaim("auth", authorities)
                .withExpiresAt(new Date(date.getTime() + accessExpires))
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));

        String refreshToken = JWT.create()
                .withSubject(userDto.getEmail())
                .withExpiresAt(new Date(date.getTime() + refreshExpires))
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));

//        redisUtil.set(auth.getName(), refreshToken, refreshExpires);

        return JWToken.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public JWToken reissueAccessToken(String email, Authentication auth){
        Date date = new Date();
        Long accessExpires = 30*60*1000L; // 30minutes

        String authorities = auth.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        String accessToken = JWT.create()
                .withSubject(email)
                .withClaim("auth", authorities)
                .withExpiresAt(new Date(date.getTime() + accessExpires))
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));

        return JWToken.builder()
                .accessToken(accessToken)
                .build();
    }

    public String getEmailFromBearerToken(String bearerToken) {
        if(bearerToken.startsWith(TOKEN_PREFIX)) {
            String token = bearerToken.substring(TOKEN_PREFIX.length());
            return decodeToken(token).getSubject();
        }
        throw new RuntimeException();
    }

    public String getEmailFromRefreshToken(String refreshToken){
        return decodeToken(refreshToken).getSubject();
    }

    public static DecodedJWT decodeToken(String token) {
        try {
            JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC512(secretKey)).withIssuer(ISSUER).build();

            // 토큰 검증
            DecodedJWT decodedJWT = jwtVerifier.verify(token);
            return decodedJWT;

        } catch (JWTVerificationException e) {
            throw e;
        }
    }

    /**
     * test용 임시 token
     * @return
     */
    public String tempToken(){
        return JWT.create()
                .withSubject("ssafy@naver.com")
                .withClaim("test", "test1,test2")
                .withExpiresAt(new Date(new Date().getTime() + 1L*expirationTime))
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }
}
