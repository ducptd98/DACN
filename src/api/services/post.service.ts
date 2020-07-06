import { IPost } from './../models/post.model';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  protected basePath = environment.baseUrl;
  public defaultHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getPostRecently(): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<any>(`${this.basePath}/api/post_recently`, {
      headers
    });
  }
  getPostFavorite(): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<any>(`${this.basePath}/api/post_favourite`, {
      headers
    });
  }
  getPost(id): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<any>(`${this.basePath}/api/post/` + id, {
      headers
    });
  }
  getPosts(): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<any>(`${this.basePath}/api/post`, {
      headers
    });
  }
  createPost(post: IPost): Observable<IPost> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<IPost>(`${this.basePath}/api/post`, post, {
      headers
    });
  }
  updatePost(post: IPost): Observable<IPost> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<IPost>(`${this.basePath}/api/post`, post, {
      headers
    });
  }
  deletePost(id): Observable<IPost> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.delete<IPost>(`${this.basePath}/api/post`, {
      headers
    });
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
