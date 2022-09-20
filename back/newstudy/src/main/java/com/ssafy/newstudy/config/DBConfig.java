package com.ssafy.newstudy.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(basePackages = "com.ssafy.newstudy.model.dao")
public class DBConfig {
}
