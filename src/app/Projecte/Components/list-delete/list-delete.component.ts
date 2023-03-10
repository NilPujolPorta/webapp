import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, Subscription, take, throwError } from 'rxjs';
import { guardiaApi } from '../../Serveis/Api/guardiaApi';

@Component({
  selector: 'app-list-delete',
  templateUrl: './list-delete.component.html',
  styleUrls: ['./list-delete.component.css']
})
export class ListDeleteComponent implements OnInit {
  guardies!: Array<any>
  //guardia!: Guardia;
  error!: string;
  subscriptions!: Subscription[];
  data!: Array<any>;
  displayedColumns = ['data', 'torn', 'categoria', 'zona', 'delete'];

  constructor(private httpClient: guardiaApi) {
    //this.guardia = new Guardia();
    this.subscriptions = new Array<Subscription>();

    //this.getGuardies();



  /*this.httpClient.getGuardies().subscribe(
    response => {
      //console.log("Dins subscribe");
      //console.log(response)
      this.guardies = response.data;
    });*/
  }
  ngOnInit(): void {
    // this.getGuardiesTreballador("admin")
    this.getGuardies()
  }

  ngOnDestroy(): void {
    this.logSubscriptions();
    this.subscriptions.forEach((s, index) => {
      s.unsubscribe();
    }
    )
    this.logSubscriptions();
  }

  getGuardies() {
    //this.subscriptions.push(
      this.httpClient.getGuardies().pipe(
        take(1),
        catchError((err: any) => {
          return throwError(() => new Error("Error al agafar guardia"))
        })
      ).subscribe({
        next: (x) => {
          this.guardies = x;
          this.data = this.guardies;
        },
        error: (err: any) => {
          console.log(err.message)
        },
        complete: () => {},
      })
  }

  // getGuardiesTreballador(treballador: string) {
  //   //this.subscriptions.push(
  //     this.httpClient.getGuardiesTreballador(treballador).pipe(
  //       take(1),
  //       catchError((err: any) => {
  //         return throwError(() => new Error("Error al agafar guardia"))
  //       })
  //     ).subscribe({
  //       next: (x) => {
  //         this.guardies = x;
  //         this.data = this.guardies
  //       },
  //       error: (err: any) => {
  //         console.log(err.message)
  //       },
  //       complete: () => {},
  //     })
  // }

  delete(idGuardia: string|undefined) {
    let usuari = localStorage.getItem("usuari")!;
    this.httpClient.deactivateGuardia(idGuardia, usuari).subscribe(missatge => {
      console.log(missatge);
  });
  window.location.reload();
  }




  private logSubscriptions() {
    this.subscriptions.forEach((s, index) => {
      console.log(index + " - " + s.closed);
    }
    )
  }

  formatData(data: string) {
    let dataFormatada = new Date(data).toLocaleDateString();
    return dataFormatada;
  }

}
