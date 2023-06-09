import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject,Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Test } from '../model/test';
import { PreguntaTestDTO } from '../model/PreguntaTestDTO';
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
    let token = sessionStorage.getItem("token");
    return this.http.get<Test[]>(this.url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
    }
 insert(test: Test) {
  let token = sessionStorage.getItem("token");
   return this.http.post(this.url, test,{
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
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
  let token = sessionStorage.getItem("token");
   return this.http.get<Test>(`${this.url}/${id}`,{
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
 }
 getConfirmaEliminacion() {
   return this.confirmaEliminacion.asObservable();
 }
 update(t: Test) {
  let token = sessionStorage.getItem("token");
   return this.http.put(this.url + '/' + t.idtest, t,{
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
 }
 eliminar(id: number) {
  let token = sessionStorage.getItem("token");
   return this.http.delete(`${this.url}/${id}`,{
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
 }

 getPreguntaCountByTest(): Observable<PreguntaTestDTO[]> {
  let token = sessionStorage.getItem("token");
  return this.http.get<PreguntaTestDTO[]>(`${this.url}/pregunta-count`,{
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
  
}
}
