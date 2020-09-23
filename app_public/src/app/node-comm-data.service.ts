import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post, Comment } from './post';
import { User } from './user';
import { AuthResponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root'
})
export class NodeCommDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBaseUrl = 'http://localhost:3000/api';

   public getPosts(): Promise<Post[]> {
    const url: string = `${this.apiBaseUrl}/posts`;
    console.log(url);
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Post[])
      .catch(this.handleError);
      console.log(url);
  }

  public getPostById(postId: string): Promise<Post> {
    const url: string = `${this.apiBaseUrl}/posts/${postId}`;
    console.log(url);
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Post)
      .catch(this.handleError);
  }

  public addCommentByPostId(postId: string, formData: Comment): Promise<Comment> {
    const url: string = `${this.apiBaseUrl}/posts/${postId}/comments`;
    console.log(url);
    console.log(formData);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('node-comm-token')}`
      })
    };
    return this.http
      .post(url, formData, httpOptions)
      .toPromise()
      .then(response => response as Comment)
      .catch(this.handleError);
  }
  
  public addVoteUpComment(postId: string, formData: Comment): Promise<Comment> {
    const url: string = `${this.apiBaseUrl}/posts/${postId}/comments/comments._id/voteup`;
    //console.log(url);
    console.log(formData);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('node-comm-token')}`
      })
    };
    return this.http
      .post(url, formData, httpOptions)
      .toPromise()
      .then(response => response as Comment)
      .catch(this.handleError);
  }
  
  public addVoteDownComment(postId: string, formData: Comment): Promise<Comment> {
    const url: string = `${this.apiBaseUrl}/posts/${postId}/comments/votedown`;
    console.log(url);
    console.log(formData);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('node-comm-token')}`
      })
    };
    return this.http
      .post(url, formData, httpOptions)
      .toPromise()
      .then(response => response as Comment)
      .catch(this.handleError);
  }

  public addVoteUpByPost(postId: string, formData: Post): Promise<Post> {
    const url: string = `${this.apiBaseUrl}/posts/${postId}/voteup`;
    console.log(url);
    console.log(formData);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('node-comm-token')}`
      })
    };
    return this.http
      .post(url, formData, httpOptions)
      .toPromise()
      .then(response => response as Post)
      .catch(this.handleError);
  }

  public addVoteDownByPost(postId: string, formData: Post): Promise<Post> {
    const url: string = `${this.apiBaseUrl}/posts/${postId}/votedown`;
    console.log(url);
    console.log(formData);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('node-comm-token')}`
      })
    };
    return this.http
      .post(url, formData, httpOptions)
      .toPromise()
      .then(response => response as Post)
      .catch(this.handleError);
  }

  public addPost(formData: Post): Promise<Post> {
    const url: string = `${this.apiBaseUrl}/posts`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('node-comm-token')}`
      })
    };

    return this.http
      .post(url, formData, httpOptions)
      .toPromise()
      .then(response => response as Post)
      .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

}
