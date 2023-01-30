import { IFestiusFixes } from "../../Interfaces/IFestiusFixes/IFestiusFixes";

export class FestiusFixes implements IFestiusFixes{
    data: string;
    actiu:boolean;


    constructor(data:string, actiu: boolean){
        this.data = data;
        this.actiu = actiu;
    }

}