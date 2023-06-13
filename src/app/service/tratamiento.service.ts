import { Injectable } from '@angular/core';

import { Tratamiento } from '../model/tratamiento';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  private url = `${base_url}/tratamientos`
  private listaCambio = new Subject<Tratamiento[]>()
  private confirmaEliminacion = new Subject<Boolean>()


  constructor(private http: HttpClient) {}
  list() {
     return this.http.get<Tratamiento[]>(this.url);
     }
  insert(tratamiento: Tratamiento) {
    return this.http.post(this.url, tratamiento);
  }
  setList(listaNueva: Tratamiento[]) {
    this.listaCambio.next(listaNueva);
  }
  getLista() {
    return this.listaCambio.asObservable();
  }
  setConfirmaEliminacion(confirm: Boolean) {
    this.confirmaEliminacion.next(confirm);
  }
  listId(id: number) {
    return this.http.get<Tratamiento>(`${this.url}/${id}`);
  }
  getConfirmaEliminacion() {
    return this.confirmaEliminacion.asObservable();
  }
  update(p: Tratamiento) {
    return this.http.put(this.url, p);
  }
  eliminar(id: number) {

    return this.http.delete(`${this.url}/${id}`);
  }
}
