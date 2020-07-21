import { map } from 'rxjs/operators';
import { IPost } from './../models/post.model';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
    }).pipe(
      map(res => res.data)
    );
  }
  getPostFavorite(): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<any>(`${this.basePath}/api/post_favourite`, {
      headers
    }).pipe(
      map(res => res.data)
    );
  }
  getPost(id): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<any>(`${this.basePath}/api/post/` + id, {
      headers
    }).pipe(
      map(res => res.data),
      map(result => {
        const content = JSON.parse(result.content);
        return { ...result, content };
      })
    );
  }
  getPosts(page: number): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.set('page', page.toString());
    return this.http.get<any>(`${this.basePath}/api/post`, {
      headers,
      params
    }).pipe(
      map(res => {
        const data = res.data.map(element => {
          const content = JSON.parse(element.content);
          return { ...element, content };
        });
        const total = res.total;
        return { data, total };
      }),
    );
  }
  createPost(post: IPost): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.basePath}/api/post`, post, {
      headers
    }).pipe(
      map(res => res.data)
    );
  }
  updatePost(post: IPost): Observable<IPost> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    const newPost = { ...post, content: JSON.stringify(post.content) };
    return this.http.put<any>(`${this.basePath}/api/post/` + post.id, newPost, {
      headers
    });
  }
  deletePost(id): Observable<IPost> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.delete<any>(`${this.basePath}/api/post`, {
      headers
    });
  }
  getAllTag() {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.set('page', '1');
    return this.http.get<any>(`${this.basePath}/api/get-all-tag`, {
      headers,
      params
    });
  }

  getPostsByTag(tag: string) {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    const params = new HttpParams().set('tag', tag);
    return this.http.get<any>(`${this.basePath}/api/post_tag`, {
      headers,
      params
    }).pipe(
      map(res => res.data.map(element => {
        const content = JSON.parse(element.content);
        return { ...element, content };
      })),
    );
  }
  searchPost(searchTerm: string, userId: number) {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('q', searchTerm);
    }
    if (userId) {
      params = params.set('userid', userId.toString());
    }
    return this.http.get<any>(`${this.basePath}/api/post_search`, {
      headers,
      params
    }).pipe(
      map(res => {
        const data = res.data.map(element => {
          const content = JSON.parse(element.content);
          return { ...element, content };
        });
        const total = res.total;
        return { data, total };
      }),
    );
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
