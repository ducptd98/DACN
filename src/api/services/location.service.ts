import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  protected basePath = environment.baseUrl;
  public defaultHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getProvinceCity(): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<any>(`${this.basePath}/api/city`, {
      headers
    });
  }
  getDistrict(provinceId): Observable<any> {
    let headers = this.defaultHeaders;
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<any>(`${this.basePath}/api/city/${provinceId}`, {
      headers
    });

  }
}
