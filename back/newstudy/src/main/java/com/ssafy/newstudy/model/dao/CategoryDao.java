package com.ssafy.newstudy.model.dao;

import com.ssafy.newstudy.model.dto.CategoryRequestDto;
import com.ssafy.newstudy.model.dto.CategoryResponseDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryDao {
    List<CategoryResponseDto> selectAllCategory();

    List<CategoryResponseDto> selectCategory(Integer u_id);

    int insertCategory(CategoryRequestDto categoryRequestDto);
}
