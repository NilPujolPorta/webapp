import { IRegistres } from "../../Interfaces/IRegistres/IRegistres";

export class Registres implements IRegistres{
    data: string;
    usuari: string;
    taula: string;
    anterior: string;
    actual: string;



    constructor(data: string, usuari: string, taula: string, anterior: string, actual: string){
        this.data = data;
        this.usuari = usuari;
        this.taula = taula;
        this.anterior = anterior;
        this.actual = actual;
    }


}