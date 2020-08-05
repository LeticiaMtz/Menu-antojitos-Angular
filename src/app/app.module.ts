import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { RegistrarCategoriaComponent } from './pages/categoria/registrar-categoria/registrar-categoria.component';
import { ActualizarCategoriaComponent } from './pages/categoria/actualizar-categoria/actualizar-categoria.component';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { PlatilloComponent } from './pages/platillo/platillo.component';
import { ActualizarPlatilloComponent } from './pages/platillo/actualizar-platillo/actualizar-platillo.component';
import { RegistrarPlatilloComponent } from './pages/platillo/registrar-platillo/registrar-platillo.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    RegistrarCategoriaComponent,
    ActualizarCategoriaComponent, 
    NavbarComponent,
    FooterComponent,
    PlatilloComponent,
    ActualizarPlatilloComponent,
    RegistrarPlatilloComponent,
 
  ],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
