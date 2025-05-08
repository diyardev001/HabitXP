package com.habitxp.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
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
    private List<String> taskIds;

    public void addTask(String taskId) {
        this.taskIds.add(taskId);
    }

    public void removeTask(String taskId) {
        this.taskIds.remove(taskId);
    }
} 