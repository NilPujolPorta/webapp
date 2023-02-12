import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { obtainHeaderWithTokens } from "../../Model/api/utils/obtainHeaderWithToken";
import { Treballador } from "../../Model/Entitats/Implementations/Treballador/Treballador";

//Aquest objecte es podrà utilitzar a qualsevol lloc gràcies al "root"
@Injectable({
        providedIn: "root"
})

export class treballadorApi {
    //Amb el constructor fem que la classe catFact tingui la propietat HttpClient per fer peticions HTTP
    constructor(private http:HttpClient){}
    requestOptions = this.createHeader();


    createTreballador(treballador: Treballador): Observable<any>{
        const treballadorJSON = JSON.stringify(treballador);
        return this.http.post("http://localhost:4000/api/treballador/createTreballador", treballadorJSON, {headers:obtainHeaderWithTokens.Instance});
    }

   
    getTreballadors(treballador: string):Observable<any>{
        let arrayTreballador = {usuari: treballador};
        const treballadorJSON = arrayTreballador
        console.log(treballadorJSON)
        return this.http.post("http://localhost:4000/api/guardia/getGuardiesTreballador", treballadorJSON, {headers:obtainHeaderWithTokens.Instance});
    }

    private createHeader(){
        const token: string = "6470ce68e532a37494b757bf58a8b5bb3763f4517b78fdbb4b7db25128612ff7";

        const header = {
            "Access-Control-Allow-Origin":"*",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Headers":"Origin, Content-Type, Accept, Authorization",
        }

        return {headers: new HttpHeaders(header)}
    }

    getTreballadorFromToken(token: string){
        const tokenJSON = {token: token};
        return this.http.post("http://localhost:4000/api/treballador/getTreballadorFromToken", tokenJSON, {headers:obtainHeaderWithTokens.Instance});
    }


    

}