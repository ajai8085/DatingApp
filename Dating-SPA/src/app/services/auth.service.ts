import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/auth/';

  constructor(private httpClient: HttpClient) { }

  login(model: any) {
    return this.httpClient.post(this.baseUrl + 'login', model)
      .pipe(map((resp: any) => {
        const user = resp;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      }));
  }

  register(model: any) {
    return this.httpClient.post(this.baseUrl, model);
  }

}
