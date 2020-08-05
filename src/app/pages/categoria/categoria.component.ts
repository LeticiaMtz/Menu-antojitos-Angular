import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';
import { ExportDataService } from 'src/app/services/excel/export-to-excel.service';
import { PdfServiceService } from 'src/app/services/PDF/pdf-service.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias: CategoriaModel[] = [];
  searchText: any;
  idCategoria: string;
  activo: boolean = true;
  actualizar: boolean = false;
  arrayCategoria: any[] = [];
  title: string;
  categoria: CategoriaModel = new CategoriaModel();
  
 
  

  constructor(private categoriaService: CategoriaService, private _PdfService: PdfServiceService, private _excelService: ExportDataService, private router: Router ) { }

  ngOnInit(): void {
    this.getCategorias();
    this.arrayCategoria = [];
    this.title = 'Reporte de categorias';

  }

  refresh(valor){
    if(valor){
      this.ngOnInit();
      console.log(valor)
    }
  }

  irPlatillos(){
    this.router.navigate(['/platillos']);


  }

  actualizarcancelar(valor: boolean){
    this.actualizar = valor;

  }

  getCategorias() {
    this.categoriaService.getCategoria().then((categorias: any) => {
      console.log(categorias)
      this.categorias = categorias.cnt;
      for (const categoria of this.categorias) {
        let element = [
          categoria.strNombre.replace(/\:null/gi,':""'),
          categoria.strDescripcion.replace(/\:null/gi,':""')
        ];
        this.arrayCategoria.push(element);
      }

    }).catch((err) => {
      Toast.fire({
        icon: 'success',
        title: err.msg
      });      
    })
  }

  actualizarCategoria(valor: boolean, idCategoria) {
    this.actualizar = valor; 
    this.idCategoria = idCategoria;
  }

  cambiarStatus(idCategoria: string){
    this.categoriaService.deleteCategoria(idCategoria).then((resp: any ) =>{
      console.log(resp);
      Toast.fire({
        icon: 'success',
        title: `El estatus de la categoria fue modificado correctamente `
      }); 
      this.ngOnInit();
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.msg
      }); 
      this.ngOnInit();
    });

  }
  cambiarStatusTrue(id: string){
    this.categoria.blnStatus = true;
    console.log(this.categoria);
    this.categoriaService.putCategoriaBlnStatus(id, this.categoria).then(res => {
      this.getCategorias();
      console.log(res);
    }).catch(err => {
      console.log(err.error.msg);
    });
  }
 
  cambiarStatusFalse(id: string){
    this.categoria.blnStatus = false;
    this.categoriaService.putCategoriaBlnStatus(id, this.categoria).then(res => {
      this.getCategorias();
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
        text: "Descripción",
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
      this.arrayCategoria,
      "center"
    );
  }

  exportAsXLSX(){
    console.log('Excel');
    
    if (this.categorias.length !== 0) {
      let jsonobject = JSON.stringify(this.categorias);
      jsonobject = jsonobject.replace(/strNombre/gi, 'Nombre');
      jsonobject = jsonobject.replace(/strDescripcion/gi, 'Descripcion');
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
