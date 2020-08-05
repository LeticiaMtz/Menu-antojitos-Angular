import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { PlatilloComponent } from './pages/platillo/platillo.component';


const routes: Routes = [
  { path: 'categorias', component: CategoriaComponent },
  {path: 'platillos', component: PlatilloComponent},
  { path: '**', component: CategoriaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
