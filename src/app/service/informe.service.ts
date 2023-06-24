import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject,Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Informe } from '../model/informe';
import { InformeTratamientoDTO } from '../model/InformeTratamientoDTO';
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
    let token = sessionStorage.getItem("token");
    return this.http.get<Informe[ ]>(this.url,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insert(informe: Informe) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, informe,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.get<Informe>(`${this.url}/${id}`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  setList(listaNueva: Informe[]) {
    this.listaCambio.next(listaNueva);
  }

  update(i: Informe) {
    let token = sessionStorage.getItem("token");
    return this.http.put(this.url, i,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  eliminar(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.delete(`${this.url}/${id}`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getConfirmaEliminacion() {
    return this.confirmarEliminacion.asObservable();
  }
  setConfirmaEliminacion(estado: Boolean) {
    this.confirmarEliminacion.next(estado);
  }
  getTratamientoCountByInforme(): Observable<InformeTratamientoDTO[]> {
    let token = sessionStorage.getItem("token");
    return this.http.get<InformeTratamientoDTO[]>(`${this.url}/tratamiento-count`,{
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
}
}