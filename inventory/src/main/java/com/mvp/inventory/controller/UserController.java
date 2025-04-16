package com.mvp.inventory.controller;

import com.mvp.inventory.dto.LoginDetails;
import com.mvp.inventory.dto.TokenRequest;
import com.mvp.inventory.dto.TokenResponse;
import com.mvp.inventory.dto.UserInfo;
import com.mvp.inventory.service.JWTService;
import com.mvp.inventory.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Slf4j
public class UserController {

    private final UserService userService;
    private final JWTService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    public UserController(UserService userService, JWTService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserInfo dto) {
        return new ResponseEntity<>(userService.saveUserInfo(dto), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDetails loginDetails) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDetails.getUserName(), loginDetails.getPassword()
        ));
        if (authentication.isAuthenticated()) {
            log.info("User authenticated successfully");
            TokenResponse tokenResponse = TokenResponse.builder()
                    .token(jwtService.generateToken(loginDetails.getUserName()))
                    .refreshToken(jwtService.generateRefreshToken(loginDetails.getUserName()))
                    .valid(true)
                    .build();
            return new ResponseEntity<>(tokenResponse,HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Bad credentials",HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> fetchUser(@PathVariable Long userId)  {
        return new ResponseEntity<>(userService.fetchByUserId(userId), HttpStatus.FOUND);
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestBody TokenRequest request) {
        log.error("Request received for token validation");
        TokenResponse tokenResponse = TokenResponse.builder()
                .token(request.getToken())
                .refreshToken(request.getRefreshToken())
                .valid(jwtService.validateToken(request.getToken()))
                .build();
        return new ResponseEntity<>(tokenResponse,HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody TokenRequest req) {
        if (!jwtService.validateToken(req.getRefreshToken())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String username = jwtService.extractUserName(req.getRefreshToken());
        String newAccessToken = jwtService.generateToken(username);

        TokenResponse tokenResponse = TokenResponse.builder()
                .token(newAccessToken)
                .refreshToken(req.getRefreshToken())
                .valid(true)
                .build();
        return ResponseEntity.ok(tokenResponse);
    }


}
