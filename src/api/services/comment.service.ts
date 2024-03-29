import { Observable } from 'rxjs';
import { IComment } from './../models/comment.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  protected basePath = environment.baseUrl;
  public defaultHeaders = new HttpHeaders();

  pusher: any;
  channel: any;

  constructor(private http: HttpClient) {
    this.pusher = new Pusher(environment.PUSHER_APP_KEY, {
      cluster: environment.PUSHER_APP_CLUSTER,
    });
    this.channel = this.pusher.subscribe('my-channel');
  }

  createComment(cmt: IComment): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.basePath}/api/comment`, cmt, {
      headers
    });
  }
  getComments(): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<any>(`${this.basePath}/api/comment`, {
      headers
    });
  }
  getComment(id): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<any>(`${this.basePath}/api/comment/` + id, {
      headers
    });
  }
  updateComment(id): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<any>(`${this.basePath}/api/comment/` + id, {
      headers
    });
  }
  deleteComment(id): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.delete<any>(`${this.basePath}/api/comment/` + id, {
      headers
    });
  }
}
