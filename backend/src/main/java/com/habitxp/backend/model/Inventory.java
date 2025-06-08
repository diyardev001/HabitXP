package com.habitxp.backend.model;

import java.util.List;

import lombok.Data;

@Data
public class Inventory {
    private List<String> bonusIds;
    private List<String> avatars;
}
