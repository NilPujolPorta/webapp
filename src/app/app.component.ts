import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { LoginWebService } from './Projecte/Model/api/loginWebService';
import { LoginDAO } from './Projecte/Model/api/persistence/impl/webStorage/daos/login/LoginDAO';

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

  constructor(private loginWebService: LoginWebService, private router: Router) {
    this.currentRoute = "";
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) if (e.url != "/login") {
          this.autenticat = true;
          this.verificarToken();
          this.loginWebService.getToken().subscribe(token => {
              this.rol =  JSON.parse(token).rol;
          });
      }
      else this.autenticat = false;
    });
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
        error: (e) => { this.router.navigate(['/login']); }       // **** Cal veure què s'ha de fer
      }
    );
  }

  prorrogarToken(token: any):boolean {
    return Object.keys(token).length!==0 && JSON.parse(token['response'][0]).new.length!==0;
  }
}
