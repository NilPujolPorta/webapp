import { IPersistenceManager } from './iPersistenceManager';
export class WebStoragePersistenceManager implements IPersistenceManager{
    static saveData(name:string, data: any) {
        localStorage.setItem(data, name);
    }

    static saveDataWithCaducity(name:string,data:any,caducity:Date) {
        let object = { "value": data, "timestamp": caducity};
        data = JSON.stringify(object);
        this.saveData(name,data);
    }

    static getData(name:string):any {
        return localStorage.getItem(name);
    }

    static getDataWithCaducity(name:string):any {
        let object = JSON.parse(localStorage.getItem(name)!);
        if (object != null && (new Date(object.timestamp).getTime())>Date.now()) return JSON.stringify(object);
        return null;
    }

    static clearToken(name:string): void {
      localStorage.removeItem(name);
    }
}
