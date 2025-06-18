package com.habitxp.backend.config;

import com.habitxp.backend.security.JwtAuthenticationFilter;
import com.habitxp.backend.security.JwtService;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

/**
 * <h1>Spezielle Security-Konfiguration für Integrationstests.</h1>
 *
 * <h2>Zweck:</h2>
 * Diese Konfiguration ersetzt die produktive Sicherheitskonfiguration,
 * um Tests in einer kontrollierten Umgebung auszuführen.
 *
 * <h2>Eigenschaften:</h2>
 * <ul>
 *   <li>CSRF-Schutz ist deaktiviert</li>
 *   <li>Anonymous Access ist deaktiviert, um explizite Autorisierung zu erzwingen</li>
 *   <li>Alle Endpunkte unter <code>/auth/**</code> sind öffentlich zugänglich</li>
 *   <li>Alle anderen Endpunkte erfordern gültige Authentifizierung</li>
 *   <li>Ein <code>JwtAuthenticationFilter</code> wird eingebunden</li>
 *   <li>Bei fehlender Authentifizierung wird ein 401 (Unauthorized) zurückgegeben</li>
 * </ul>
 *
 * <h2>Hinweis:</h2>
 * Diese Klasse ist mit <code>@TestConfiguration</code> annotiert und wird
 * ausschließlich im Testkontext eingebunden (z. B. mit <code>@Import(TestSecurityConfig.class)</code>).
 */

@TestConfiguration
@Import({JwtAuthenticationFilter.class, JwtService.class})
public class TestSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http
                .csrf().disable()
                .anonymous().disable() // Wichtig: Anonymous deaktiviert → Tests bekommen 401
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .anyRequest().authenticated()
                )
                .exceptionHandling(exception ->
                        exception.authenticationEntryPoint(new HttpStatusEntryPoint(UNAUTHORIZED))
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
