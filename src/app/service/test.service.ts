import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Test } from '../model/test';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class TestService {
  private url = `${base_url}/tests`
  private listaCambio = new Subject<Test[]>()
  private confirmaEliminacion = new Subject<Boolean>()
  
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Test[]>(this.url);
    }
 insert(test: Test) {
   return this.http.post(this.url, test);
 }
 setList(listaNueva: Test[]) {
   this.listaCambio.next(listaNueva);
 }
 getLista() {
   return this.listaCambio.asObservable();
 }
 setConfirmaEliminacion(confirm: Boolean) {
   this.confirmaEliminacion.next(confirm);
 }
 listId(id: number) {
   return this.http.get<Test>(`${this.url}/${id}`);
 }
 getConfirmaEliminacion() {
   return this.confirmaEliminacion.asObservable();
 }
 update(t: Test) {
   return this.http.put(this.url + '/' + t.idtest, t);
 }
 eliminar(id: number) {

   return this.http.delete(`${this.url}/${id}`);
 }
}
