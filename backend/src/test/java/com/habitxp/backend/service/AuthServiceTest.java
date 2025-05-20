package com.habitxp.backend.service;

import com.habitxp.backend.dto.AuthResponse;
import com.habitxp.backend.dto.LoginRequest;
import com.habitxp.backend.dto.RegisterRequest;
import com.habitxp.backend.model.User;
import com.habitxp.backend.repository.UserRepository;
import com.habitxp.backend.security.JwtService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @InjectMocks
    private AuthService authService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @Captor
    private ArgumentCaptor<User> userCaptor;

    // ------------- REGISTER -----------------

    @Test
    void register_shouldSucceed_withValidInput() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("user@example.com");
        request.setUsername("testuser");
        request.setPassword("Secure123");
        request.setFirstName("Test");
        request.setLastName("User");

        when(userRepository.existsByEmail("user@example.com")).thenReturn(false);
        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(passwordEncoder.encode("Secure123")).thenReturn("hashed-password");
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));
        when(jwtService.generateToken("user@example.com")).thenReturn("jwt-token");

        AuthResponse response = authService.register(request);

        assertThat(response.getToken()).isEqualTo("jwt-token");
    }

    @Test
    void register_shouldFail_withWeakPassword() {
        RegisterRequest request = new RegisterRequest();
        request.setPassword("abc123");

        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(ResponseStatusException.class)
                .satisfies(ex -> assertThat(((ResponseStatusException) ex).getStatusCode().value()).isEqualTo(400));
    }

    @Test
    void register_shouldFail_withDuplicateEmail() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("duplicate@example.com");
        request.setUsername("unique");
        request.setPassword("Secure123");

        when(userRepository.existsByEmail("duplicate@example.com")).thenReturn(true);

        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(ResponseStatusException.class)
                .satisfies(ex -> assertThat(((ResponseStatusException) ex).getStatusCode().value()).isEqualTo(409));
    }

    @Test
    void register_shouldFail_withDuplicateUsername() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("unique@example.com");
        request.setUsername("duplicate");
        request.setPassword("Secure123");

        when(userRepository.existsByEmail("unique@example.com")).thenReturn(false);
        when(userRepository.existsByUsername("duplicate")).thenReturn(true);

        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(ResponseStatusException.class)
                .satisfies(ex -> assertThat(((ResponseStatusException) ex).getStatusCode().value()).isEqualTo(409));
    }

    // ------------- LOGIN -----------------

    @Test
    void login_shouldSucceed_withValidCredentials() {
        LoginRequest request = new LoginRequest();
        request.setEmail("user@example.com");
        request.setPassword("CorrectPassword");

        User user = new User();
        user.setEmail("user@example.com");
        user.setPassword("hashed-password");

        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("CorrectPassword", "hashed-password")).thenReturn(true);
        when(jwtService.generateToken("user@example.com")).thenReturn("jwt-token");

        AuthResponse response = authService.login(request);

        assertThat(response.getToken()).isEqualTo("jwt-token");
    }

    @Test
    void login_shouldFail_withWrongPassword() {
        LoginRequest request = new LoginRequest();
        request.setEmail("user@example.com");
        request.setPassword("WrongPassword");

        User user = new User();
        user.setEmail("user@example.com");
        user.setPassword("hashed-password");

        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("WrongPassword", "hashed-password")).thenReturn(false);

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(ResponseStatusException.class)
                .satisfies(ex -> assertThat(((ResponseStatusException) ex).getStatusCode().value()).isEqualTo(401));
    }

    @Test
    void login_shouldFail_ifUserNotFound() {
        LoginRequest request = new LoginRequest();
        request.setEmail("unknown@example.com");

        when(userRepository.findByEmail("unknown@example.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(ResponseStatusException.class)
                .satisfies(ex -> assertThat(((ResponseStatusException) ex).getStatusCode().value()).isEqualTo(401));
    }
}
