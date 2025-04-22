package com.habitxp.backend.service;

import com.habitxp.backend.dto.AuthResponse;
import com.habitxp.backend.dto.RegisterRequest;
import com.habitxp.backend.model.User;
import com.habitxp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .xp(0)
                .xpGoal(100) // Todo
                .gold(0)
                .level(1)
                .build();

        userRepository.save(user);

        // Todo: Temporär - Token kommt später
        return new AuthResponse("placeholder-token");
    }
}
