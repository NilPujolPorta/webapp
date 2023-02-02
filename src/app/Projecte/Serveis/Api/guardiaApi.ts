import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

//Aquest objecte es podrà utilitzar a qualsevol lloc gràcies al "root"
@Injectable({
        providedIn: "root"
})

export class guardiaApi {
    //Amb el constructor fem que la classe catFact tingui la propietat HttpClient per fer peticions HTTP
    constructor(private http:HttpClient){}
    requestOptions = this.createHeader();


    createGuardia(guardia: Array<any>): Observable<any>{
        const guardiaJSON = JSON.stringify(guardia);

        return this.http.post("http://localhost:4000/api/guardia/createGuardia", guardiaJSON, this.requestOptions);
    }

    getGuardies():Observable<any>{
        console.log("aaaaa")
        return this.http.get("http://localhost:4000/api/guardia/getGuardies", this.requestOptions);
    }
    
    getGuardiesTreballador(treballador: string):Observable<any>{
        let arrayTreballador = {usuari: treballador};
        const treballadorJSON = arrayTreballador
        console.log(treballadorJSON)
        return this.http.post("http://localhost:4000/api/guardia/getGuardiesTreballador", treballadorJSON, this.requestOptions);
    }

    deactivateGuardia(guardia: Array<any>): Observable<any>{
        const guardiaJSON = JSON.stringify(guardia);
        console.log("e");
        console.log(guardia);
        return this.http.post("http://localhost:4000/api/guardia/deactivateGuardia", guardiaJSON, this.requestOptions);
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
            //"Authorization": `Bearer ${token}`
        }

        return {headers: new HttpHeaders(header)}
    }

}