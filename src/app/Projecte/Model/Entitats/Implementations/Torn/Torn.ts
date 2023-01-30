import { ITorn } from "../../Interfaces/ITorn/ITorn";

export class Torn implements ITorn{
    nom:string;
    actiu:boolean;


    constructor(nom:string, actiu: boolean){
        this.nom = nom;
        this.actiu = actiu;
    }
}