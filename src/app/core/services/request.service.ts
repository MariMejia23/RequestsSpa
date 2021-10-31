import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Request } from '../models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  apiURL = environment.apiURL + 'request';
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.apiURL, {observe: 'response'});
  }

  create(request: Request | undefined): Observable<any> {
    return this.http.post(this.apiURL, request, {observe: 'response'});
  }
  update(request: Request | undefined): Observable<any> {
    return this.http.put(this.apiURL, request, {observe: 'response'});
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.apiURL + '/' + id.toString(), {observe: 'response'});
  }
}
