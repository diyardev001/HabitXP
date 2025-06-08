package com.habitxp.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tasks")
public class Task {

    @Id
    private String id;
    private String userId;

    private String title;
    private String duration;
    private Integer times; // Anzahl Wiederholungen pro Zeitintervall
    private boolean isCompleted;

    private int rewardXP;
    private int rewardCoins;
    private Frequency frequency;
    private int streak;

    private String spaceId;
    private String color;

    public void edit(String title, String duration, Frequency frequency) {
        this.title = title;
        this.duration = duration;
        this.frequency = frequency;
    }


    public void markAsCompleted(User user) {
        this.isCompleted = true;
        this.streak += 1;
        user.setCoins(user.getCoins() + rewardCoins);
        user.xpFactorReset();
        user.setXp(user.getXp() + rewardXP * user.getXpFactor());
        user.setCoins(user.getCoins() + rewardCoins);
        user.calculateCurrentXP();
        user.calculateLevel();
        user.calculateXPGoal();

    }

    public boolean streakAlive() {
        return this.streak > 0;
    }
} 
