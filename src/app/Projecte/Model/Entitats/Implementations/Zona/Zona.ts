import { IZona } from "../../Interfaces/IZona/IZona";

export class Zona implements IZona{
    nom:string;
    actiu:boolean;


    constructor(nom:string, actiu: boolean){
        this.nom = nom;
        this.actiu = actiu;
    }
}