import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rutinas_recreativas } from '../model/rutinas_recreativas';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class Rutinas_recreativasService {
  private url = `${base_url}/rutinas_recreativas`
  private listaCambio = new Subject<Rutinas_recreativas[]>();
  private confirmaEliminacion = new Subject<Boolean>();
  constructor(private http: HttpClient) { }
  list(){
    let token = sessionStorage.getItem("token");
    return this.http.get<Rutinas_recreativas[ ]>(this.url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insert(Rutinas_recreativas: Rutinas_recreativas) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, Rutinas_recreativas,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Rutinas_recreativas[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.get<Rutinas_recreativas>(`${this.url}/${id}`);
  }
  update(d: Rutinas_recreativas) {
    let token = sessionStorage.getItem("token");
    return this.http.put(this.url + '/' + d.id, d,{ //REVISAR 
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getLista() {
    return this.listaCambio.asObservable();
  }
  modificar(rutinas_recreativas: Rutinas_recreativas) {
    return this.http.put(this.url + "/" + rutinas_recreativas.id, rutinas_recreativas);
  }
  eliminar(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.delete(`${this.url}/${id}`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getConfirmaEliminacion() {
    return this.confirmaEliminacion.asObservable();
  }
  setConfirmaEliminacion(estado: Boolean) {
    this.confirmaEliminacion.next(estado);
  }

}
