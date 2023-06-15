import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Opcion } from '../model/opcion';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class OpcionService {
  private url = `${base_url}/opciones`
  private listaCambio = new Subject<Opcion[]>()
  private confirmaEliminacion = new Subject<Boolean>()
  
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Opcion[]>(this.url);
    }
 insert(opcion: Opcion) {
   return this.http.post(this.url, opcion);
 }
 setList(listaNueva: Opcion[]) {
   this.listaCambio.next(listaNueva);
 }
 getLista() {
   return this.listaCambio.asObservable();
 }
 setConfirmaEliminacion(confirm: Boolean) {
   this.confirmaEliminacion.next(confirm);
 }
 listId(id: number) {
   return this.http.get<Opcion>(`${this.url}/${id}`);
 }
 getConfirmaEliminacion() {
   return this.confirmaEliminacion.asObservable();
 }
 update(p: Opcion) {
   return this.http.put(this.url, p);
 }
 eliminar(id: number) {

   return this.http.delete(`${this.url}/${id}`);
 }
}

