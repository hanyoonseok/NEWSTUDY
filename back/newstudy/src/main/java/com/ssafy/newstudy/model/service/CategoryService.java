package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.model.dao.BadgeDao;
import com.ssafy.newstudy.model.dao.CategoryDao;
import com.ssafy.newstudy.model.dto.BadgeResponse;
import com.ssafy.newstudy.model.dto.CategoryRequestDto;
import com.ssafy.newstudy.model.dto.CategoryResponseDto;
import com.ssafy.newstudy.model.dto.UserTmp;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryDao categoryDao;

    public List<CategoryResponseDto> getCategorysAll() {
        return categoryDao.selectAllCategory();
    }
    public List<CategoryResponseDto> getCategorys(Integer u_id) {
        return categoryDao.selectCategory(u_id);
    }
    public int addCategory(CategoryRequestDto categoryRequestDto) {
        return categoryDao.insertCategory(categoryRequestDto);
    }

}
