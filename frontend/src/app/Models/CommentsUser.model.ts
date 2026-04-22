import { User } from "./user.model";

export class CommentsUsers {
  constructor(
    public idCommentsUsers: number = 0,
    public user: User = new User(),
    public comment: Comment = new Comment()
  ) {}
}