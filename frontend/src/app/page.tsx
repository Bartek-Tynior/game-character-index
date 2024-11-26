"use client";

import {
  createCharacter,
  getAllCharacters,
  updateCharacter,
  deleteCharacter,
} from "@/services/api";
import { GameCharacter } from "@/types/GameCharacter";
import { ArchiveX, Cross, Pencil, Swords } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [characters, setCharacters] = useState<GameCharacter[]>([]);
  const [editingCharacter, setEditingCharacter] =
      useState<GameCharacter | null>(null);
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    gameName: "",
    healthPoints: 0,
    attackPoints: 0,
  });

  useEffect(() => {
    getAllCharacters()
        .then((data) => {
          setCharacters(data);
        })
        .catch((error) => {
          console.error(error);
          toast.error(`Failed to load characters: ${error.message}`);
        });
  }, []);

  const handleCreateCharacter = async () => {
    try {
      const created = await createCharacter(newCharacter);
      setCharacters((prev) => [...prev, created]);
      toast.success("Character created successfully!");
      setNewCharacter({
        name: "",
        gameName: "",
        healthPoints: 0,
        attackPoints: 0,
      });
    } catch (error: any) {
      console.error(error);
      toast.error(`Failed to create character: ${error.message}`);
    }
  };

  const handleUpdateCharacter = async () => {
    if (!editingCharacter) return;

    try {
      const updated = await updateCharacter(
          editingCharacter.id!,
          editingCharacter
      );
      setCharacters((prev) =>
          prev.map((char) => (char.id === updated.id ? updated : char))
      );
      toast.success("Character updated successfully!");
      setEditingCharacter(null);
    } catch (error: any) {
      console.error(error);
      toast.error(`Failed to update character: ${error.message}`);
    }
  };

  const handleDeleteCharacter = async (id: number) => {
    try {
      await deleteCharacter(id);
      setCharacters((prev) => prev.filter((char) => char.id !== id));
      toast.success("Character deleted successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(`Failed to delete character: ${error.message}`);
    }
  };

  const handleEditClick = (character: GameCharacter) => {
    setEditingCharacter(character);
  };

  const inputStyle =
      "border border-white border-opacity-15 bg-white bg-opacity-10 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all";

  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <ToastContainer />
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="text-2xl font-semibold">Game Characters Index</h1>

          <p className="text-base font-medium">
            This is a simple index of game characters. You can view, add, edit,
            and delete characters.
          </p>

          <div className="flex flex-col gap-4 w-full">
            {characters.map((character) => (
                <div
                    key={character.id}
                    className="border border-white border-opacity-15 bg-white bg-opacity-10 shadow-md p-6 rounded-md flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold">{character.name}</h2>
                    <p className="text-gray-400 font-semibold">
                      {character.gameName}
                    </p>
                  </div>

                  <div className="flex flex-row gap-2">
                    <div className="flex gap-2 bg-red-500 w-fit px-2 py-1 rounded-full justify-center items-center">
                      <Swords size={20} />
                      <span className="font-bold">{character.healthPoints}</span>
                    </div>
                    <div className="flex gap-2 bg-green-500 w-fit px-2 py-1 rounded-full justify-center items-center">
                      <Cross size={20} />
                      <span className="font-bold">{character.attackPoints}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                        className="bg-purple-600 text-white px-2 py-1 rounded flex flex-row gap-1 justify-center items-center font-semibold"
                        onClick={() => handleEditClick(character)}
                    >
                      <Pencil size={20} />
                      Edit
                    </button>
                    <button
                        className="bg-red-600 text-white px-2 py-1 rounded flex flex-row gap-1 justify-center items-center font-semibold"
                        onClick={() => handleDeleteCharacter(character.id!)}
                    >
                      <ArchiveX size={20} />
                      Delete
                    </button>
                  </div>
                </div>
            ))}
          </div>

          {editingCharacter ? (
              <div className="border border-white border-opacity-15 bg-white bg-opacity-10 shadow-md p-6 rounded-md flex flex-col gap-4 w-full">
                <h2 className="font-semibold">Edit Character</h2>
                <input
                    type="text"
                    value={editingCharacter.name}
                    onChange={(e) =>
                        setEditingCharacter({
                          ...editingCharacter,
                          name: e.target.value,
                        })
                    }
                    placeholder="Name"
                    className={inputStyle}
                />
                <input
                    type="text"
                    value={editingCharacter.gameName}
                    onChange={(e) =>
                        setEditingCharacter({
                          ...editingCharacter,
                          gameName: e.target.value,
                        })
                    }
                    placeholder="Game Name"
                    className={`${inputStyle} mt-2`}
                />
                <input
                    type="number"
                    value={editingCharacter.healthPoints}
                    onChange={(e) =>
                        setEditingCharacter({
                          ...editingCharacter,
                          healthPoints: Number(e.target.value),
                        })
                    }
                    placeholder="Health Points"
                    className={`${inputStyle} mt-2`}
                />
                <input
                    type="number"
                    value={editingCharacter.attackPoints}
                    onChange={(e) =>
                        setEditingCharacter({
                          ...editingCharacter,
                          attackPoints: Number(e.target.value),
                        })
                    }
                    placeholder="Attack Points"
                    className={`${inputStyle} mt-2`}
                />
                <button
                    onClick={handleUpdateCharacter}
                    className="bg-purple-600 font-semibold text-white px-2 py-1 rounded flex flex-row gap-1 justify-center items-center"
                >
                  Save Changes
                </button>
              </div>
          ) : (
              <div className="border border-white border-opacity-15 bg-white bg-opacity-10 shadow-md p-6 rounded-md flex flex-col gap-4 w-full">
                <h2 className="font-semibold">Add New Character</h2>
                <input
                    type="text"
                    value={newCharacter.name}
                    onChange={(e) =>
                        setNewCharacter({ ...newCharacter, name: e.target.value })
                    }
                    placeholder="Name"
                    className={inputStyle}
                />
                <input
                    type="text"
                    value={newCharacter.gameName}
                    onChange={(e) =>
                        setNewCharacter({ ...newCharacter, gameName: e.target.value })
                    }
                    placeholder="Game Name"
                    className={`${inputStyle} mt-2`}
                />
                <input
                    type="number"
                    value={newCharacter.healthPoints}
                    onChange={(e) =>
                        setNewCharacter({
                          ...newCharacter,
                          healthPoints: Number(e.target.value),
                        })
                    }
                    placeholder="Health Points"
                    className={`${inputStyle} mt-2`}
                />
                <input
                    type="number"
                    value={newCharacter.attackPoints}
                    onChange={(e) =>
                        setNewCharacter({
                          ...newCharacter,
                          attackPoints: Number(e.target.value),
                        })
                    }
                    placeholder="Attack Points"
                    className={`${inputStyle} mt-2`}
                />
                <button
                    onClick={handleCreateCharacter}
                    className="bg-purple-600 font-semibold text-white px-2 py-1 rounded flex flex-row gap-1 justify-center items-center"
                >
                  Add Character
                </button>
              </div>
          )}
        </main>
      </div>
  );
}
