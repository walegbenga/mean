import { Component, OnInit, Input } from '@angular/core';
import { Post, Comment } from '../post';
import { NodeCommDataService } from '../node-comm-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  @Input() post: Post;
  //@Input() comment: Comment;
  public newComment: Comment = {
    user: '',
    commentContent: '',
    voteDown: 0,
    voteUp: 0
  };

  public formVisible: boolean = false;
  public formError: string;

  constructor(
    private nodeCommDataService: NodeCommDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  private formIsValid(): boolean {
    if (this.newComment.user && this.newComment.commentContent) {
      return true;
    } else {
      return false;
    }
  }

  public onCommentVoteUpSubmit(): void {
    console.log(this.newComment._id);
    this.nodeCommDataService
      .addVoteUpComment(this.post._id, this.newComment)
      .then((comment: Comment) => {
        let comments = this.post.comments.slice(0);
        comments.unshift(comment);
        this.post.comments = comments;
      });
  }

  public onCommentVoteDownSubmit(): void {}

  public onCommentSubmit(): void {
    this.formError = '';
    this.newComment.user = this.getUsername();
    if (this.formIsValid()) {
      this.nodeCommDataService
        .addCommentByPostId(this.post._id, this.newComment)
        .then((comment: Comment) => {
          let comments = this.post.comments.slice(0);
          comments.unshift(comment);
          this.post.comments = comments;
          this.resetAndHideCommentForm();
        });
    } else {
      this.formError = 'All fields requried, please try again';
    }
  }

  private resetAndHideCommentForm(): void {
    this.formVisible = false;
    this.newComment.user = '';
    this.newComment.commentContent = '';
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public getUsername(): string {
    const { email } = this.authenticationService.getCurrentUser();
    return email ? email : 'Guest';
  }
}
