import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ILoginDAO } from "../../../../api/login/ILoginDAO";
import { Login } from "src/app/Projecte/Model/api/entities/login/Login";

export class LoginDAO implements ILoginDAO {
    login(login:Login):Observable<Login> {
        throw("Not implemented");
    }

}
