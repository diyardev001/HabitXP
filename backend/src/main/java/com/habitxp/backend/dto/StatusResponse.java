package com.habitxp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatusResponse {
    private boolean isCompleted;
    private int remaining;
    private String colorKey;
}
