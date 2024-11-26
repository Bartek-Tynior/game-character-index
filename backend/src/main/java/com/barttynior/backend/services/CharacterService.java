package com.barttynior.backend.services;

import com.barttynior.backend.models.GameCharacter;
import com.barttynior.backend.repositories.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CharacterService {

    @Autowired
    private CharacterRepository characterRepository;

    public List<GameCharacter> getAllCharacters() {
        return characterRepository.findAll();
    }

    public Optional<GameCharacter> getCharacterById(Long id) {
        return characterRepository.findById(id);
    }

    public GameCharacter createCharacter(GameCharacter character) {
        return characterRepository.save(character);
    }

    public GameCharacter updateCharacter(Long id, GameCharacter character) {
        return characterRepository.findById(id).map(existing -> {
            existing.setName(character.getName());
            existing.setGameName(character.getGameName());
            existing.setHealthPoints(character.getHealthPoints());
            existing.setAttackPoints(character.getAttackPoints());
            return characterRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Character not found"));
    }

    public void deleteCharacter(Long id) {
        characterRepository.deleteById(id);
    }

}
