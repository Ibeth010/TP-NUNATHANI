import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Especialidad } from '../model/especialidad';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})

export class EspecialidadService {
  private url=`${base_url}/especialidades`;
  private listaCambio = new Subject<Especialidad[]>();
  private confirmarEliminacion = new Subject<Boolean>()

  constructor(private http:HttpClient) { }
  list(){
    let token = sessionStorage.getItem("token");
  return this.http.get<Especialidad[]>(this.url,{
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
  }
  insert(especialidad: Especialidad) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, especialidad, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Especialidad[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.get<Especialidad>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
 
  update(e: Especialidad) {
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
