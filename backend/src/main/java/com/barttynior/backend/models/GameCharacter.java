package com.barttynior.backend.models;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "characters")
public class GameCharacter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Game name is required")
    @Column(name = "game_name")
    private String gameName;

    @Min(value = 0, message = "Health Points cannot be negative")
    @Column(name = "health_points")
    private int healthPoints;

    @Min(value = 0, message = "Attack Points cannot be negative")
    @Column(name = "attack_points")
    private int attackPoints;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}
