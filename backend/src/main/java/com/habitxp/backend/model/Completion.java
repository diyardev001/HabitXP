package com.habitxp.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Completion {
    private LocalDateTime timestamp;
    private String userId;
    private int durationMinutes;
}
