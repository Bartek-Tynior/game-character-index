package com.barttynior.backend.services;

import com.barttynior.backend.exceptions.CharacterNotFoundException;
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

    public GameCharacter simulateBattle(Long id1, Long id2) {
        GameCharacter character1 = characterRepository.findById(id1)
                .orElseThrow(() -> new CharacterNotFoundException(id1));
        GameCharacter character2 = characterRepository.findById(id2)
                .orElseThrow(() -> new CharacterNotFoundException(id2));

        int character1RemainingHealth = character1.getHealthPoints() - character2.getAttackPoints();
        int character2RemainingHealth = character2.getHealthPoints() - character1.getAttackPoints();

        // Determine the winner
        if (character1RemainingHealth > character2RemainingHealth) {
            return character1;
        } else if (character2RemainingHealth > character1RemainingHealth) {
            return character2;
        } else {
            throw new IllegalStateException("The battle is a tie!");
        }
    }

}
