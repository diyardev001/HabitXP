package com.habitxp.backend.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.habitxp.backend.config.TestSecurityConfig;
import com.habitxp.backend.dto.AuthResponse;
import com.habitxp.backend.dto.RegisterRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("test")
@AutoConfigureMockMvc
@Import(TestSecurityConfig.class)
@SpringBootTest
public class SecurityAccessIntegrationTest extends IntegrationTestBase {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String accessToken;

    @BeforeEach
    void setUp() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setUsername("securetest");
        registerRequest.setEmail("securetest@example.com");
        registerRequest.setPassword("Password123");
        registerRequest.setFirstName("Secure");
        registerRequest.setLastName("Test");

        var mvcResult = mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andReturn();

        int status = mvcResult.getResponse().getStatus();

        if (status == 200) { // nur wenn Registrierung erfolgreich war
            String response = mvcResult.getResponse().getContentAsString();
            AuthResponse authResponse = objectMapper.readValue(response, AuthResponse.class);
            this.accessToken = authResponse.getAccessToken();
        } else if (status == 409) {
            // User existiert bereits -> dann manuell Login machen
            this.accessToken = loginAndGetToken(registerRequest.getEmail(), registerRequest.getPassword());
        }
    }

    private String loginAndGetToken(String email, String password) throws Exception {
        // Hier musst du ggf. noch deinen Login-Endpunkt anpassen
        var loginRequest = Map.of("email", email, "password", password);
        var mvcResult = mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andReturn();

        String response = mvcResult.getResponse().getContentAsString();
        AuthResponse authResponse = objectMapper.readValue(response, AuthResponse.class);
        return authResponse.getAccessToken();
    }


    @Test
    void accessProtectedEndpointWithValidToken() throws Exception {
        mockMvc.perform(get("/user/profile")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken))
                .andExpect(status().isOk());
    }

    @Test
    void accessProtectedEndpointWithoutToken() throws Exception {
        mockMvc.perform(get("/user/profile"))
                .andExpect(result -> {
                    int status = result.getResponse().getStatus();
                    assertTrue(status == 401 || status == 403, "Expected 401 or 403 but got " + status);
                });
    }

    @Test
    void accessProtectedEndpointWithInvalidToken() throws Exception {
        mockMvc.perform(get("/user/profile")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer invalidtoken123"))
                .andExpect(status().isUnauthorized());
    }
}
