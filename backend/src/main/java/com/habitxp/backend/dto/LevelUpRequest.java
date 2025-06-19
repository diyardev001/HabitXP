package com.habitxp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LevelUpRequest {
    private String userId;
    private String choice;
}
