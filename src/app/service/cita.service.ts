import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cita } from '../model/cita';
import { Subject,Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paciente } from '../model/paciente';

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
    let token = sessionStorage.getItem("token");
    return this.http.get<Cita[]>(this.url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insert(cita: Cita) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, cita,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  setList(listaNueva: Cita[]) {
    this.listaCambio.next(listaNueva);
  }
  getLista() {
    return this.listaCambio.asObservable();
  }

  listIdCita(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.get<Cita>(`${this.url}/${id}`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  updateCita(cita: Cita) {
    let token = sessionStorage.getItem("token");
    //return this.http.put(this.url + '/' + estado.idEstado, estado);
    return this.http.put(this.url, cita,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
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
  getbuscarBuscarFecha(fecha:Date): Observable<Cita[]> {
    let token = sessionStorage.getItem("token");
    return this.http.post<Cita[]>(`${this.url}/buscar`, fecha, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
   }
}
