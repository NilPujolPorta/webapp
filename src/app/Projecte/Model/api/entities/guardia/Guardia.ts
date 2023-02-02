import { IGuardia } from "../../persistence/api/Guardia/IGuardia";

export class Guardia implements IGuardia {
  idGuardia: number;
  places: number;
  torn: string;
  zona: string;
  categoria: string;
  data: Date;
  actiu: boolean;
  usuariMOD: string;

  constructor(obj: Guardia) {
    this.idGuardia = obj.idGuardia;
    this.places = obj.places;
    this.torn = obj.torn;
    this.zona = obj.zona;
    this.categoria = obj.categoria;
    this.data = obj.data;
    this.actiu = obj.actiu;
    this.usuariMOD = obj.usuariMOD;
  }
}
