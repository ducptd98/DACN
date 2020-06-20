import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  protected basePath = environment.baseUrl;
  public defaultHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getAllNotPaging(): Observable<Array<ICategory>> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<Array<ICategory>>(`${this.basePath}/api/categories`, {
      headers
    });
  }
  getAll(limit, offset): Observable<Array<ICategory>> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<Array<ICategory>>(`${this.basePath}/api/categories/${limit}/${offset}`, {
      headers
    });
  }
  getCategory(categoryId): Observable<ICategory> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<ICategory>(`${this.basePath}/api/categories/${categoryId}`, {
      headers
    });
  }
  getCategoryByParentCategory(categoryId) {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<Array<ICategory>>(`${this.basePath}/api/categories/${categoryId}`, {
      headers
    });
  }
}
