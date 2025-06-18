package com.habitxp.backend.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.habitxp.backend.config.TestSecurityConfig;
import com.habitxp.backend.dto.AuthResponse;
import com.habitxp.backend.dto.LoginRequest;
import com.habitxp.backend.dto.RegisterRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * <h1>Integrationstests für die Authentifizierungs-Endpunkte der Anwendung</h1>
 * <p>
 * <h2>Testziel:</h2>
 * Verifiziert den gesamten Authentifizierungs-Flow inklusive Registrierung, Login,
 * Token-Erneuerung und Fehlerbehandlung bei ungültigen oder doppelten Anmeldedaten.
 * <p>
 * <h2>Getestete Szenarien:</h2>
 * <ul>
 *     <li>Erfolgreiche Registrierung eines neuen Benutzers</li>
 *     <li>Erfolgreicher Login nach Rgistrierung</li>
 *     <li>Verwendung des Refresh Tokens zur Erneuerung von Tokens</li>
 *     <li>Login mit ungültigen Anmeldedaten (z. B. falsches Passwort)</li>
 *     <li>Fehlermeldung bei mehrfacher Registrierung derselben E-Mail-Adresse</li>
 * </ul>
 * <p>
 * <h2>Rahmenbedingungen:</h2>
 * <ul>
 *     <li>Testprofil 'test' wird verwendet</li>
 *     <li>Datenbank wird vor und nach den Tests bereinigt, wenn in application-test.properties true</li>
 *     <li>Spring Security is durch {@link TestSecurityConfig} für Tests konfiguriert</li>
 * </ul>
 */

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
@Import(TestSecurityConfig.class)
public class AuthIntegrationTest extends IntegrationTestBase {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;

    @BeforeEach
    void setUp() {
        String uniqueId = UUID.randomUUID().toString();

        registerRequest = new RegisterRequest();
        registerRequest.setUsername("testuser_" + uniqueId);
        registerRequest.setEmail("testuser_" + uniqueId + "@example.com");
        registerRequest.setPassword("Password123");
        registerRequest.setFirstName("Test");
        registerRequest.setLastName("User");

        loginRequest = new LoginRequest();
        loginRequest.setEmail(registerRequest.getEmail());
        loginRequest.setPassword("Password123");
    }

    @Test
    void testRegisterAndLoginFlow() throws Exception {
        // Registration testen
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken", notNullValue()))
                .andExpect(jsonPath("$.refreshToken", notNullValue()));

        // Login testen
        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken", notNullValue()))
                .andExpect(jsonPath("$.refreshToken", notNullValue()));
    }

    @Test
    void testRefreshTokenFlow() throws Exception {
        // Registrierung durchführen
        String registerResponse = mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        AuthResponse authResponse = objectMapper.readValue(registerResponse, AuthResponse.class);
        String refreshToken = authResponse.getRefreshToken();

        // Refresh Token benutzen
        mockMvc.perform(post("/auth/refresh")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"refreshToken\": \"" + refreshToken + "\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken", notNullValue()))
                .andExpect(jsonPath("$.refreshToken", notNullValue()));
    }

    @Test
    void testLoginWithInvalidCredentials() throws Exception {
        loginRequest.setPassword("WrongPassword");

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void testDuplicateRegistration() throws Exception {
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk());

        // 2. Versuch mit gleicher Email
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isConflict());
    }
}
