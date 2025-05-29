package com.habitxp.backend.controller;

import com.habitxp.backend.model.Bonus;
import com.habitxp.backend.service.BonusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bonuses")
@RequiredArgsConstructor
public class BonusController {

    private final BonusService bonusService;

    @GetMapping("/{id}")
    public ResponseEntity<Bonus> getBonus(@PathVariable String id) {
        return bonusService.getBonusById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping
    public ResponseEntity<List<Bonus>> getAllBonuses() {
        return ResponseEntity.ok(bonusService.getAllBonuses());
    }


    @PostMapping
    public ResponseEntity<Bonus> createBonus(@RequestBody Bonus bonus) {
        return ResponseEntity.ok(bonusService.createBonus(bonus));
    }

    @PutMapping
    public ResponseEntity<Bonus> updateBonus(@RequestBody Bonus bonus) {
        return ResponseEntity.ok(bonusService.updateBonus(bonus));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBonus(@PathVariable String id) {
        bonusService.deleteBonus(id);
        return ResponseEntity.noContent().build();
    }
}
