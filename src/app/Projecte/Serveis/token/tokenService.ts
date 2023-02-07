import { Injectable } from "@angular/core";
import { LoginDAO } from "../../Model/api/persistence/impl/webStorage/daos/login/LoginDAO";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: "root"
})

export class tokenService {
  getActualUser():string {
    console.log(jwt_decode("Login DAO \n"+LoginDAO.get("accesToken")));
    return("admin");
  }
}
