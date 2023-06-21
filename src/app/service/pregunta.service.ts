import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pregunta } from '../model/pregunta';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
    return this.http.get<Pregunta[]>(this.url);
  }
  insert(pregunta: Pregunta) {
    return this.http.post(this.url, pregunta);
  }
  setList(listaNueva: Pregunta[]) {
    this.listaCambio.next(listaNueva);
  }
  getLista() {
    return this.listaCambio.asObservable();
  }

  listIdPregunta(id: number) {
    return this.http.get<Pregunta>(`${this.url}/${id}`);
  }
  updateCita(pregunta: Pregunta) {
    //return this.http.put(this.url + '/' + estado.idEstado, estado);
    return this.http.put(this.url, pregunta);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getConfirmaEliminacion() {
    return this.confirmaEliminacion.asObservable();
  }
  setConfirmaEliminacion(pregunta: Boolean) {
    this.confirmaEliminacion.next(pregunta);
  }
}
