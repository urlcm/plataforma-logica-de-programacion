import { Exercise } from "./Exercise.model";
import { User } from "./user.model";

export class UsersExercise {
  constructor(
  ) {}

    public idUsersExercise: number;
    public user: User;
    public exercise: Exercise;
    public solution: String;
    public time: Date;
    public countLikes:number;
}