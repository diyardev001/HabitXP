package com.habitxp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BonusBuyResponse {
    boolean success;
    boolean otherBonusActive;
}
