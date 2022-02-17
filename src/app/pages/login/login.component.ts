import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.logOut();
  }


  autentica() {
    // this._loginService.logIn(this.loginForm.value).subscribe((token: any) => {

    //   if (token === null)
    //     return this._alertService.error('', 'Usuário ou senha incorreto(s)!', 'OK');
    //   localStorage.setItem('token', token);
    //   //localStorage.setItem('user', JSON.stringify(usuario));
    //   // localStorage.setItem('correlationId', uuidv4());
    //   this._router.navigate(['/home']);
    // })
  }

  logOut() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

}

