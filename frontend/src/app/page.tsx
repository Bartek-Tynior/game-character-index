"use client";

import { createCharacter, getAllCharacters } from "@/services/api";
import { GameCharacter } from "@/types/GameCharacter";
import { useEffect, useState } from "react";

export default function Home() {
  const [characters, setCharacters] = useState<GameCharacter[]>([]);

  useEffect(() => {
    getAllCharacters().then(setCharacters).catch(console.error);
  }, []);

  const handleCreateCharacter = async () => {
    const newCharacter = {
      name: "Mario",
      gameName: "Super Mario Bros",
      healthPoints: 100,
      attackPoints: 50,
    };

    try {
      const created = await createCharacter(newCharacter);
      setCharacters((prev) => [...prev, created]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl">Game Characters Index</h1>

        <p className="text-lg">
          This is a simple index of game characters. You can view, add, edit,
          and delete characters.
        </p>

        {characters.map((character, index) => (
          <div key={index}>
            <h2>{character.name}</h2>
            <p>{character.gameName}</p>
            <p>HP: {character.healthPoints}</p>
            <p>AP: {character.attackPoints}</p>
          </div>
        ))}

        <button onClick={handleCreateCharacter}>Add Mario</button>
      </main>
    </div>
  );
}
