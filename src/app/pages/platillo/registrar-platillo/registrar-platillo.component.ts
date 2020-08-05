import { Component, OnInit, Output,  EventEmitter } from '@angular/core';
import { PlatilloModel } from 'src/app/models/platillo.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { PlatilloService } from 'src/app/services/platillo.service';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 6000
});

@Component({
  selector: 'app-registrar-platillo',
  templateUrl: './registrar-platillo.component.html',
  styleUrls: ['./registrar-platillo.component.css']
})
export class RegistrarPlatilloComponent implements OnInit {
  platillo: PlatilloModel = new PlatilloModel();
  categorias: CategoriaModel[] = [];
  @Output() refresh = new EventEmitter();

  constructor(private platilloService: PlatilloService,  private categoriaService: CategoriaService,) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(){
    this.categoriaService.getCategoria().then((categorias: any) => {
      this.categorias = categorias.cnt;
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.msg
      });      
    })
  
  }
  savePlatillo(forma: NgForm) {
    this.platilloService.postPlatillo(this.platillo).then((resp) => {
      console.log(resp);
      Toast.fire({
        icon: 'success',
        title: 'Platillo registrado correctamente'
      });
      this.refresh.emit(true);
    }).catch((err) => {
      console.log(err);
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });  
    })
  }

}

