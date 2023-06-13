import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Paciente[]>(this.url);
    }
 insert(paciente: Paciente) {
   return this.http.post(this.url, paciente);
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
   return this.http.get<Paciente>(`${this.url}/${id}`);
 }
 getConfirmaEliminacion() {
   return this.confirmaEliminacion.asObservable();
 }
 update(p: Paciente) {
   return this.http.put(this.url + '/' + p.idpaciente, p);
 }
 eliminar(id: number) {

   return this.http.delete(`${this.url}/${id}`);
 }
}
