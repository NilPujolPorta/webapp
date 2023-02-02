import { ITreballadorsApuntats } from "../../Interfaces/ITreballadorsApuntats/ITreballadorsApuntats";

export class TreballadorsApuntats implements ITreballadorsApuntats{
    estat: string;
    idGuardia: number;
    usuari: string;


    constructor(estat: string, idGuardia: number, usuari: string){
        this.estat = estat;
        this.idGuardia = idGuardia;
        this.usuari = usuari;
    }

}