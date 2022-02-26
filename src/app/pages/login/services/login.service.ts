import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  logIn({ username, password }) {

    let credencial =
    {
      "username": username,
      "password": password
    }

    return this.http.post(`${environment.URLAuth}auth`, credencial);
  }
}
