import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlatilloModel } from 'src/app/models/platillo.model';
import { NgForm } from '@angular/forms';
import { PlatilloService } from 'src/app/services/platillo.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-actualizar-platillo',
  templateUrl: './actualizar-platillo.component.html',
  styleUrls: ['./actualizar-platillo.component.css']
})
export class ActualizarPlatilloComponent implements OnInit {

  platillo: PlatilloModel = new PlatilloModel();
  @Input() idPlatillo: string;
  @Output() refresh = new EventEmitter();
  @Output() cancelar = new EventEmitter(); 
  


  constructor(private platilloService: PlatilloService) { }

  ngOnInit(): void {
    this.idPlatillo;
    console.log(this.idPlatillo);
    this.getPlatillo(this.idPlatillo);
    

  }

  getPlatillo(idPlatillo) {
    this.platilloService.getPlatilloByid(idPlatillo).then((platillo: any) => {
      console.log(platillo);
      this.platillo = platillo.cnt[0];
    }).catch((err) => {
      console.log(err);
    })
  }

  updatePlatillo(forma: NgForm) {
    this.platilloService.putPlatillo(this.idPlatillo, this.platillo).then((resp: any) => {
      console.log(resp);
      Toast.fire({
        icon: 'success',
        title: `El platillo "${this.platillo.strNombre}", fue actualizado correctamente `
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
