import { EntityBase } from '../entityBase';

export class User extends EntityBase{
    cursos: string[];
    nom: string;
    rol: string;
    password?: string;

    public constructor(nom:string, rol:string, cursos:string[]=[]) { 
        super();
        this.nom=nom;
        this.rol=rol;
        this.cursos=cursos;
    }
    public isTeacher():boolean {
      return this.rol.toLocaleLowerCase() == "teacher";
    }
}