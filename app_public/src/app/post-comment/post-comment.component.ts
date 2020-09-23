import { Component, Input } from '@angular/core';
import { NodeCommDataService } from '../node-comm-data.service';
import { Comment } from '../post';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent {
  @Input() comment: Comment
  @Input() parentId: string

  constructor(private nodeCommDataService: NodeCommDataService) { }

  public upVoteComment(): void {
    this.comment.voteUp += 1
    this.updateComment()
  }

  public downVoteComment(): void {
    this.comment.voteDown += 1
    this.updateComment()
  }

  private updateComment(): void {
    this.nodeCommDataService.updateComment(this.parentId, this.comment)
  }
}
