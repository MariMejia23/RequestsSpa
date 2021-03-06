import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
apiURL = environment.apiURL + 'person';
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.apiURL,{observe: 'response'});
  }

  create(person: Person | undefined): Observable<any> {
    return this.http.post(this.apiURL, person, {observe: 'response'});
  }
  update(person: Person | undefined): Observable<any> {
    return this.http.put(this.apiURL, person, {observe: 'response'});
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.apiURL + '/' + id.toString(), {observe: 'response'});
  }
}
