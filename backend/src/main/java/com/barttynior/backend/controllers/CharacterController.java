package com.barttynior.backend.controllers;

import com.barttynior.backend.models.GameCharacter;
import com.barttynior.backend.services.CharacterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/characters")
public class CharacterController {

    @Autowired
    private CharacterService characterService;

    @GetMapping
    public List<GameCharacter> getAllCharacters() {
        return characterService.getAllCharacters();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameCharacter> getCharacterById(@PathVariable Long id) {
        return characterService.getCharacterById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public GameCharacter createCharacter(@RequestBody GameCharacter character) {
        return characterService.createCharacter(character);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GameCharacter> updateCharacter(@PathVariable Long id, @RequestBody GameCharacter character) {
        return ResponseEntity.ok(characterService.updateCharacter(id, character));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCharacter(@PathVariable Long id) {
        characterService.deleteCharacter(id);
        return ResponseEntity.noContent().build();
    }
}
