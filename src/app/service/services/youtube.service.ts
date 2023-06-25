import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http:HttpClient) {}

    getChannels(channelName):
    Observable<any>{
      const API_KEY = "AIzaSyCwur3zZBUbMQ-C9yIIrJ-ccsUtmtMvG28"; //API KEY ....¡CREEN UN PROYECTO, LUEGO CREEN SUS CREDENCIALES CON LA API!
      const url="https://www.googleapis.com/youtube/v3/search?part-snippet&q="+channelName+"&type=channel&key="+API_KEY+"&maxResults1"; //NOS BRINDA MÁXIMO 1 RESULTDO DE LA API DE YOUTUBE

      return this.http.get<any>(url);
    }
}
