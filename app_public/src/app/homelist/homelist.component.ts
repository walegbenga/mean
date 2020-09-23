import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NodeCommDataService } from '../node-comm-data.service';
import { AuthenticationService } from '../authentication.service';
import { Post } from '../post';

@Component({
  selector: 'app-homelist',
  templateUrl: './homelist.component.html',
  styleUrls: ['./homelist.component.css']
})
export class HomelistComponent implements OnInit {
  @Input() post: Post;

  public newPost: Post = {
    postContent: '',
    user: '',
    title: '',
    _id: '',
    comments: [],
    voteUp: 0,
    voteDown: 0
  };
  public formVisible: boolean = false;
  public formError: string;
  constructor(
    private router: Router,
    private nodeCommDataService: NodeCommDataService,
    private authenticationService: AuthenticationService
  ) {}

  public posts: Post[];
  public message: string;

  ngOnInit(): void {
    this.getPosts();
  }

  private getPosts(): void {
    console.log('a');
    this.message = 'Retrieving forum posts from the database...';
    this.nodeCommDataService
      .getPosts()
      .then(allPosts => (this.posts = allPosts));
  }

  private formIsValid(): boolean {
    if (this.newPost.postContent && this.newPost.title) {
      return true;
    } else {
      return false;
    }
  }

  public onPostSubmit(): void {
    this.formError = '';
    this.newPost.user = this.getUsername();
    console.log(this.getUsername());
    if (this.formIsValid()) {
      //console.log(this.newPost);
      this.nodeCommDataService.addPost(this.newPost).then((post: Post) => {
        console.log('Post saved', post);
        //this.router.navigateByUrl('/')// Segun Odunlami Oyekan
        //let posts = this.posts.slice(0);
        //posts.unshift(post);
        //this.post = posts;
        this.resetAndHidePostForm();
        this.getPosts();
        //this.router.navigateByUrl('/');
      });
    } else {
      this.formError = 'All fields requried, please try again';
    }
  }

  private resetAndHidePostForm(): void {
    this.formVisible = false;
    //this.newPost.author = '';
    //this.newPost.rating = 5;
    this.newPost.postContent = '';
    this.newPost.title = '';
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public getUsername(): string {
    console.log(this.authenticationService.getCurrentUser());
    const { email } = this.authenticationService.getCurrentUser();
    return email ? email : 'Guest';
  }

  private showError(error: any): void {
    this.message = error.message;
  }
}
