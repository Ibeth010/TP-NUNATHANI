import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialidadComponent } from './component/especialidad/especialidad.component';
import { EspecialidadInsertarComponent } from './component/especialidad/especialidad-insertar/especialidad-insertar.component';


import { EstadoInsertarComponent } from './component/estado/estado-insertar/estado-insertar.component';
import { EstadoComponent } from './component/estado/estado.component';

import { UsuarioComponent } from './component/usuario/usuario.component';
import { UsuarioInsertarComponent } from './component/usuario/usuario-insertar/usuario-insertar.component';

import { DisponibilidadInsertarComponent } from './component/disponibilidad/disponibilidad-insertar/disponibilidad-insertar.component';
import { DisponibilidadComponent } from './component/disponibilidad/disponibilidad.component';

import { Rutinas_recreativasInsertarComponent } from './component/rutinas_recreativas/rutinas_recreativas-insertar/rutinas_recreativas-insertar.component';
import { Rutinas_recreativasComponent } from './component/rutinas_recreativas/rutinas_recreativas.component';
import { TratamientoComponent } from './component/tratamiento/tratamiento.component';
import { TratamientoInsertarComponent } from './component/tratamiento/tratamiento-insertar/tratamiento-insertar.component';
import { PacienteComponent } from './component/paciente/paciente.component';
import { PacienteInsertarComponent } from './component/paciente/paciente-insertar/paciente-insertar.component';
import { TestComponent } from './component/test/test.component';
import { TestInsertarComponent } from './component/test/test-insertar/test-insertar.component';
import { CitaComponent } from './component/cita/cita.component';
import { CitaInsertarComponent } from './component/cita/cita-insertar/cita-insertar.component';
import { PsicologoComponent } from './component/psicologo/psicologo.component';
import { PsicologoInsertarComponent } from './component/psicologo/psicologo-insertar/psicologo-insertar.component';

import { InformeComponent } from './component/informe/informe.component';
import { InformeInsertarComponent } from './component/informe/informe-insertar/informe-insertar.component';
import { PreguntaComponent } from './component/pregunta/pregunta.component';
import { PreguntaInsertarComponent } from './component/pregunta/pregunta-insertar/pregunta-insertar.component';
import { OpcionComponent } from './component/opcion/opcion.component';
import { OpcionInsertarComponent } from './component/opcion/opcion-insertar/opcion-insertar.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { LoginComponent } from './component/login/login.component';
import { ReportesComponent } from './component/reportes/reportes.component';
import { ReporteTratamientoComponent } from './component/reportes/reporte-tratamiento/reporte-tratamiento.component';
import { ReportefechasPacienteComponent } from './component/reportes/reportefechas-paciente/reportefechas-paciente.component';
import { ReporteTestComponent } from './component/reportes/reporte-test/reporte-test.component';
import { ReporteInformeComponent } from './component/reportes/reporte-informe/reporte-informe.component';
import { ReporteFechaPacienteComponent } from './component/reportes/reporte-fecha-paciente/reporte-fecha-paciente.component';
import { ReporteBuscarPacienteFechaComponent } from './component/reportes/reporte-buscar-paciente-fecha/reporte-buscar-paciente-fecha.component';

const routes: Routes = [
  {
    path: 'especialidad',
    component: EspecialidadComponent,
    children: [
      {
        path: 'especialidadesinsertar',component: EspecialidadInsertarComponent},
      {path: 'edicion/:id',component: EspecialidadInsertarComponent},

    ],
  },
  
  {
    path: 'estados',component: EstadoComponent,children: [
      {path: 'estadoinsertar', component: EstadoInsertarComponent},
      {path: 'edicion/:id', component: EstadoInsertarComponent},
    ]
  },

  {path: 'citas',component: CitaComponent, children:[
    {path: 'nuevo',component: CitaInsertarComponent},
    {path: 'edicion/:id',component:CitaInsertarComponent},
  ]
 },
 {
  path: 'preguntas',component: PreguntaComponent,children: [
    {path: 'nuevo',component: PreguntaInsertarComponent},
    {path: 'edicion/:id',component: PreguntaInsertarComponent},

  ],
},
  
  {
    path:'usuario',
    component:UsuarioComponent,
    children: [
      {path: 'usuario-insertar', component: UsuarioInsertarComponent},
      {path: 'edicion/:id', component: UsuarioInsertarComponent},
    ],
  }, 
  {
    path:'paciente',
    component:PacienteComponent,
    children: [
      {path: 'paciente-insertar', component: PacienteInsertarComponent},
      {path: 'edicion/:id', component: PacienteInsertarComponent},
    ],
  }, 
  {
    path:'test',
    component:TestComponent,
    children: [
      {path: 'test-insertar', component: TestInsertarComponent},
      {path: 'edicion/:id', component: TestInsertarComponent},
    ],
  },
 {
    path: 'disponibilidad',
    component: DisponibilidadComponent
    ,
    children: [
      {path: 'disponibilidadesinsertar', component: DisponibilidadInsertarComponent},
      {path: 'edicion/:id', component: DisponibilidadInsertarComponent},
    ],
  },
  {
    path: 'rutinas_recreativas',
    component: Rutinas_recreativasComponent
    ,
    children: [
      {path: 'rutinas_recreativasinsertar', component: Rutinas_recreativasInsertarComponent},
      {path: 'edicion/:id', component: Rutinas_recreativasInsertarComponent},
    ],
  },

  {
    path: 'tratamientos',
    component: TratamientoComponent
    ,
    children: [
      {path: 'tratamientosinsertar', component: TratamientoInsertarComponent},
      {path: 'edicion/:id', component: TratamientoInsertarComponent},
    ],
  },
  {
    path: 'psicologo',
    component: PsicologoComponent
    ,
    children: [
      {path: 'psicologosinsertar', component: PsicologoInsertarComponent},
      {path: 'edicion/:id', component: PsicologoInsertarComponent},
    ],
  },

  {
    path: 'informes',
    component: InformeComponent
    ,
    children: [
      {path: 'informesinsertar', component: InformeInsertarComponent},
      {path: 'edicion/:id', component: InformeInsertarComponent},
    ],
  },
  {
    path: 'opciones',
    component: OpcionComponent
    ,
    children: [
      {path: 'opcionesinsertar', component: OpcionInsertarComponent},
      {path: 'edicion/:id', component: OpcionInsertarComponent},
    ],
  },
  {
    path: 'side-nav', component:SideNavComponent
  },
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  
  {
    path: 'reportes',
    component: ReportesComponent
    ,
    children: [
      {path: 'rutina-count-tratamiento', component: ReporteTratamientoComponent},
      {path: 'nombre-fecha', component: ReportefechasPacienteComponent},
      {path: 'pregunta-test', component: ReporteTestComponent},
      {path: 'informe-tratamiento', component: ReporteInformeComponent},
      {path: 'buscar-fecha', component: ReporteFechaPacienteComponent},
      {path: 'buscar-cita-fecha', component: ReporteBuscarPacienteFechaComponent},
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
