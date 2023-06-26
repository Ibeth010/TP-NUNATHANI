import { Injectable } from '@angular/core';
import { Tratamiento } from '../model/tratamiento';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RutinaTratamientoDTO } from '../model/rutinaTratamientoDTO';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  private url = `${base_url}/tratamientos`
  private listaCambio = new Subject<Tratamiento[]>()
  private confirmaEliminacion = new Subject<Boolean>()


  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem("token");
     return this.http.get<Tratamiento[]>(this.url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
     });
     }
  insert(tratamiento: Tratamiento) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, tratamiento,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  setList(listaNueva: Tratamiento[]) {
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
    return this.http.get<Tratamiento>(`${this.url}/${id}`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getConfirmaEliminacion() {
    return this.confirmaEliminacion.asObservable();
  }
  update(p: Tratamiento) {
    let token = sessionStorage.getItem("token");
    return this.http.put(this.url, p,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  eliminar(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.delete(`${this.url}/${id}`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  getRutinaCountByTratamiento(): Observable<RutinaTratamientoDTO[]> {
    let token = sessionStorage.getItem("token");
    return this.http.get<RutinaTratamientoDTO[]>(`${this.url}/rutina-count`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
    
  }

  gettema(temaTratamiento:string): Observable<Tratamiento[]> {
    let token = sessionStorage.getItem("token");
    return this.http.post<Tratamiento[]>(`${this.url}/buscar`, temaTratamiento, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
   }
}
