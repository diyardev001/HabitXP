package com.habitxp.backend.service;

import com.habitxp.backend.model.Bonus;
import com.habitxp.backend.repository.BonusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BonusService {

    private final BonusRepository bonusRepository;

    public Optional<Bonus> getBonusById(String id) {
        return bonusRepository.findById(id);
    }

    public List<Bonus> getAllBonuses() {
        return bonusRepository.findAll();
    }


    public Bonus createBonus(Bonus bonus) {
        return bonusRepository.save(bonus);
    }

    public Bonus updateBonus(Bonus bonus) {
        return bonusRepository.save(bonus);
    }

    public void deleteBonus(String id) {
        bonusRepository.deleteById(id);
    }
}
