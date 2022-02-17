import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public  _jwtHelper: JwtHelperService) { }

  public GetToken(): string | null {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    let token = this.GetToken();
    if(token != null){
        return !this._jwtHelper.isTokenExpired(token);
    }
    return false;
  }
}
