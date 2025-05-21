package com.habitxp.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "spaces")
public class Space {

    @Id
    private String id;

    private String name;
    private List<String> habitIds;

    public void addHabit(String habitId) {
        this.habitIds.add(habitId);
    }

    public void removeHabit(String habitId) {
        this.habitIds.remove(habitId);
    }
} 