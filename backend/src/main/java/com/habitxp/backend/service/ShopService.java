package com.habitxp.backend.service;

import com.habitxp.backend.model.Bonus;
import com.habitxp.backend.model.User;
import com.habitxp.backend.repository.BonusRepository;
import com.habitxp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopService {

    private final BonusRepository bonusRepository;
    private final UserRepository userRepository;

    public List<Bonus> listBonuses() {
        return bonusRepository.findAll();
    }

    public boolean sellBonus(String userId, String bonusId) {
        User user = userRepository.findById(userId).orElse(null);
        Bonus bonus = bonusRepository.findById(bonusId).orElse(null);

        if (user == null || bonus == null) return false;
        if (!bonus.isAffordable(user.getCoins())) return false;

        user.setCoins(user.getCoins() - bonus.getCost());
        bonus.applyTo(user);

        userRepository.save(user);
        return true;
    }
}
