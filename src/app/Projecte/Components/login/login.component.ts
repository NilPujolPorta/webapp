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

    this.loginWebService.autentificar(login).subscribe(token => {
       if (token!=null) {
          LoginDAO.save("accessToken",(<any>token)['accessToken']);
          LoginDAO.save("refreshToken", (<any>token)['refreshToken']);
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

  verificarToken() {
    this.loginWebService.verificarToken().subscribe(
      {
        next: (v) => {
            console.log(v)
            LoginDAO.save("refreshToken",JSON.stringify(JSON.parse(v['refreshToken'])));
            console.log("VERIFICAR TOKEN LOGIN")
            console.log(JSON.stringify(JSON.parse(v['refreshToken'])))
        },
        error: (e) => console.error("Error en l'execució"),
      }
    );
  }


}
