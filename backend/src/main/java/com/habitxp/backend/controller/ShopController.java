package com.habitxp.backend.controller;

import com.habitxp.backend.model.Bonus;
import com.habitxp.backend.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/shop")
@RequiredArgsConstructor
public class ShopController {

    private final ShopService shopService;

    // GET /shop/bonuses → Liste aller kaufbaren Boni
    @GetMapping("/bonuses")
    public ResponseEntity<List<Bonus>> listBonuses() {
        return ResponseEntity.ok(shopService.listBonuses());
    }

    // POST /shop/buy → Bonus kaufen
    @PostMapping("/buy")
    public ResponseEntity<String> buyBonus(@RequestBody Map<String, String> payload) {
        String userId = payload.get("userId");
        String bonusId = payload.get("bonusId");

        boolean success = shopService.sellBonus(userId, bonusId);
        if (success) {
            return ResponseEntity.ok("Bonus erfolgreich gekauft und angewendet.");
        } else {
            return ResponseEntity.badRequest().body("Kauf fehlgeschlagen (z. B. zu wenig Coins oder ungültige IDs).");
        }
    }
}
