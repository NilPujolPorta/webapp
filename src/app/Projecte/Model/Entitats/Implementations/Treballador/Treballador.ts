import { ITreballador } from "../../Interfaces/ITreballador/ITreballador";


export class Treballador implements ITreballador{
    usuari: string;
    contrasenya: string;
    nom: string;
    cognoms: string;
    categoria: string;
    rol: string;
    actiu: boolean;


    constructor(usuari: string, contrasenya: string, nom: string, cognoms: string, categoria: string, rol: string, actiu: boolean){
        this.usuari = usuari;
        this.contrasenya = contrasenya;
        this.nom = nom;
        this.cognoms = cognoms;
        this.categoria = categoria;
        this.rol = rol;
        this.actiu = actiu;
    }

}