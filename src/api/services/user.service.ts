import { map } from 'rxjs/operators';
import { IUser } from './../models/user.model';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected basePath = environment.baseUrl;
  public defaultHeaders = new HttpHeaders();

  curUser: IUser;


  constructor(private http: HttpClient, private helper: JwtHelperService) { }

  login(email: string, password: string): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.basePath}/api/auth/login`, { email, password }, {
      headers
    });
  }

  logout() {
    localStorage.clear();
  }

  register(user: IUser): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.basePath}/api/auth/register`, user, {
      headers
    });
  }

  updateInfo(id: number, newUser: IUser): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<any>(`${this.basePath}/api/user/` + id, newUser, {
      headers
    });
  }

  getUser(token: string): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<any>(`${this.basePath}/api/user-info?token=` + token, {
      headers
    }).pipe(
      map(user => user.result),
      map(u => {
        const avatar = u.avatar_path.encoded;
        this.curUser = { ...u, avatar };
        return { ...u, avatar };
      })
    );
  }
  getUserInfo(id: number): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<any>(`${this.basePath}/api/user/` + id, {
      headers
    }).pipe(
      map(res => res.user)
    );
  }

  getPostsByUser(userId: number): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get<any>(`${this.basePath}/api/user/` + userId, {
      headers
    }).pipe(
      map(res => res.post),
      map(post => post.map(element => {
        const content = JSON.parse(element.content);
        return { ...element, content };
      })),
    );
  }

  setToken(token: string) {
    localStorage.setItem('TOKEN', token);
  }
  getToken() {
    return localStorage.getItem('TOKEN');
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return token ? true : false;
  }
}
