import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logOut() {
    localStorage.removeItem('access_token');
  }
  baseUrl = environment.apiUrl + 'auth/';

  helper = new JwtHelperService();
  decodedToken: any;

  constructor(private httpClient: HttpClient) {
    this.setDecodedToken();
  }

  login(model: any) {
    return this.httpClient.post(this.baseUrl + 'login', model).pipe(
      map((resp: any) => {
        const user = resp;
        if (user) {
          this.decodedToken = null;
          localStorage.setItem('access_token', user.token);
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
    return localStorage.getItem('access_token');
  }

  private setDecodedToken() {
    if (!this.decodedToken) {
      const token = this.getToken();
      if (token) {
        this.decodedToken = this.helper.decodeToken(token);
        console.log(this.decodedToken);
      }
    }
  }
}
