import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpUtilService {

  constructor() { }

  extrairDados(response: any) {
    const data = response;
    console.log(data);
    return data || {};
  }

  processarErros(erro: any) {
    return throwError(() => new Error(erro))
  }

  get token(): any {
    const token = localStorage.getItem('token');

    return token;
  }


  public isAuthenticated(): boolean {
    const token = this.token;
    return token != null;
  }
}
