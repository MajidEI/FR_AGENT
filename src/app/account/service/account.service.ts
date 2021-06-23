import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountUrl: string;
  constructor(private http: HttpClient) {
    this.accountUrl = 'https://ebanking-backend.herokuapp.com/compte';
  }

  public findAll(code: string): Observable<Account[]> {
    return this.http.get<Account[]>(
      'https://ebanking-backend.herokuapp.com/client/' + code + '/comptes'
    );
  }

  public findAccount(code: string): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl + 's?id=' + code);
  }

  public save(account: Account) {
    return this.http.post<Account>(this.accountUrl + 's', account);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.accountUrl}/${id}`);
  }

  public getPDF(invoiceId: number): Observable<Blob> {
    return this.http.get<Blob>(
      'https://ebanking-backend.herokuapp.com/contratPDF/' + invoiceId,
      {
        responseType: 'blob' as 'json',
      }
    );
  }
}
