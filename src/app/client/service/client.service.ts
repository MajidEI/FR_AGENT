import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clientUrl: string;
  constructor(private http: HttpClient) {
    this.clientUrl = 'https://ebanking-backend.herokuapp.com/client';
  }

  public findAllClients(code: string): Observable<Client[]> {
    return this.http.get<Client[]>(
      'https://ebanking-backend.herokuapp.com/agence/' + code + '/clients'
    );
  }
  public findClient(code: String): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientUrl + 's?id=' + code);
  }

  public save(client: Client) {
    return this.http.post<Client>(this.clientUrl + 's', client);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.clientUrl}/${id}`);
  }
}
