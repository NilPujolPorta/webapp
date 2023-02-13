import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, Subscription, take, throwError } from 'rxjs';
import { guardiaApi } from '../../Serveis/Api/guardiaApi';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  guardies!: Array<any>
  //guardia!: Guardia;
  error!: string;
  subscriptions!: Subscription[];
  data!: Array<any>;
  displayedColumns = ['data', 'torn', 'categoria', 'zona', 'estat'];

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
    this.getGuardiesTreballador(localStorage.getItem("usuari")!)
    console.log("--------------")
    console.log(this.guardies)
    console.log("--------------")
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
        },
        error: (err: any) => {
          console.log(err.message)
        },
        complete: () => {},
      })
  }

  getGuardiesTreballador(treballador: string) {
    //this.subscriptions.push(
      this.httpClient.getGuardiesTreballador(treballador).pipe(
        take(1),
        catchError((err: any) => {
          return throwError(() => new Error("Error al agafar guardia"))
        })
      ).subscribe({

        next: (x) => {
          console.log("2")
          this.guardies = x;
          console.log("this.guardies")
          console.log(this.guardies)
          this.data = this.guardies
        },
        error: (err: any) => {
          console.log(err.message)
        },
        complete: () => {},
      })
  }

  private logSubscriptions() {
    this.subscriptions.forEach((s, index) => {
      console.log(index + " - " + s.closed);
    }
    )
  }

}
