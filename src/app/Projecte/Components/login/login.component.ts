import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      contrasenya: new FormControl('', [Validators.required])
    });
  }


  onSubmitLogin() {
    console.log("hola");
    if (this.loginForm.controls['email'].valid) {
      if (this.loginForm.controls['contrasenya'].valid) {
        this.comprovar();
      } else {
        window.alert("La contrasenya es incorrecte");
      }
    } else {
      window.alert("El correu es incorrecte");
    }
  }
  comprovar(){
    console.log("hola");
  }



}
