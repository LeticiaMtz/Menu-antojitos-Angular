import { Component, OnInit, Output,  EventEmitter } from '@angular/core';
import { CategoriaModel } from 'src/app/models/categoria.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria.service';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-registrar-categoria',
  templateUrl: './registrar-categoria.component.html',
  styleUrls: ['./registrar-categoria.component.css']
})
export class RegistrarCategoriaComponent implements OnInit {
  categoria: CategoriaModel = new CategoriaModel();
  @Output() refresh = new EventEmitter();

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
  }

  saveCategoria(forma: NgForm) {
    this.categoriaService.postCategoria(this.categoria).then((resp) => {
      console.log(resp);
      Toast.fire({
        icon: 'success',
        title: 'Categoria registrada correctamente'
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
