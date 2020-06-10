import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5000/auth/';

  helper = new JwtHelperService();
  decodedToken: any;

  constructor(private httpClient: HttpClient) {}

  login(model: any) {
    return this.httpClient.post(this.baseUrl + 'login', model).pipe(
      map((resp: any) => {
        const user = resp;
        if (user) {
          localStorage.setItem('token', user.token);
          this.setDecodedToken();
        }
      })
    );
  }

  register(model: any) {
    return this.httpClient.post(this.baseUrl, model);
  }

  isLoggedIn() {
    return !this.helper.isTokenExpired(this.getToken());
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setDecodedToken() {
    const token = this.getToken();
    if (token) {
      this.decodedToken = this.helper.decodeToken(token);
      console.log(this.decodedToken);
    }
  }
}
