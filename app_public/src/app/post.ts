export class Comment {
  user: string;
  commentContent: string;
  voteUp: number;
  voteDown: number;
  createdOn: Date;
  _id: string;
}

export class Post {
  _id: string;
  user: string;
  title: string;
  comments: Comment[];
  postContent: string;
  voteUp: number;
  voteDown: number;
}
