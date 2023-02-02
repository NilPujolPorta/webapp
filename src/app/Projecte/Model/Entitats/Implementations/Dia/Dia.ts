import { IDia } from "../../Interfaces/IDia/IDia";

export class Dia implements IDia {
    data: string;
    actiu: boolean;

    constructor(data: string, actiu:boolean){
        this.data = data;
        this.actiu = actiu;
    }

}