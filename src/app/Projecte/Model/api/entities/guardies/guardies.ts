import { Guardia } from "../guardia/Guardia";

export class Guardias {
  public guardies: Guardia[];

  public getGuardias(): Guardia[] {
    return this.guardies;
  }
  public setGuardias(value: Guardia[]) {
    this.guardies = value;
  }

  constructor(guardias: Guardia[]) {
    this.guardies = guardias;
  }
}
