import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;


  constructor(private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _router: Router,
    private _alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.logOut();
    this.iniciaFormulario();
  }



  iniciaFormulario() {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  autentica() {
    this._loginService.logIn(this.loginForm.value).subscribe((data: any) => {

      if (data === null) {
        this._alertService.error('', 'Usuário ou senha incorreto(s)!', 'OK');
      } else {
        localStorage.setItem('token', data.token);
        console.log(JSON.stringify(data.token));
        this._router.navigate(['/home']);
      }

    })
  }

  logOut() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

}

