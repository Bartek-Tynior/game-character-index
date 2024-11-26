package com.barttynior.backend.repositories;

import com.barttynior.backend.models.GameCharacter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterRepository extends JpaRepository<GameCharacter, Long> {
}
