import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginDAO } from "../../Model/api/persistence/impl/webStorage/daos/login/LoginDAO";
import { obtainHeaderWithTokens } from "../../Model/api/utils/obtainHeaderWithToken";
import { tokenService } from "../token/tokenService";

//Aquest objecte es podrà utilitzar a qualsevol lloc gràcies al "root"
@Injectable({
        providedIn: "root"
})

export class guardiaApi {
    //Amb el constructor fem que la classe catFact tingui la propietat HttpClient per fer peticions HTTP
    constructor(private http:HttpClient, private token:tokenService){}
    requestOptions = this.createHeader();


    createGuardia(guardia: Array<any>): Observable<any>{
        const guardiaJSON = JSON.stringify(guardia);

        return this.http.post("http://localhost:4000/api/guardia/createGuardia", guardiaJSON,  obtainHeaderWithTokens.Instance);
    }

    getGuardies():Observable<any>{
        console.log("aaaaa")
        return this.http.post("http://localhost:4000/api/guardia/","{}", obtainHeaderWithTokens.Instance);
    }

    getGuardiesTreballador(treballador :string):Observable<any>{
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa")
        const treballadorJSON = {usuari: treballador};
        console.log(treballadorJSON)
        return this.http.post("http://localhost:4000/api/guardia/getGuardiesTreballador", treballadorJSON, obtainHeaderWithTokens.Instance);
    }

    deactivateGuardia(idGuardia: string|undefined, usuariMOD: string): Observable<any>{
        const guardiaJSON = {idGuardia: idGuardia, usuariMOD: usuariMOD};
        console.log(guardiaJSON)
        return this.http.post("http://localhost:4000/api/guardia/deactivateGuardia", guardiaJSON, obtainHeaderWithTokens.Instance);
    }

    // const deactivateGuardia = (async (req, res) => {
    //     try {
    //         await db.execute(
    //             'UPDATE Guardia SET actiu = false AND usuariMOD = ? WHERE idGuardia = ?',
    //             [req.body.usuariMOD, req.body.idGuardia]
    //         )
    //         res.status(201).json({ missatge: "Guardia desactivada" })
    //     } catch (error) {
    //         res.status(400).json({ missatge: error })
    //     }
    // })


    private createHeader(){
        const token: string = "6470ce68e532a37494b757bf58a8b5bb3763f4517b78fdbb4b7db25128612ff7";

        const header = {
            "Access-Control-Allow-Origin":"*",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Headers":"Origin, Content-Type, Accept, Authorization",
            "Authorization": `Bearer ${LoginDAO.get("accesToken")}`
        }

        return {headers: new HttpHeaders(header)}
    }

    apuntarTreballador(treballador: string|null, idGuardia: string|undefined): Observable<any>{
        const treballadorJSON = {usuari: treballador?.toString(), idGuardia: idGuardia?.toString(), usuariMOD: treballador?.toString()};
        return this.http.post("http://localhost:4000/api/treballadorsApuntats/apuntarTreballador", treballadorJSON, obtainHeaderWithTokens.Instance);
    }

    desapuntarTreballador(treballador: string|null, idGuardia: string|undefined): Observable<any>{
        const treballadorJSON = {usuari: treballador?.toString(), idGuardia: idGuardia?.toString()};
        return this.http.post("http://localhost:4000/api/treballadorsApuntats/desapuntarTreballador", treballadorJSON, obtainHeaderWithTokens.Instance);
    }

    getTreballador(treballador: string|undefined): Observable<any>{
        const treballadorJSON = {usuari: treballador?.toString()};
        return this.http.post("http://localhost:4000/api/treballador/getTreballador", treballadorJSON, obtainHeaderWithTokens.Instance);
    }

}
