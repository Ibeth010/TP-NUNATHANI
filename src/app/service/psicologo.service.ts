import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Psicologo } from '../model/psicologo';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})

export class PsicologoService {

  private url = `${base_url}/psicologos`
  private listaCambio = new Subject<Psicologo[]>()
  private confirmarEliminacion = new Subject<Boolean>()

  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Psicologo[]>(this.url);
  }
  insert(psicologo: Psicologo) {
    return this.http.post(this.url, psicologo);
  }
 
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Psicologo>(`${this.url}/${id}`);
  }
  setList(listaNueva: Psicologo[]) {
    this.listaCambio.next(listaNueva);
  }

  update(e: Psicologo) {
    return this.http.put(this.url, e);
  }
  eliminar(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }
  getConfirmarEliminacion(){
    return this.confirmarEliminacion.asObservable();
  }

  setConfirmarEliminacion(estado:Boolean){
    this.confirmarEliminacion.next(estado)
  }
}

