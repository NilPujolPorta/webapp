import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule,  FormGroup, FormControl, Validators } from '@angular/forms';
import { treballadorApi } from '../../Serveis/Api/treballadorApi';
import { Treballador } from '../../Model/Entitats/Implementations/Treballador/Treballador';
import { catchError, Subscription, take, throwError } from 'rxjs'; 


@Component({
  selector: 'app-admin-create-user',
  templateUrl: './admin-create-user.component.html',
  styleUrls: ['./admin-create-user.component.css']
})
export class AdminCreateUserComponent implements OnInit {
  userForm! : FormGroup;
  missatge = "";
  subscriptions!: Subscription[];
  errors = {
    nom: "",
    cognom: "",
    usuari: "",
    contrasenya: "",
    repcontrasenya: "",
    categoria: ""
  }


  constructor(private httpClient: treballadorApi) {

    this.subscriptions = new Array<Subscription>();
   }

  ngOnInit() {
    this.missatge = "";
    this.userForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      cognom: new FormControl('', [Validators.required]),
      usuari: new FormControl('', [Validators.required]),
      contrasenya: new FormControl('', [Validators.required]),
      repcontrasenya: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required])
    });
  }
  onSubmitUser(){

    this.checkrequisites();
    
  }

  checkrequisites(){
    if(this.userForm.controls["nom"].valid){
      this.errors.nom = "";
      if(this.userForm.controls["cognom"].valid){
        this.errors.cognom = "";
        if(this.userForm.controls["usuari"].valid){
          this.errors.usuari = "";
          if(this.userForm.controls["contrasenya"].valid){
            this.errors.contrasenya = "";            
            if(this.userForm.controls["repcontrasenya"].valid){
              if(this.userForm.controls["contrasenya"].value == this.userForm.controls["repcontrasenya"].value){
                this.errors.repcontrasenya = "";
                if(this.userForm.controls["categoria"].valid){
                  this.errors.categoria = "";
                  let treballador = this.generateArray();
                  this.callapi(treballador);
                }else{
                  this.errors.categoria = "Falta omplir el camp";
                }
              }else{
                this.errors.repcontrasenya = "La contrsenya no coincideix";
              }
            }else{
              this.errors.repcontrasenya = "Falta omplir el camp";
            }
          }else{
            this.errors.contrasenya = "Falta omplir el camp";
          }
        }else{
          this.errors.usuari = "Falta omplir el camp";
        }
      }else{
        this.errors.cognom = "Falta omplir el camp";
      }
    }else{
      this.errors.nom = "Falta omplir el camp";
    }
  }


    generateArray(){
      let rolvalue: string;
      if (this.userForm.controls["rol"].value == true){
        rolvalue = "admin";
      }else{
        rolvalue = "user";
      }

      let treballador: Treballador = {
        usuari: this.userForm.controls["usuari"].value, 
        contrasenya: this.userForm.controls["contrasenya"].value ,
        nom: this.userForm.controls["nom"].value ,
        cognoms: this.userForm.controls["cognom"].value ,
        categoria: this.userForm.controls["categoria"].value ,
        rol: rolvalue ,
        usuariMOD: "admin" ,
    };
      return treballador;
    }

    callapi(treballador: Treballador){
      this.httpClient.createTreballador(treballador).pipe(
        take(1),
        catchError((err: any) => {
          return throwError(() => new Error("Error al agafar guardia"))
        })
      ).subscribe({
        next: (x) => {
          this.missatge = x.missatge

        },
        error: (err: any) => {
          console.log(err.message)
        },
        complete: () => {},
      })
    }
}
