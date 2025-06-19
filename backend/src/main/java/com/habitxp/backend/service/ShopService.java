package com.habitxp.backend.service;

import com.habitxp.backend.dto.BonusBuyResponse;
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

    // Gibt alle verfügbaren Boni zurück
    public List<Bonus> listBonuses() {
        return bonusRepository.findAll();
    }

    // Verkauft einen Bonus an einen User (wenn leistbar)
    public BonusBuyResponse sellBonus(String userId, String bonusId) {
        User user = userRepository.findById(userId).orElse(null);
        Bonus bonus = bonusRepository.findById(bonusId).orElse(null);


        if (user == null || bonus == null) return new BonusBuyResponse(false,true);;
        if (!bonus.isAffordable(user.getCoins())) return new BonusBuyResponse(false,true);;

        user.setCoins(user.getCoins() - bonus.getCost());
        BonusBuyResponse bbr=bonus.applyTo(user);

        userRepository.save(user);
        return bbr;
    }
}
