package com.lunatic.examportalbackend.controllers;

import com.lunatic.examportalbackend.models.LoginRequest;
import com.lunatic.examportalbackend.models.LoginResponse;
import com.lunatic.examportalbackend.models.User;
import com.lunatic.examportalbackend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    AuthService authService;


    @PostMapping("/register")
    public User registerUser(@RequestBody User user) throws Exception {
        return authService.registerUserService(user);
    }

    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody LoginRequest loginRequest) throws Exception {
        return authService.loginUserService(loginRequest);
    }

}
