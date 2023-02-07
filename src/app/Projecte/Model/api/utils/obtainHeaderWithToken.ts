import { HttpClient, HttpHeaders } from "@angular/common/http";
import { createInjectableType } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { LoginDAO } from "../persistence/impl/webStorage/daos/login/LoginDAO";

@Injectable({
  providedIn: 'root'
})
export class obtainHeaderWithTokens
{
    private static headerDict : any;
    private static requestOptions: any;
    private constructor(private http: HttpClient)
    {
      let token:string = LoginDAO.get("accessToken");// Token vàlid i vigent
      console.log("CREATING SINGLETONE "+token)

      obtainHeaderWithTokens.headerDict = {
        "Access-Control-Allow-Origin":"*",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Headers":"Origin, Content-Type, Accept, Authorization",
        'Authorization': `Bearer ${token}`,
      };

      obtainHeaderWithTokens.requestOptions = {
          headers: new HttpHeaders(obtainHeaderWithTokens.headerDict),
      };
    }

    public static get Instance()
    {
        // Do you need arguments? Make it a regular static method instead.
        return this.requestOptions;
    }
}
