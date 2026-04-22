import { CommentsUsers } from "./CommentsUser.model";
import { Rol } from "./rol.model";
import { test } from "./test.model";
import { UsersExercise } from "./UserExercise.model";

export class User {
  constructor(
  ) {}

    public idUser: number 
    public nameUser: string = '';
    public lastname: string = '';
    public email: string = '';
    public password: string = '';
    public level: number = 1;
    public exp: number = 0;
    public rol: Rol;
    public usersExercises: UsersExercise[];
    public comments: Comment[];
    public commentsUsers: CommentsUsers[];
     public test: test;
}