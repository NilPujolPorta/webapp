import { IPlantilles } from "../../Interfaces/IPlantilles/IPlantilles";

export class Plantilles implements IPlantilles{
    idPlantilla: number;
    places: number;
    torn: string;
    zona: string;
    categoria: string;
    actiu: boolean;


    constructor(idPlantilla:number, places:number, torn:string, zona:string, categoria:string, actiu:boolean){
        this.idPlantilla = idPlantilla;
        this.places = places;
        this.torn = torn;
        this.zona = zona;
        this.categoria = categoria;
        this.actiu = actiu;
    }


}