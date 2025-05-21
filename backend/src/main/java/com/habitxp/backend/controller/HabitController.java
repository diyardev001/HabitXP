package com.habitxp.backend.controller;

import com.habitxp.backend.model.Habit;
import com.habitxp.backend.repository.HabitRepository;
import com.habitxp.backend.repository.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/habits")
@RequiredArgsConstructor
public class HabitController {

    private final HabitRepository habitRepository;
    private final SpaceRepository spaceRepository;

    @PostMapping
    public ResponseEntity<Habit> createHabit(@RequestBody Habit habit, Authentication auth) {
        habit.setUserId(auth.getName());
        Habit savedHabit = habitRepository.save(habit);

        spaceRepository.findById(habit.getSpaceId()).ifPresent(space -> {
            space.addHabit(savedHabit.getId());
            spaceRepository.save(space);
        });

        return ResponseEntity.status(HttpStatus.CREATED).body(savedHabit);
    }

    @GetMapping
    public ResponseEntity<List<Habit>> getHabits(Authentication auth) {
        String userId = auth.getName();
        List<Habit> habits = habitRepository.findByUserId(userId);
        return ResponseEntity.ok(habits);
    }
}
