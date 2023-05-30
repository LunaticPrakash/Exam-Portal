package com.project.examportalbackend.services;

import com.project.examportalbackend.models.Category;

import java.util.List;

public interface CategoryService {

    Category addCategory(Category category);

    List<Category> getCategories();

    Category getCategory(Long catId);

    Category updateCategory(Category category);

    void deleteCategory(Long categoryId);
}
