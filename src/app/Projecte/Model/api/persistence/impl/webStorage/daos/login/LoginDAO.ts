import { ILoginDAO } from "../../../../api/login/ILoginDAO";
import { WebStoragePersistenceManager } from "../../../../managers/webStoragePersistenceManager";

export class LoginDAO implements ILoginDAO {
    static get(name:string):string {
        return WebStoragePersistenceManager.getData(name);
    }
    static save(data:string, name:string) {
        return WebStoragePersistenceManager.saveData(name,data);
    }
    static clear(name:string) {
      WebStoragePersistenceManager.clearToken(name);
    }
}
