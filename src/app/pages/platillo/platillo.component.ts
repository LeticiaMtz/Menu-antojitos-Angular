import { Component, OnInit } from '@angular/core';
import { PlatilloModel } from 'src/app/models/platillo.model';
import { PlatilloService } from 'src/app/services/platillo.service';
import Swal from 'sweetalert2';
import { ExportDataService } from 'src/app/services/excel/export-to-excel.service';
import { PdfServiceService } from 'src/app/services/PDF/pdf-service.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CategoriaModel } from 'src/app/models/categoria.model';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-platillo',
  templateUrl: './platillo.component.html',
  styleUrls: ['./platillo.component.css']
})
export class PlatilloComponent implements OnInit {

  platillos: PlatilloModel[] = [];
  categorias: CategoriaModel[] = [];
  searchText: any;
  idPlatillo: string;
  activo: boolean = true;
  actualizar: boolean = false;
  arrayPlatillo: any[] = [];
  title: string;
  platillo: PlatilloModel = new PlatilloModel();
 
  

  constructor(private platilloService: PlatilloService, private categoriaService: CategoriaService, private _PdfService: PdfServiceService, private _excelService: ExportDataService ) { }

  ngOnInit(): void {
    this.getPlatillos();
    this.arrayPlatillo = [];
    this.title = 'Reporte de platillos';

  }

  refresh(valor){
    if(valor){
      this.ngOnInit();
      console.log(valor)
    }
  }

  actualizarcancelar(valor: boolean){
    this.actualizar = valor;

  }

  getPlatillos() {
    this.platilloService.getPlatillo().then((platillos: any) => {
      console.log(platillos.cnt)
      this.platillos = platillos.cnt;
      for (const platillo of this.platillos) {
        let element = [
          platillo.idCategoria,
          platillo.strNombre,
          platillo.strDescripcion,
          platillo.strIngredientes,
          platillo.nmbPiezas,
          platillo.nmbPrecio
        ];
        this.arrayPlatillo.push(element);
      }

    }).catch((err) => {
      Toast.fire({
        icon: 'success',
        title: err.msg
      });      
    })
  }

  actualizarPlatillo(valor: boolean, idPlatillo) {
    this.actualizar = valor; 
    this.idPlatillo = idPlatillo;
  }

  cambiarStatusTrue(id: string){
    this.platillo.blnStatus = true;
    console.log(this.platillo);
    this.platilloService.putPlatilloBlnStatus(id, this.platillo).then(res => {
      this.getPlatillos();
      console.log(res);
    }).catch(err => {
      console.log(err.error.msg);
    });
  }
 
  cambiarStatusFalse(id: string){
    this.platillo.blnStatus = false;
    this.platilloService.putPlatilloBlnStatus(id, this.platillo).then(res => {
      this.getPlatillos();
      console.log(res);
    }).catch(err => {
      console.log(err.error.msg);
    });
  }



  exportPDF() {
    console.log('pdf');
    
    let header = [
      {
        text: "Categoria",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Platillo",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Descripción",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Ingredientes",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Piezas",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Precio",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      }

    ];
    this._PdfService.generatePdf(
      this.title,
      header,
      this.arrayPlatillo,
      "center", 
      "landscape"
    );
  }

  exportAsXLSX(){
    console.log('Excel');
    
    if (this.platillos.length !== 0) {
      let jsonobject = JSON.stringify(this.platillos);
      jsonobject = jsonobject.replace(/idCategoria/gi, 'Categoria');
      jsonobject = jsonobject.replace(/strNombre/gi, 'Nombre');
      jsonobject = jsonobject.replace(/strDescripcion/gi, 'Descripcion');
      jsonobject = jsonobject.replace(/strIngredientes/gi, 'Ingredientes');
      jsonobject = jsonobject.replace(/nmbPiezas/gi, 'Piezas');
      jsonobject = jsonobject.replace(/nmbPrecio/gi, 'Precio');
      const jsonobject2 = JSON.parse(jsonobject);
      const count = Object.keys(jsonobject2).length;
      for (let i = 0; i < count; i++) {
        delete jsonobject2[i].created_at;
        delete jsonobject2[i].updated_at;
        delete jsonobject2[i].blnStatus;
        delete jsonobject2[i]._id;
        delete jsonobject2[i].__v;
      }
      this._excelService.exportAsExcelFile(jsonobject2, `${this.title}`);
    }
  }


}