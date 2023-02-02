import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Guardias } from './entities/guardies/guardies';
import { Guardia } from './entities/guardia/Guardia';
import { environment } from 'src/environments/environment';
import {obtainHeaderWithTokens} from 'src/app/Projecte/Model/api/utils/obtainHeaderWithToken'

@Injectable({
  providedIn: 'root'
})
export class GuardiasService {
  constructor(private http: HttpClient) { }

  getGuardias(): Observable<Guardias> {
    return this.http.get<Guardias>(`${environment.urlApi}api/guardia`, {headers:obtainHeaderWithTokens.Instance});
  }
}
