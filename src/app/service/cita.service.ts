import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cita } from '../model/cita';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private url = `${base_url}/citas`
  private listaCambio = new Subject<Cita[]>()
  private confirmaEliminacion = new Subject<Boolean>()

  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Cita[]>(this.url);
  }
  insert(cita: Cita) {
    return this.http.post(this.url, cita);
  }
  setList(listaNueva: Cita[]) {
    this.listaCambio.next(listaNueva);
  }
  getLista() {
    return this.listaCambio.asObservable();
  }

  listIdCita(id: number) {
    return this.http.get<Cita>(`${this.url}/${id}`);
  }
  updateCita(cita: Cita) {
    //return this.http.put(this.url + '/' + estado.idEstado, estado);
    return this.http.put(this.url, cita);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getConfirmaEliminacion() {
    return this.confirmaEliminacion.asObservable();
  }
  setConfirmaEliminacion(estado: Boolean) {
    this.confirmaEliminacion.next(estado);
  }
}
