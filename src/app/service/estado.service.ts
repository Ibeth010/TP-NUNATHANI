import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let token = sessionStorage.getItem("token");
    return this.http.get<Estado[ ]>(this.url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insert(Estado: Estado) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, Estado,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Estado[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.get<Estado>(`${this.url}/${id}`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  update(estado: Estado) {
    let token = sessionStorage.getItem("token");
    //return this.http.put(this.url + '/' + estado.idEstado, estado);
    return this.http.put(this.url, estado,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  listIdCita(id: number) {
    return this.http.get<Cita>(`${this.url}/${id}`);
  }
  updateCita(cita: Cita) {
    //return this.http.put(this.url + '/' + estado.idEstado, estado);
    return this.http.put(this.url, cita);
  }
  eliminar(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.delete(`${this.url}/${id}`,{
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
