package com.habitxp.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tasks")
public class Task {

    @Id
    private String id;

    private String title;
    private String description;
    private LocalDate deadline;
    private boolean isCompleted;

    private int rewardXP;
    private int rewardCoins;
    private Frequency frequency;
    private int streak;

    private String spaceId;

    public void edit(String title, String description, LocalDate deadline, Frequency frequency) {
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.frequency = frequency;
    }

    public void markAsCompleted(User user) {
        this.isCompleted = true;
        this.streak += 1;
        user.setCoins(user.getCoins()+rewardCoins);
        user.xpFactorReset();
        user.setXp(user.getXp()+rewardXP*user.getXpFactor());
    }

    public boolean streakAlive() {
        return this.streak > 0;
    }
} 
