import { IGuardia } from "../Guardia/IGuardia";

export class IGuardias {
  guardias: IGuardia[];

  constructor(guardias: IGuardia[]) {
    this.guardias = guardias;
  }
}
