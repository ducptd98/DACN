import { Observable } from 'rxjs';
import { IComment } from './../models/comment.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  protected basePath = environment.baseUrl;
  public defaultHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  createComment(cmt: IComment): Observable<IComment> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<IComment>(`${this.basePath}/api/comment`, cmt, {
      headers
    });
  }
  getComments(): Observable<IComment> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<IComment>(`${this.basePath}/api/comment`, {
      headers
    });
  }
  getComment(id): Observable<IComment> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<IComment>(`${this.basePath}/api/comment/` + id, {
      headers
    });
  }
  updateComment(id): Observable<IComment> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<IComment>(`${this.basePath}/api/comment/` + id, {
      headers
    });
  }
  deleteComment(id): Observable<IComment> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<IComment>(`${this.basePath}/api/comment/` + id, {
      headers
    });
  }
}
