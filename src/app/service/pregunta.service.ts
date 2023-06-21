import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pregunta } from '../model/pregunta';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  private url = `${base_url}/preguntas`
  private listaCambio = new Subject<Pregunta[]>()
  private confirmaEliminacion = new Subject<Boolean>()

  constructor(private http: HttpClient) { }
  list() {
    let token = sessionStorage.getItem("token");
    return this.http.get<Pregunta[]>(this.url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insert(pregunta: Pregunta) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, pregunta,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  setList(listaNueva: Pregunta[]) {
    this.listaCambio.next(listaNueva);
  }
  getLista() {
    return this.listaCambio.asObservable();
  }

  listIdPregunta(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.get<Pregunta>(`${this.url}/${id}`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  updateCita(pregunta: Pregunta) {
    let token = sessionStorage.getItem("token");
    //return this.http.put(this.url + '/' + estado.idEstado, estado);
    return this.http.put(this.url, pregunta,{
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
  setConfirmaEliminacion(pregunta: Boolean) {
    this.confirmaEliminacion.next(pregunta);
  }
}
