package com.barttynior.backend.models;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "characters")
public class GameCharacter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter private Long id;

    @NotBlank(message = "Name is required")
    @Getter @Setter private String name;

    @NotBlank(message = "Game name is required")
    @Column(name = "game_name")
    @Getter @Setter private String gameName;

    @Min(value = 0, message = "Health Points cannot be negative")
    @Column(name = "health_points")
    @Getter @Setter private int healthPoints;

    @Min(value = 0, message = "Attack Points cannot be negative")
    @Column(name = "attack_points")
    @Getter @Setter private int attackPoints;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    @Getter @Setter private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    @Getter @Setter private LocalDateTime updatedAt;

}
