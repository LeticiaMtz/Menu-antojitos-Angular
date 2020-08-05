import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlatilloModel } from '../models/platillo.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
  })
  export class PlatilloService {
  
    readonly URL = environment.urlGlobal;
  
    constructor(private http: HttpClient) { }
  
    getPlatillo(){
      return this.http.get(`${this.URL}/platillo/obtener`).toPromise();
    }
  
    getPlatilloByid(idPlatillo: string){
      return this.http.get(`${this.URL}/platillo/obtener/${idPlatillo}`).toPromise();
    }
  
    postPlatillo(platillo: PlatilloModel){
      return this.http.post(`${this.URL}/platillo/registrar`, platillo).toPromise();
    }
  
    putPlatillo(idPlatillo: string, platillo: PlatilloModel){
      return this.http.put(`${this.URL}/platillo/actualizar/${idPlatillo}`, platillo).toPromise();
    }
    putPlatilloBlnStatus(idPlatillo: string, platillo: PlatilloModel){
      return this.http.put(`${this.URL}/platillo/actualizarBlnStatus/${idPlatillo}`, platillo).toPromise();
    }
  
  }