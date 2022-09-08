package com.lunatic.examportalbackend.services;

import com.lunatic.examportalbackend.models.LoginRequest;
import com.lunatic.examportalbackend.models.LoginResponse;
import com.lunatic.examportalbackend.models.User;

public interface AuthService {
    User registerUserService(User user) throws Exception;

    LoginResponse loginUserService(LoginRequest loginRequest) throws Exception;
}
