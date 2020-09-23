import { Component, Input } from '@angular/core';
import { Post, Comment } from '../post';
import { NodeCommDataService } from '../node-comm-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {
  @Input() post: Post;

  public formVisible: boolean = false;
  public formError: string;

  public newComment: Comment = {
    _id: null,
    user: '',
    commentContent: '',
    voteDown: 0,
    voteUp: 0,
    createdOn: null
  };

  constructor(
    private nodeCommDataService: NodeCommDataService,
    private authenticationService: AuthenticationService
  ) { }
  
  public downVotePost(): any {
    this.post.voteDown += 1
    this.updatePost()
  }

  public upVotePost(): any {
    this.post.voteUp += 1
    this.updatePost()
  }

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

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private getUsername(): string {
    const { email } = this.authenticationService.getCurrentUser();
    return email ? email : 'Guest';
  }

  private formIsValid(): boolean {
    return !!(this.newComment.user && this.newComment.commentContent)
  }

  private resetAndHideCommentForm(): void {
    this.formVisible = false;
    this.newComment.user = '';
    this.newComment.commentContent = '';
  }

  private updatePost(): void {
    this.nodeCommDataService.updatePost(this.post)
  }

  /*
  public newComment: Comment = {
    _id: null,
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
  */
}
