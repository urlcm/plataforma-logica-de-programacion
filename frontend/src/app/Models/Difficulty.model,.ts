import { Exercise } from "./Exercise.model";

export class Difficulty {
  constructor(
  ) {}

    public idDifficulty: number;
    public descriptionDifficulty: string;
    public exercises: Exercise[] = []
}