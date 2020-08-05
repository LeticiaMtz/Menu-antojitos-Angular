import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { NgForm } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-actualizar-categoria',
  templateUrl: './actualizar-categoria.component.html',
  styleUrls: ['./actualizar-categoria.component.css']
})
export class ActualizarCategoriaComponent implements OnInit {

  categoria: CategoriaModel = new CategoriaModel();
  @Input() idCategoria: string;
  @Output() refresh = new EventEmitter();
  @Output() cancelar = new EventEmitter(); 
  


  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.idCategoria;
    console.log(this.idCategoria);
    this.getCategoria(this.idCategoria);
    

  }

  getCategoria(idCategoria) {
    this.categoriaService.getCategoriaByid(idCategoria).then((categoria: any) => {
      console.log(categoria);
      this.categoria = categoria.cnt[0];
    }).catch((err) => {
      console.log(err);
    })
  }

  updateCategoria(forma: NgForm) {
    this.categoriaService.putCategoria(this.idCategoria, this.categoria).then((resp: any) => {
      console.log(resp);
      Toast.fire({
        icon: 'success',
        title: `La categoria "${this.categoria.strNombre}", fue actualizada correctamente `
      }); 
      this.cancelar.emit(false);
      this.refresh.emit(true);
    }).catch((err) => {
      Toast.fire({
        icon: 'success',
        title: err.msg
      }); 
    });
  }

  updateCanceled() {
    this.cancelar.emit(false);
    
  }

}
