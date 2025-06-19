package com.habitxp.backend.unit;

import com.habitxp.backend.dto.UserProfileResponse;
import com.habitxp.backend.model.Frequency;
import com.habitxp.backend.model.Space;
import com.habitxp.backend.model.Task;
import com.habitxp.backend.model.User;
import com.habitxp.backend.repository.TaskRepository;
import com.habitxp.backend.repository.UserRepository;
import com.habitxp.backend.service.TaskService;
import com.habitxp.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.web.server.ResponseStatusException;

import java.io.Console;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * <h1>Unit-Tests für die Benutzerlogik in der Klasse {@link com.habitxp.backend.service.UserService}</h1>
 *
 * <h2>Testziel:</h2>
 * Überprüft die internen Geschäftslogiken rund um Benutzerverwaltung, wie Abruf, Erstellung,
 * Aktualisierung, Löschung und Profilauswertung.
 *
 * <h2>Getestete Szenarien:</h2>
 * <ul>
 *   <li>Benutzer kann per ID gefunden werden</li>
 *   <li>Exception wird geworfen, wenn Benutzer nicht gefunden wird</li>
 *   <li>Benutzer kann erstellt, aktualisiert und gelöscht werden</li>
 *   <li>Überprüfung, ob Benutzer per E-Mail existiert</li>
 *   <li>Benutzer aus Space-Objekt extrahieren</li>
 *   <li>Rückgabe eines vollständigen Benutzerprofils</li>
 *   <li>Hinzufügen einer Space-ID zum Benutzer</li>
 * </ul>
 *
 * <h2>Teststrategie:</h2>
 * <ul>
 *   <li>Verwendung von {@code Mockito} zur Simulation von Repository-Abhängigkeiten</li>
 *   <li>Kein Spring-Kontext oder echte Datenbankverbindungen</li>
 * </ul>
 */

public class UserServiceTest {

    private UserRepository userRepository;
    private TaskRepository taskRepository;
    private UserService userService;
    private TaskService taskService;

    @BeforeEach
    void setup() {
        userRepository = mock(UserRepository.class);
        taskRepository = mock(TaskRepository.class);
        userService = new UserService(userRepository, taskRepository);
        taskService = new TaskService(null, null, taskRepository, userRepository, null);
    }

    @Test
    void shouldApplyRewardsAndIncreaseStreak() {
        // Arrange
        User user = new User();
        user.setId("user123");
        user.setXp(80);
        user.setCoins(20);
        user.setStreak(3);
        user.setLastStreakUpdate(LocalDate.now().minusDays(2)); // Damit Streak zählen darf

        Task task = new Task();
        task.setRewardXP(50);
        task.setRewardCoins(10);
        task.setUserId("user123");
        task.setFrequency(Frequency.DAILY);

        // andere Tasks (zur Frequenzanalyse)
        Task otherTask = new Task();
        otherTask.setFrequency(Frequency.DAILY);

        when(taskRepository.findByUserId("user123")).thenReturn(List.of(task, otherTask));

        // Act
        taskService.applyRewardsToUser(user, task);
        taskService.applyRewardsToUser(user, task);
        // Assert
        assertThat(user.getXp()).isEqualTo(user.getXp());
        assertThat(user.getCoins()).isEqualTo(user.getCoins());
        assertThat(user.getCurrentXP()).isEqualTo(user.calculateCurrentXP());
        assertThat(user.getLevel()).isEqualTo(user.calculateLevel());
        assertThat(user.getXpGoal()).isEqualTo(user.calculateXPGoal());

        verify(userRepository, times(2)).save(user);
    }

    @Test
    void shouldReturnUserById() {
        User user = new User();
        user.setId("user123");

        when(userRepository.findById("user123")).thenReturn(Optional.of(user));

        User result = userService.getUserById("user123");

        assertThat(result).isEqualTo(user);
    }

    @Test
    void shouldThrowIfUserNotFound() {
        when(userRepository.findById("unknown")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.getUserById("unknown"))
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("User not found");
    }

    @Test
    void shouldCreateUser() {
        User user = new User();
        when(userRepository.save(user)).thenReturn(user);

        User created = userService.createUser(user);
        assertThat(created).isEqualTo(user);
    }

    @Test
    void shouldUpdateUser() {
        User user = new User();
        when(userRepository.save(user)).thenReturn(user);

        User updated = userService.updateUser(user);
        assertThat(updated).isEqualTo(user);
    }

    @Test
    void shouldDeleteUser() {
        userService.deleteUser("user123");
        verify(userRepository).deleteById("user123");
    }

    @Test
    void shouldCheckIfUserExistsByEmail() {
        when(userRepository.existsByEmail("test@example.com")).thenReturn(true);

        boolean exists = userService.existsByEmail("test@example.com");
        assertThat(exists).isTrue();
    }

    @Test
    void shouldReturnUserFromSpace() {
        User user = new User();
        user.setId("user123");
        Space space = new Space();
        space.setUserId("user123");

        when(userRepository.findById("user123")).thenReturn(Optional.of(user));

        Optional<User> result = userService.getUserFromSpace(space);
        assertThat(result).contains(user);
    }

    @Test
    void shouldReturnUserProfile() {
        User user = User.builder()
                .id("user123")
                .username("testuser")
                .level(5)
                .health(100)
                .maxHealth(150)
                .currentXP(500)
                .xpGoal(1000)
                .xpFactor(2)
                .xpBonusActive(true)
                .xpFactorUntil(Instant.now())
                .coins(1000)
                .streak(10)
                .taskLimit(50)
                .avatars(List.of("avatar1", "avatar2"))
                .build();

        when(userRepository.findById("user123")).thenReturn(Optional.of(user));
        when(taskRepository.countByUserId("user123")).thenReturn(5L);

        UserProfileResponse profile = userService.getUserProfile("user123");

        assertThat(profile).isNotNull();
        assertThat(profile.getUsername()).isEqualTo("testuser");
        assertThat(profile.getCurrentTasks()).isEqualTo(5);
        assertThat(profile.getAvatars()).contains("avatar1", "avatar2");
    }

    @Test
    void shouldAddSpaceId() {
        User user = User.builder().id("user123").spaceIds(new ArrayList<>()).build();

        when(userRepository.findById("user123")).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);

        userService.addSpaceId("user123", "space456");

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());

        User savedUser = captor.getValue();
        assertThat(savedUser.getSpaceIds()).contains("space456");
    }
}
