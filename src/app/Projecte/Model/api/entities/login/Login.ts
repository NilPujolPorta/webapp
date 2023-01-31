import { EntityBase } from '../entityBase';


export class Login extends EntityBase{
    usuari?: string;
    contrasenya?: string;

    public static inicialitzar(usuari:string, contrasenya:string): Login {
        var login: Login = new Login();
        login.usuari = usuari;
        login.contrasenya = contrasenya;

        return login;
    }

    override toString():string {
        return `Usuari:${this.usuari} | Password:${this.contrasenya}`;
    }

    public static verificarPassword(password1: string, password2: string):boolean {
        return password1==password2 && new RegExp('^(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$').test(password1);
    }
}
