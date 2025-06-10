package com.habitxp.backend.dto;

import lombok.Data;

@Data
public class BonusPurchaseRequest {
    private String userId;
    private String bonusId;
}
