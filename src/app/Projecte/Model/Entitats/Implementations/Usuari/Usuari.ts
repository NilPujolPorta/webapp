import { IUsuari } from "../../Interfaces/IUsuari/IUsuari";

export class Usuari implements IUsuari{
    usuari: string;
    contrasenya: string;
    correu: string;


    constructor(usuari: string, contrasenya: string, correu: string){
        this.usuari = usuari;
        this.contrasenya = contrasenya;
        this.correu = correu;
    }
}