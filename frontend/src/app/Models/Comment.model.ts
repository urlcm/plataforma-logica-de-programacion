import { CommentsUsers } from "./CommentsUser.model";
import { User } from "./user.model";

export class Comment {
  constructor(
    public idComment: number = 0,
    public comment: string = '',
    public likes: number = 0,
    public user: User = new User(),
    public commentsUsers: CommentsUsers[] = []
  ) {}
}