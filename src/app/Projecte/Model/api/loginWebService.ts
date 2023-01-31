import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Login } from './entities/login/Login';
import { environment } from 'src/environments/environment.prod';
import { LoginDAO } from './persistence/impl/webStorage/daos/login/LoginDAO';
import { User } from './entities/user/User';


@Injectable({
    providedIn: 'root'
})

//.set('Authorization', 'my-auth-token')

export class LoginWebService {

    login?:Login;
    constructor(private http:HttpClient) { }

    autentificar(login:Login):Observable<Login> {
        console.log("Autentificar: "+JSON.stringify(login));
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');

        return this.http.post(`${environment.urlApi}treballador/login`, JSON.stringify(login), {
          headers: headers
        })
    }

    update(user?:any):Observable<Login> {
        console.log(JSON.stringify(user));
        return this.http.post<any>(`${environment.urlApi}update`,JSON.stringify(user));
    }


    getToken():Observable<any> {
        return of(LoginDAO.get());
    }

    verificarToken():Observable<any> {
        const token:string = LoginDAO.get(); ;

        if (token!=null && tokenValid(token)) return of({});    // Token vàlid i vigent

        const headerDict = {
            'Access-Control-Allow-Origin':'http://localhost:4200',
            'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8;application/json',
            'Accept': 'application/json, text/plain, /',
            'Access-Control-Allow-Headers': 'Origin,Content-Type,Accept,Authorization',
            'Authorization': `Bearer ${token}`,
            };

        const requestOptions = {
            headers: new HttpHeaders(headerDict),
            };

        try {
            return this.http.get<String>(`${environment.urlApi}user/login`,requestOptions);
        } catch (e) {
            return of({});;
        }
    }

    getStudents():Observable<Login[]> {
       return this.http.get<Login[]>(`${environment.urlApi}getStudents`);
    }

    getStudent(user: any) {
        return this.http.get<Login[]>(`${environment.urlApi}getStudent/${user}`);
    }

}

function tokenValid(token: any):boolean {
    var caduca = new Date((new Date).getTime()/1000 + 15*60000).getTime();
    console.log(caduca);
    const prorroga_token:number = 50;
    const ara:number = (new Date).getTime()/1000 // Eliminem a partir de dècimes de segon
    return caduca > ara;
}

