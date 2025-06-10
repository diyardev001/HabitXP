package com.habitxp.backend.controller;

import com.habitxp.backend.dto.*;
import com.habitxp.backend.model.User;
import com.habitxp.backend.security.JwtService;
import com.habitxp.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshRequest request) {
        String refreshToken = request.getRefreshToken();

        if (!jwtService.isTokenValid(refreshToken)) {
            return ResponseEntity.status(401).body("Refresh token invalid or expired.");
        }

        String email = jwtService.extractUserId(refreshToken);
        User user = authService.getUserByEmail(email);

        if (!refreshToken.equals(user.getRefreshToken())) {
            return ResponseEntity.status(401).body("Refresh token mismatch.");
        }

        String newAccessToken = jwtService.generateAccessToken(email);
        String newRefreshToken = jwtService.generateRefreshToken(email);

        user.setRefreshToken(newRefreshToken);
        authService.saveUser(user);

        return ResponseEntity.ok(new TokenResponse(newAccessToken, newRefreshToken));
    }
}
