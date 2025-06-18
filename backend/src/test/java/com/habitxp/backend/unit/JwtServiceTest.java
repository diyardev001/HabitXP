package com.habitxp.backend.unit;

import com.habitxp.backend.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * <h1>Unit-Tests für die Klasse {@link com.habitxp.backend.security.JwtService}</h1>
 *
 * <h2>Testziel:</h2>
 * Testet die Generierung, Validierung und Extraktion von Benutzerinformationen aus
 * JWTs für Access- und Refresh-Tokens.
 *
 * <h2>Getestete Szenarien:</h2>
 * <ul>
 *   <li>Erzeugung und Validierung eines gültigen Access-Tokens</li>
 *   <li>Erzeugung und Validierung eines gültigen Refresh-Tokens</li>
 *   <li>Verhalten bei Übergabe eines ungültigen Tokens</li>
 * </ul>
 *
 * <h2>Hinweise:</h2>
 * <ul>
 *   <li>Die JWT-Secret wird manuell per Reflection gesetzt (bypasst @Value)</li>
 * </ul>
 */

public class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setup() {
        jwtService = new JwtService();
        // Secret Key manuell setzen, da sonst @Value nicht greift im Unit-Test
        ReflectionTestUtils.setField(jwtService, "jwtSecret", "my-very-secret-jwt-key-that-is-long-enough");
    }

    @Test
    void shouldGenerateAndValidateAccessToken() {
        String userId = "user123";
        String accessToken = jwtService.generateAccessToken(userId);

        assertThat(jwtService.isTokenValid(accessToken)).isTrue();
        assertThat(jwtService.extractUserId(accessToken)).isEqualTo(userId);
    }

    @Test
    void shouldGenerateAndValidateRefreshToken() {
        String userId = "user456";
        String refreshToken = jwtService.generateRefreshToken(userId);

        assertThat(jwtService.isTokenValid(refreshToken)).isTrue();
        assertThat(jwtService.extractUserId(refreshToken)).isEqualTo(userId);
    }

    @Test
    void invalidTokenShouldReturnFalse() {
        String invalidToken = "this.is.not.a.valid.token";

        assertThat(jwtService.isTokenValid(invalidToken)).isFalse();
    }
}
