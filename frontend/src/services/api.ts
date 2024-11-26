import axios from 'axios';
import { GameCharacter } from "@/types/GameCharacter";

// Create an Axios instance with the backend URL
const API = axios.create({
    baseURL: '/api/characters', // Proxy will forward this to localhost:8080
    withCredentials: true,
});

// Helper function to extract and normalize error information
import { AxiosError } from 'axios';

const handleError = (error: AxiosError): never => {
    if (error.response) {
        // Error response from server
        const { status, data } = error.response;
        const errorMessage = (data as { message?: string }).message || "Unknown error occurred";
        throw new Error(`Error ${status}: ${errorMessage}`);
    } else if (error.request) {
        // No response received from server
        throw new Error("Network error: No response received from server");
    } else {
        // Something went wrong while setting up the request
        throw new Error(`Unexpected error: ${error.message}`);
    }
};

// Fetch all characters
export const getAllCharacters = async (): Promise<GameCharacter[]> => {
    try {
        const response = await API.get('/');
        return response.data;
    } catch (error: unknown) {
        handleError(error as AxiosError);
    }
    return []; // Return an empty array as a fallback
};

// Fetch a character by id
export const getCharacterById = async (id: number): Promise<GameCharacter> => {
    try {
      const response = await API.get(`/${id}`);
      return response.data;
    } catch (error: unknown) {
      handleError(error as AxiosError);
    }
    throw new Error("Character not found");
};

// Create a new character
export const createCharacter = async (
    character: Omit<GameCharacter, 'id' | 'createdAt' | 'updatedAt'>
): Promise<GameCharacter> => {
    try {
      const response = await API.post("/", character);
      return response.data;
    } catch (error: unknown) {
      handleError(error as AxiosError);
    }
    throw new Error("Failed to create character");
};

// Update an existing character
export const updateCharacter = async (
    id: number,
    character: Partial<Omit<GameCharacter, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<GameCharacter> => {
    try {
      const response = await API.put(`/${id}`, character);
      return response.data;
    } catch (error: unknown) {
      handleError(error as AxiosError);
    }
    throw new Error("Failed to update character");
};

// Delete a character
export const deleteCharacter = async (id: number): Promise<void> => {
    try {
      await API.delete(`/${id}`);
    } catch (error: unknown) {
      handleError(error as AxiosError);
    }
};

export const simulateBattle = (id1: number, id2: number): Promise<GameCharacter> =>
    API.post('/battle', null, { params: { id1, id2 } }).then((response) => response.data);
