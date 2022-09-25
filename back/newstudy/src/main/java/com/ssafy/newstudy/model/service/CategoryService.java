package com.ssafy.newstudy.model.service;

import com.ssafy.newstudy.model.dao.CategoryDao;
import com.ssafy.newstudy.model.dto.CategoryRequestDto;
import com.ssafy.newstudy.model.dto.CategoryResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public int addCategory(Integer u_id, ArrayList<Integer> addList) {
        for (Integer c_id : addList){
            try{
                if(categoryDao.insertCategory(new CategoryRequestDto(u_id, c_id)) == 0){
                    throw new Exception();
                }
            }catch (Exception e){
                return 0;
            }
        }
        return 1;
    }

    public int deleteCategory(Integer u_id, ArrayList<Integer> existingList) {
        for (Integer c_id : existingList){
            try{
                if(categoryDao.deleteCategory(new CategoryRequestDto(u_id, c_id)) == 0){
                    throw new Exception();
                }
            }catch (Exception e){
                return 0;
            }
        }
        return 1;
    }
}
