import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Disponibilidad } from '../model/disponibilidad';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService {
  private url = `${base_url}/disponibilidades`
  private listaCambio = new Subject<Disponibilidad[]>();
  private confirmaEliminacion = new Subject<Boolean>()
  constructor(private http: HttpClient) { }
  list(){
    let token = sessionStorage.getItem("token");
    return this.http.get<Disponibilidad[]>(this.url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insert(disponibilidad: Disponibilidad) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, disponibilidad, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Disponibilidad[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.get<Disponibilidad>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  update(d: Disponibilidad) {
    let token = sessionStorage.getItem("token");
    return this.http.put(this.url, d, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  eliminar(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getConfirmaEliminacion() {
    return this.confirmaEliminacion.asObservable();
  }
  setConfirmaEliminacion(estado: Boolean) {
    this.confirmaEliminacion.next(estado);
  }
}