import { HttpHeaders } from "@angular/common/http";
import { LoginDAO } from "../persistence/impl/webStorage/daos/login/LoginDAO";

export class obtainHeaderWithTokens
{
    private static headerDict : any;
    private static requestOptions: any;
    private constructor()
    {
      let token:string = LoginDAO.get("accessToken");// Token vàlid i vigent

      obtainHeaderWithTokens.headerDict = {
        'Access-Control-Allow-Origin':'http://localhost:4200',
        'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8;application/json',
        'Accept': 'application/json, text/plain, /',
        'Access-Control-Allow-Headers': 'Origin,Content-Type,Accept,Authorization',
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
