import { IGuardia } from "../../Interfaces/IGuardia/IGuardia";

export class Guardia implements IGuardia{
    idGuardia: string;
    places: number;
    torn: string;
    zona: string;
    categoria: string;
    data: string;
    actiu: boolean;


    constructor(idGuardia:string, places:number, torn:string, zona:string, categoria:string, data:string, actiu:boolean){
        this.idGuardia = idGuardia;
        this.places = places;
        this.torn = torn;
        this.zona = zona;
        this.categoria = categoria;
        this.data = data;
        this.actiu = actiu;
    }

}