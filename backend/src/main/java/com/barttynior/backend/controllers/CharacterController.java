package com.barttynior.backend.controllers;

import com.barttynior.backend.models.GameCharacter;
import com.barttynior.backend.services.CharacterService;
import com.barttynior.backend.exceptions.CharacterNotFoundException;
import com.barttynior.backend.exceptions.InvalidCharacterException;
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
                .orElseThrow(() -> new CharacterNotFoundException(id));
    }

    @PostMapping
    public GameCharacter createCharacter(@RequestBody GameCharacter character) {
        if (character.getName() == null || character.getName().isEmpty()) {
            throw new InvalidCharacterException("Character name cannot be null or empty.");
        }
        return characterService.createCharacter(character);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GameCharacter> updateCharacter(@PathVariable Long id, @RequestBody GameCharacter character) {
        if (character.getName() == null || character.getName().isEmpty()) {
            throw new InvalidCharacterException("Character name cannot be null or empty.");
        }
        return ResponseEntity.ok(characterService.updateCharacter(id, character));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCharacter(@PathVariable Long id) {
        if (!characterService.getCharacterById(id).isPresent()) {
            throw new CharacterNotFoundException(id);
        }
        characterService.deleteCharacter(id);
        return ResponseEntity.noContent().build();
    }
}
