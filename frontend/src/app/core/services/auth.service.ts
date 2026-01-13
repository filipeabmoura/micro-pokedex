import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private readonly httpClient: HttpClient) { }

  private apiUrl = 'http://localhost:3000'

  login(email: string, password: string) {
    return this.httpClient.post<{ access_token: string }>(
      `${this.apiUrl}/auth/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
      })
    );
  }

  register(email: string, password: string) {
    return this.httpClient.post(
      `${this.apiUrl}/auth/register`, {
        email,
        password
    });
  }

  logout(){
    localStorage.removeItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isAuthenticated() : boolean {
    return !!this.getToken();
  }
}
