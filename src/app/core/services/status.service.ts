import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  apiURL = environment.apiURL + 'status';
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.apiURL, {observe: 'response'});
  }

  create(status: Status | undefined): Observable<any> {
    return this.http.post(this.apiURL, status, {observe: 'response'});
  }
  update(status: Status | undefined): Observable<any> {
    return this.http.put(this.apiURL, status, {observe: 'response'});
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.apiURL + '/' + id.toString(), {observe: 'response'});
  }
}
