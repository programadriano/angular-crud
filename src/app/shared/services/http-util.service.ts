import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpUtilService {

  constructor() { }

  extrairDados(response: any) {
    const data = response;
    return data || {};
  }

  processarErros(erro: any) {
    return throwError(() => new Error(erro))
  }
}
