import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EspecialidadListarComponent } from './component/especialidad/especialidad-listar/especialidad-listar.component';
import { EspecialidadComponent } from './component/especialidad/especialidad.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { EspecialidadInsertarComponent } from './component/especialidad/especialidad-insertar/especialidad-insertar.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { EspecialidadDialogoComponent } from './component/especialidad/especialidad-listar/especialidad-dialogo/especialidad-dialogo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { HeaderComponent } from './component/header/header.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { EstadoDialogoComponent } from './component/estado/estado-listar/estado-dialogo/estado-dialogo.component';
import { EstadoInsertarComponent } from './component/estado/estado-insertar/estado-insertar.component'
import { EstadoComponent } from './component/estado/estado.component';
import { EstadoListarComponent } from './component/estado/estado-listar/estado-listar.component';

import { UsuarioComponent } from './component/usuario/usuario.component';
import { UsuarioListarComponent } from './component/usuario/usuario-listar/usuario-listar.component';
import { UsuarioInsertarComponent } from './component/usuario/usuario-insertar/usuario-insertar.component';
import { UsuarioDialogoComponent } from './component/usuario/usuario-listar/usuario-dialogo/usuario-dialogo.component';

import { DisponibilidadComponent } from './component/disponibilidad/disponibilidad.component';
import { DisponibilidadListarComponent } from './component/disponibilidad/disponibilidad-listar/disponibilidad-listar.component';
import { DisponibilidadInsertarComponent } from './component/disponibilidad/disponibilidad-insertar/disponibilidad-insertar.component';
import { DisponibilidadDialogoComponent } from './component/disponibilidad/disponibilidad-listar/disponibilidad-dialogo/disponibilidad-dialogo.component';

import { Rutinas_recreativasComponent } from './component/rutinas_recreativas/rutinas_recreativas.component';
import { Rutinas_recreativasListarComponent } from './component/rutinas_recreativas/rutinas_recreativas-listar/rutinas_recreativas-listar.component';
import { Rutinas_recreativasInsertarComponent } from './component/rutinas_recreativas/rutinas_recreativas-insertar/rutinas_recreativas-insertar.component';
import { Rutinas_recreativasDialogoComponent } from './component/rutinas_recreativas/rutinas_recreativas-listar/rutinas-recreativas-dialogo/rutinas-recreativas-dialogo.component';
import { TratamientoComponent } from './component/tratamiento/tratamiento.component';
import { TratamientoInsertarComponent } from './component/tratamiento/tratamiento-insertar/tratamiento-insertar.component';
import { TratamientoDialogoComponent } from './component/tratamiento/tratamiento-listar/tratamiento-dialogo/tratamiento-dialogo.component';
import { TratamientoListarComponent } from './component/tratamiento/tratamiento-listar/tratamiento-listar.component';

import { PacienteComponent } from './component/paciente/paciente.component';
import { PacienteListarComponent } from './component/paciente/paciente-listar/paciente-listar.component';
import { PacienteDialogoComponent } from './component/paciente/paciente-listar/paciente-dialogo/paciente-dialogo.component';
import { PacienteInsertarComponent } from './component/paciente/paciente-insertar/paciente-insertar.component';
import { TestComponent } from './component/test/test.component';
import { TestListarComponent } from './component/test/test-listar/test-listar.component';
import { TestDialogoComponent } from './component/test/test-listar/test-dialogo/test-dialogo.component';
import { TestInsertarComponent } from './component/test/test-insertar/test-insertar.component';
import { CitaComponent } from './component/cita/cita.component';
import { CitaListarComponent } from './component/cita/cita-listar/cita-listar.component';
import { CitaInsertarComponent } from './component/cita/cita-insertar/cita-insertar.component';
import { CitaDialogoComponent } from './component/cita/cita-listar/cita-dialogo/cita-dialogo.component';

import { InformeComponent } from './component/informe/informe.component';
import { InformeListarComponent } from './component/informe/informe-listar/informe-listar.component';
import { InformeDialogoComponent } from './component/informe/informe-listar/informe-dialogo/informe-dialogo.component';
import { InformeInsertarComponent } from './component/informe/informe-insertar/informe-insertar.component';

import { PsicologoComponent } from './component/psicologo/psicologo.component';
import { PsicologoListarComponent } from './component/psicologo/psicologo-listar/psicologo-listar.component';
import { PsicologoInsertarComponent } from './component/psicologo/psicologo-insertar/psicologo-insertar.component';
import { PsicologoDialogoComponent } from './component/psicologo/psicologo-listar/psicologo-dialogo/psicologo-dialogo.component';
import { PreguntaComponent } from './component/pregunta/pregunta.component';
import { PreguntaListarComponent } from './component/pregunta/pregunta-listar/pregunta-listar.component';
import { PreguntaDialogoComponent } from './component/pregunta/pregunta-listar/pregunta-dialogo/pregunta-dialogo.component';
import { PreguntaInsertarComponent } from './component/pregunta/pregunta-insertar/pregunta-insertar.component';
import { OpcionComponent } from './component/opcion/opcion.component';
import { OpcionListarComponent } from './component/opcion/opcion-listar/opcion-listar.component';
import { OpcionInsertarComponent } from './component/opcion/opcion-insertar/opcion-insertar.component';
import { OpcionDialogoComponent } from './component/opcion/opcion-listar/opcion-dialogo/opcion-dialogo.component';
import { LoginComponent } from './component/login/login.component';
import { ReportesComponent } from './component/reportes/reportes.component';
import { ReporteTratamientoComponent } from './component/reportes/reporte-tratamiento/reporte-tratamiento.component';
import { ReportefechasPacienteComponent } from './component/reportes/reportefechas-paciente/reportefechas-paciente.component';
import { ReporteTestComponent } from './component/reportes/reporte-test/reporte-test.component';
import { ReporteInformeComponent } from './component/reportes/reporte-informe/reporte-informe.component';
import { ReporteFechaPacienteComponent } from './component/reportes/reporte-fecha-paciente/reporte-fecha-paciente.component';
import { ReporteBuscarPacienteFechaComponent } from './component/reportes/reporte-buscar-paciente-fecha/reporte-buscar-paciente-fecha.component';
import { AppRutinasRecreativasRecomendacionVistaComponent } from './component/rutinas_recreativas/rutinas_recreativas-listar/app-rutinas-recreativas-recomendacion-vista/app-rutinas-recreativas-recomendacion-vista.component';
import { ReporteCorreoComponent } from './component/reportes/reporte-correo/reporte-correo.component';
import { ReporteEspecialidadComponent } from './component/reportes/reporte-especialidad/reporte-especialidad.component';
import { ReporteTemaComponent } from './component/reportes/reporte-tema/reporte-tema.component';
import { ReporteResultadoComponent } from './component/reportes/reporte-resultado/reporte-resultado.component';
@NgModule({
  declarations: [
    AppComponent,
    EspecialidadListarComponent,
    EspecialidadComponent,
    EspecialidadInsertarComponent,
    EspecialidadDialogoComponent,

    
    EstadoComponent,
    EstadoListarComponent,
    EstadoInsertarComponent,
    EstadoDialogoComponent,
    
    UsuarioComponent,
    UsuarioListarComponent,
    UsuarioInsertarComponent,
    UsuarioDialogoComponent,
    
    DisponibilidadComponent,
    DisponibilidadListarComponent,
    DisponibilidadInsertarComponent,
    DisponibilidadDialogoComponent, 

    Rutinas_recreativasComponent,
    Rutinas_recreativasListarComponent,
    Rutinas_recreativasInsertarComponent,
    Rutinas_recreativasDialogoComponent,
    
    HeaderComponent,
    SideNavComponent,
    TratamientoComponent,
    TratamientoInsertarComponent,
    TratamientoDialogoComponent,
    TratamientoListarComponent,

    PacienteComponent,
    PacienteListarComponent,
    PacienteDialogoComponent,
    PacienteInsertarComponent,
    TestComponent,
    TestListarComponent,
    TestDialogoComponent,
    TestInsertarComponent,
    CitaComponent,
    CitaListarComponent,
    CitaInsertarComponent,
    CitaDialogoComponent,

    InformeComponent,
    InformeListarComponent,
    InformeDialogoComponent,
    InformeInsertarComponent,

    PsicologoComponent,
    PsicologoListarComponent,
    PsicologoInsertarComponent,
    PsicologoDialogoComponent,
    PreguntaComponent,
    PreguntaListarComponent,
    PreguntaDialogoComponent,
    PreguntaInsertarComponent,
    OpcionComponent,
    OpcionListarComponent,
    OpcionInsertarComponent,
    OpcionDialogoComponent,
    LoginComponent,
    ReportesComponent,
    ReporteTratamientoComponent,
    ReportefechasPacienteComponent,
    ReporteTestComponent,
    ReporteInformeComponent,
    ReporteFechaPacienteComponent,
    ReporteBuscarPacienteFechaComponent,
    AppRutinasRecreativasRecomendacionVistaComponent,
    ReporteCorreoComponent,
    ReporteEspecialidadComponent,
    ReporteTemaComponent,
    ReporteResultadoComponent,
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSnackBarModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
