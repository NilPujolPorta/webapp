import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../Model/api/entities/login/Login';
import { LoginWebService } from '../../Model/api/loginWebService';
import { LoginDAO } from '../../Model/api/persistence/impl/webStorage/daos/login/LoginDAO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide:boolean = true;
  usuari?:string;
  password?:string;
  errorDades:boolean=false;
  loginForm!: FormGroup;

  constructor(private loginWebService: LoginWebService,private router:Router) {

  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      usuari: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }


  autentificar() {
    var login:Login = Login.inicialitzar(this.usuari!,this.password!);
    console.log( JSON.stringify(login));

    this.loginWebService.autentificar(login).subscribe(token => {
       if (token!=null) {
            token = (<any>token)['accessToken'];
            LoginDAO.save(<any>token!);
            this.errorDades = false;
            this.router.navigate(['/calendar']);
       }
       else {
        this.errorDades = true;
        this.clearData();
       }
    });
  }


  clearError() {
    this.errorDades = false;
  }
  clearData() {
    this.usuari = ""; this.password = "";
  }
  prorrogarToken(token: any):boolean {
    return Object.keys(token).length!==0 && JSON.parse(token['response'][0]).new.length!==0;
  }

  verificarToken() {
    this.loginWebService.verificarToken().subscribe(
      {
        next: (v) => {
          if (this.prorrogarToken(v)) {
            console.log(v['response'][0]),
            LoginDAO.save(JSON.stringify(JSON.parse(v['response'][0]).new));
          }
        },
        error: (e) => console.error("Error en l'execució"),
      }
    );
  }


}
