import { User } from "./user.model";

export class Rol {
  constructor(
  ) {}

    public idRol: number;
    public rol: string = '';
    public users: User[] = [];
}