import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Informe } from '../model/informe';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class InformeService {

  private url = `${base_url}/informes`
  private listaCambio = new Subject<Informe[]>();
  private confirmarEliminacion = new Subject<Boolean>()

  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<Informe[ ]>(this.url);
  }
  insert(informe: Informe) {
    return this.http.post(this.url, informe);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Informe>(`${this.url}/${id}`);
  }
  setList(listaNueva: Informe[]) {
    this.listaCambio.next(listaNueva);
  }

  update(i: Informe) {
    return this.http.put(this.url, i);
  }
  eliminar(id: number) {

    return this.http.delete(`${this.url}/${id}`);
  }
  getConfirmaEliminacion() {
    return this.confirmarEliminacion.asObservable();
  }
  setConfirmaEliminacion(estado: Boolean) {
    this.confirmarEliminacion.next(estado);
  }
}
