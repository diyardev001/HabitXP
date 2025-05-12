package com.habitxp.backend.service;

import com.habitxp.backend.dto.AuthResponse;
import com.habitxp.backend.dto.LoginRequest;
import com.habitxp.backend.dto.RegisterRequest;
import com.habitxp.backend.model.User;
import com.habitxp.backend.repository.UserRepository;
import com.habitxp.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private boolean isPasswordSecure(String password) {
        // Mindestens 8 Zeichen und einen Großbuchstaben
        String regex = "^(?=.*[A-Z]).{8,}$";
        return password.matches(regex);
    }

    public AuthResponse register(RegisterRequest request) {
        if (!isPasswordSecure(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password must be at least 8 characters long and contain at least one uppercase letter.");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already in use");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already in use");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .xp(0)
                .xpGoal(100) // Todo
                .coins(0)
                .level(1)
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token);
    }
}
