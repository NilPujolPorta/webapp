import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Login } from './entities/login/Login';
import { environment } from 'src/environments/environment.prod';
import { LoginDAO } from './persistence/impl/webStorage/daos/login/LoginDAO';
import { User } from './entities/user/User';
import { Treballador } from '../Entitats/Implementations/Treballador/Treballador';
import jwt_decode from 'jwt-decode';
import {JwtHelperService} from '@auth0/angular-jwt';



@Injectable({
    providedIn: 'root'
})

//.set('Authorization', 'my-auth-token')

export class LoginWebService {

    login?:Login;
    constructor(private http:HttpClient, private jwtHelper: JwtHelperService) { }

    autentificar(login:Login):Observable<Login> {
        console.log("Autentificar: "+JSON.stringify(login));
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');
        return this.http.post(`${environment.urlApi}treballador/login`, JSON.stringify(login), {
          headers: headers
        })
    }

    getTreballador(treballador: Treballador) {
      return this.http.post<any>(`${environment.urlApi}getTreballador`,JSON.stringify(treballador));
    }

    getToken():Observable<any> {
        return of(LoginDAO.get("refreshToken"));
    }

    verificarToken():Observable<any> {
        let token:string = LoginDAO.get("accessToken");
        let tokenRef:string = LoginDAO.get("refreshToken");
        console.log(token + " -- " + tokenRef)
        if (token!=null && this.tokenValid(token)) return of({"tokenOK":"tokenOK"});    // Token vàlid i vigent
        const headerDict = {
          'Access-Control-Allow-Origin':'http://localhost:4200',
          'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8;application/json',
          'Accept': 'application/json, text/plain, /',
          'Access-Control-Allow-Headers': 'Origin,Content-Type,Accept,Authorization',
          'Authorization': `Bearer ${tokenRef}`,
        };

        const requestOptions = {
            headers: new HttpHeaders(headerDict),
        };

        try {
          console.log("Before refreshing token")
          console.log(token);
          return this.http.get<String>(`${environment.urlApi}treballador/refreshToken`,requestOptions);
        } catch (e) {
            console.log(e)
            return of({});;
        }
      }

      tokenValid(token: any):boolean {
        if (this.jwtHelper.isTokenExpired(token)) {
          return false;
        } else {
          return true;
        }
      }
}



