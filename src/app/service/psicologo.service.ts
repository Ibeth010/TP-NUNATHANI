import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let token = sessionStorage.getItem("token");
    return this.http.get<Psicologo[]>(this.url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insert(psicologo: Psicologo) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, psicologo, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
 
  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.get<Psicologo>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  setList(listaNueva: Psicologo[]) {
    this.listaCambio.next(listaNueva);
  }

  update(e: Psicologo) {
    let token = sessionStorage.getItem("token");
    return this.http.put(this.url, e, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  eliminar(id:number){
    let token = sessionStorage.getItem("token");
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getConfirmarEliminacion(){
    return this.confirmarEliminacion.asObservable();
  }

  setConfirmarEliminacion(estado:Boolean){
    this.confirmarEliminacion.next(estado)
  }
}

