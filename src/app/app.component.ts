import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { LoginWebService } from './Projecte/Model/api/loginWebService';
import { LoginDAO } from './Projecte/Model/api/persistence/impl/webStorage/daos/login/LoginDAO';
import { obtainHeaderWithTokens } from './Projecte/Model/api/utils/obtainHeaderWithToken';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webapp';
  // currentRoute: string;
  autenticat:boolean = false;
  currentRoute:string = "";
  rol?:string;

  constructor(private loginWebService: LoginWebService, private router: Router, public obtainHeaderWithTokens: obtainHeaderWithTokens) {
    this.currentRoute = "";
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) if (e.url != "/login") {
        this.autenticat = true;
        if(LoginDAO.get("refreshToken") == null || LoginDAO.get("accessToken") == null){
          this.autenticat = false;
          this.router.navigate(['/login']);
        } else {
          this.verificarToken();
        }
      }
      else this.autenticat = false;
    });
  }

  verificarToken() {
    try {
      this.loginWebService.verificarToken().subscribe(token => {
        if (token != null) {
          if((<any>token)['tokenOK'] != "tokenOK") {
            console.log("TOKEN VERIFIED")
            LoginDAO.save("accessToken",(<any>token)['accessToken']);
            LoginDAO.save("refreshToken", (<any>token)['refreshToken']);
            this.autenticat = true;

          }
        }
        else {
          console.log("Empty token")
          this.router.navigate(['/login']);
        }

      },
      err => {
        console.log(err)
        this.router.navigate(['/login'])
        LoginDAO.save("accessToken","");
        LoginDAO.save("refreshToken","");
      }

      );
    } catch (err) {
      this.router.navigate(['/login']);
      this.title = 'Ups a error';
    }
  }


  logout(token: any) {
    LoginDAO.clear(token);
}
}
