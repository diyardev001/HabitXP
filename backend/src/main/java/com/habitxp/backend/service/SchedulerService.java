package com.habitxp.backend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


import com.habitxp.backend.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.habitxp.backend.model.Frequency;
import com.habitxp.backend.model.Space;
import com.habitxp.backend.model.Task;
import com.habitxp.backend.model.User;
import com.habitxp.backend.repository.SpaceRepository;
import com.habitxp.backend.repository.TaskRepository;

@Service
public class SchedulerService {

    SpaceRepository spaceRepository;
    TaskRepository taskRepository;
    UserRepository userRepository;
    UserService userService;

    @Scheduled(cron = "0 0 * * * *") // jede Stunde
    public void checkDeadlineTask() {
        List<Task> allTasks = taskRepository.findAll();
        LocalDate today = LocalDate.now();

        for (Task task : allTasks) {
            // Wenn Deadline überschritten & nicht abgeschlossen
            if (task.getDeadline() != null && task.getDeadline().isBefore(today) && !task.isCompleted()) {
                Space space = spaceRepository.findById(task.getSpaceId()).orElse(null);
                User user = userService.getUserFromSpace(space).orElse(null);
                if(!user.isStreakFreezeActive()){
                    user.setStreakBroken(true);
                    user.setStreak(0);
                }

                if (task.getFrequency() == Frequency.NONE) {
                    // Task aus Space entfernen
                    space.getTaskIds().remove(task.getId());
                    spaceRepository.save(space);

                    // Task löschen
                    taskRepository.delete(task);
                }else{
                    task.setCompletions(new ArrayList<>());
                    task.setCompleted(false);
                }

            }
        }

        taskRepository.saveAll(allTasks);
    }


    @Scheduled(cron = "0 0 0 * * *") // täglich um Mitternacht
    public void checkUsersForHpPenalty() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if (user.getHealth() <= 0) {
                user.coinPenalty();
                userRepository.save(user);
            }
        }
    }

    @Scheduled(cron = "0 0 0 * * *") // täglich um Mitternacht
    public void restartStreak() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if(!user.isStreakBroken()){
                user.setStreak(user.getStreak()+1);
            }
            if(user.isStreakBroken()){
                user.setStreakBroken(false);
            }
        }
    }

    @Scheduled(cron = "0 0 * * * *") // jede Stunde
    public void checkUsersForStreakFreeze() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            user.streakFreezeReset();
        }
    }

    @Scheduled(cron = "0 0 * * * *") // jede Stunde
    public void checkUsersForXPFactor() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            user.xpFactorReset();
        }
    }

}
