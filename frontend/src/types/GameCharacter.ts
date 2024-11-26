export interface GameCharacter {
  id?: number;
  name: string;
  gameName: string;
  healthPoints: number;
  attackPoints: number;
  createdAt?: string;
  updatedAt?: string;
}