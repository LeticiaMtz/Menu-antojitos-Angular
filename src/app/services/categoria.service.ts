import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriaModel } from '../models/categoria.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
  })
  export class CategoriaService {
  
    readonly URL = environment.urlGlobal;
  
    constructor(private http: HttpClient) { }
  
    getCategoria(){
      return this.http.get(`${this.URL}/categoria/obtener`).toPromise();
    }
  
    getCategoriaByid(idCategoria: string){
      return this.http.get(`${this.URL}/categoria/obtener/${idCategoria}`).toPromise();
    }
  
    postCategoria(categoria: CategoriaModel){
      return this.http.post(`${this.URL}/categoria/registrar`, categoria).toPromise();
    }
  
    putCategoria(idCategoria: string, categoria: CategoriaModel){
      return this.http.put(`${this.URL}/categoria/actualizar/${idCategoria}`, categoria).toPromise();
    }
    deleteCategoria(idCategoria: string) {
      return this.http.delete(`${this.URL}/categoria/eliminar/${idCategoria}`).toPromise();
    }
    putCategoriaBlnStatus(idCategoria: string, categoria: CategoriaModel){
      return this.http.put(`${this.URL}/categoria/actualizarBlnStatus/${idCategoria}`, categoria).toPromise();
    }
  
  }