package com.habitxp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CompletionResponse {
    private boolean success;
    private boolean isCompleted;
    private int remaining;
    private int rewardXP;
    private int rewardCoins;
}
