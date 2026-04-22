import { Difficulty } from "./Difficulty.model,";
import { UsersExercise } from "./UserExercise.model";

export class Exercise {

  constructor(
  ) {}

    public idExercise: number;
    public difficulty: Difficulty = new Difficulty()
    public description: String;
    public usersExercises: UsersExercise[] = []
}