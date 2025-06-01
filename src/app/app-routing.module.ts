import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { EstudiosComponent } from './estudios/estudios.component';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import { ExperienciasComponent } from './experiencias/experiencias.component';

const routes: Routes = [
  {path: 'about', component: AboutMeComponent},
  {path: 'contact', component: ContactComponent,},
  {path: 'calculadora', component: CalculadoraComponent,},
  {path: 'estudios', component: EstudiosComponent,},
  {path: 'habilidades', component: HabilidadesComponent},
  {path: 'experiencias', component: ExperienciasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
