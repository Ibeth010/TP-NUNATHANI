import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Estado } from 'src/app/model/estado';
import { ActivatedRoute,  Params,  Router } from '@angular/router';
import { EstadoService } from 'src/app/service/estado.service';
import { CitaService } from 'src/app/service/cita.service';
import { Cita } from 'src/app/model/cita';
import * as moment from 'moment';
import { Paciente } from 'src/app/model/paciente';
import { Psicologo } from 'src/app/model/psicologo';
import { PsicologoService } from 'src/app/service/psicologo.service';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-cita-insertar',
  templateUrl: './cita-insertar.component.html',
  styleUrls: ['./cita-insertar.component.css']
})
export class CitaInsertarComponent implements OnInit{
  id:number=0;
  edicion: boolean = false;
  
  form: FormGroup = new FormGroup({});
  cita: Cita = new Cita()
  mensaje: string = ""
  maxFecha: Date = moment().add(-1, 'days').toDate();

  lista: Estado[] = [];
  listaPsico: Psicologo[]=[];
  listaPaci:Paciente[]=[];
  idEstadoSelectionado: number = 0;
  idPsicologoSeleccionado: number=0;
  idPacienteSeleccionado: number=0;


  constructor(private cS: CitaService,
    private router: Router,
    private route: ActivatedRoute, private eS:EstadoService, private psS:PsicologoService, private paS:PacienteService) {
  }

  ngOnInit(): void {
    this.eS.list().subscribe(data => { this.lista = data });
    this.psS.list().subscribe(data => { this.listaPsico = data });
    this.paS.list().subscribe(data => { this.listaPaci = data });
    this.route.params.subscribe((data:Params)=>{
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      });
    this.form = new FormGroup({
      idCita: new FormControl(),
      fechaCita: new FormControl(),
      estado: new FormControl(),
      psicologo: new FormControl(),
      paciente: new FormControl()  
    });
  }

  aceptar(): void {
    this.cita.idCita = this.form.value['idCita'];
    this.cita.fechaCita = this.form.value['fechaCita'];
    this.cita.estado.dispEstado=this.form.value['estado.dispEstado'];
    this.cita.psicologo.idPsicologo=this.form.value['psicologo.idPsicologo']
    this.cita.paciente.idpaciente=this.form.value['paciente.idpaciente']
    

    if (Object.values(this.form.value).every(val => !val)) {
      this.mensaje = 'Debe rellenar los datos obligatoriamente';
      return;
    }

    if (!this.form.value['fechaCita'] || this.form.value['fechaCita'].length === 0) {
      this.mensaje = 'Seleccione una fecha';
      return;
    }

    if (this.idEstadoSelectionado > 0 && this.idPsicologoSeleccionado  > 0  && this.idPacienteSeleccionado > 0) {

      let e = new Estado();
      let ps = new Psicologo();
      let pa = new Paciente();

      e.idEstado = this.idEstadoSelectionado;
      ps.idPsicologo=this.idPsicologoSeleccionado;
      pa.idpaciente=this.idPacienteSeleccionado;

      this.cita.estado=e;
      this.cita.psicologo=ps;
      this.cita.paciente=pa;

      this.cS.insert(this.cita).subscribe(() => {
      this.cS.list().subscribe(data => {
            this.cS.setList(data);
          })
        })

      this.router.navigate(['citas']);
  }else{
    this.mensaje= "Seleccione los campos requeridos"
  }

  }
  init() {
    if (this.edicion) {
      this.cS.listIdCita(this.id).subscribe(data => {
        this.form = new FormGroup({
          idCita: new FormControl(data.idCita),
          fechaCita: new FormControl(data.fechaCita),
          estado:new FormControl(data.estado.dispEstado),
          psicologo: new FormControl(data.psicologo.especialidad.tipoEspecialidad),
          paciente: new FormControl(data.paciente.usuario.nameusuario)
        });
      });
    }
  }

}
