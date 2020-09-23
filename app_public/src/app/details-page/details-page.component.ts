import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NodeCommDataService } from '../node-comm-data.service';
import { Post } from '../post';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  constructor(
    private nodeCommDataService: NodeCommDataService,
    private route: ActivatedRoute
  ) { }

  public newPost: Post;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let id = params.get('postId')
          return this.nodeCommDataService.getPostById(id);
        })
      )
      .subscribe((newPost: Post) => {
        this.newPost = newPost;
        this.pageContent.header.title = newPost.title;
        this.pageContent.sidebar = `${newPost.title} is on NodeComm because it has accessible wifi and space to sit down with your laptop and get some work done.\n\nIf you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.`;
      });
  }

  public pageContent = {
    header: {
      title: '',
      strapline: ''
    },
    sidebar: ''
  };
}
