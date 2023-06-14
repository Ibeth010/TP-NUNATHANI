import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estado } from '../model/estado';
import { Cita } from '../model/cita';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private url = `${base_url}/estados`
  private listaCambio = new Subject<Estado[]>();
  private confirmaEliminacion = new Subject<Boolean>()

  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<Estado[ ]>(this.url);
  }
  insert(Estado: Estado) {
    return this.http.post(this.url, Estado);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Estado[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<Estado>(`${this.url}/${id}`);
  }
  update(estado: Estado) {
    //return this.http.put(this.url + '/' + estado.idEstado, estado);
    return this.http.put(this.url, estado);
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
