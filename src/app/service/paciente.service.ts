import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paciente } from '../model/paciente';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private url = `${base_url}/pacientes`
  private listaCambio = new Subject<Paciente[]>()
  private confirmaEliminacion = new Subject<Boolean>()
  
  constructor(private http: HttpClient) { }
  list() {
    let token = sessionStorage.getItem("token");
    return this.http.get<Paciente[]>(this.url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
    }
 insert(paciente: Paciente) {
  let token = sessionStorage.getItem("token");
   return this.http.post(this.url, paciente,{
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
 }
 setList(listaNueva: Paciente[]) {
   this.listaCambio.next(listaNueva);
 }
 getLista() {
   return this.listaCambio.asObservable();
 }
 setConfirmaEliminacion(confirm: Boolean) {
   this.confirmaEliminacion.next(confirm);
 }
 listId(id: number) {
  let token = sessionStorage.getItem("token");
   return this.http.get<Paciente>(`${this.url}/${id}`,{
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
 }
 getConfirmaEliminacion() {
   return this.confirmaEliminacion.asObservable();
 }
 update(p: Paciente) {
  let token = sessionStorage.getItem("token");
   return this.http.put(this.url + '/' + p.idpaciente, p ,{
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
 }
 eliminar(id: number) {
  let token = sessionStorage.getItem("token");
   return this.http.delete(`${this.url}/${id}`,{
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
 }
}
