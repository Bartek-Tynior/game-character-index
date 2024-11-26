import axios from 'axios';
import { GameCharacter } from "@/types/GameCharacter";

// Create an Axios instance with the backend URL
const API = axios.create({ baseURL: 'http://localhost:8080/api/characters' });

// Fetch all characters
export const getAllCharacters = (): Promise<GameCharacter[]> =>
    API.get('/').then(response => response.data);

// Fetch a character by id
export const getCharacterById = (id: number): Promise<GameCharacter> =>
    API.get(`/${id}`).then(response => response.data);

// Create a new character
export const createCharacter = (character: Omit<GameCharacter, 'id' | 'createdAt' | 'updatedAt'>): Promise<GameCharacter> =>
    API.post('/', character).then(response => response.data);

// Update an existing character
export const updateCharacter = (id: number, character: Partial<Omit<GameCharacter, 'id' | 'createdAt' | 'updatedAt'>>): Promise<GameCharacter> =>
    API.put(`/${id}`, character).then(response => response.data);

// Delete a character
export const deleteCharacter = (id: number): Promise<void> =>
    API.delete(`/${id}`).then(response => response.data);