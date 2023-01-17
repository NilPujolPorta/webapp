import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  ngOnInit() {

    this.signupForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      contrasenya: new FormControl('', [Validators.required])
    });
  }


  onSubmitSignup() {
    console.log("hola");
    if (this.signupForm.controls['nom'].valid) {
    if (this.signupForm.controls['email'].valid) {
      if (this.signupForm.controls['contrasenya'].valid) {
        this.comprovar();
      } else {
        window.alert("La contrasenya es incorrecte");
      }
    } else {
      window.alert("El correu es incorrecte");
    }
  }else {
    window.alert("El nom es incorrecte");
  }
  }
  comprovar(){
    console.log("hola");
  }



}
