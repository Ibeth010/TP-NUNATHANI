import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Estado } from 'src/app/model/estado';
import { ActivatedRoute,  Params,  Router } from '@angular/router';
import { EstadoService } from 'src/app/service/estado.service';
import { CitaService } from 'src/app/service/cita.service';
import { Cita } from 'src/app/model/cita';
import * as moment from 'moment';

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
  idEstadoSelectionado: number = 0;
  idFechaSelecionada: number =0;


  constructor(private cS: CitaService,
    private router: Router,
    private route: ActivatedRoute, private eS:EstadoService) {
  }

  ngOnInit(): void {
    this.eS.list().subscribe(data => { this.lista = data });
    this.route.params.subscribe((data:Params)=>{
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      });
    this.form = new FormGroup({
      idCita: new FormControl(),
      fechaCita: new FormControl(),
      estado: new FormControl()
    });
  }

  aceptar(): void {
    this.cita.idCita = this.form.value['idCita'];
    this.cita.fechaCita = this.form.value['fechaCita'];
    this.cita.estado.dispEstado=this.form.value['estado.dispEstado'];
    
    if (Object.values(this.form.value).every(val => !val)) {
      this.mensaje = 'Debe rellenar los datos obligatoriamente';
      return;
    }

if (!this.form.value['fechaCita'] || this.form.value['fechaCita'].length === 0) {
  this.mensaje = 'Seleccione una fecha';
  return;
}

    if (this.idEstadoSelectionado > 0) {
      let e = new Estado();
      e.idEstado = this.idEstadoSelectionado;
      this.cita.estado=e;
      this.cS.insert(this.cita).subscribe(() => {
      this.cS.list().subscribe(data => {
            this.cS.setList(data);
          })
        })

      this.router.navigate(['citas']);
    }else{
      this.mensaje= "Seleccione un estado";
    }

  }
  init() {
    if (this.edicion) {
      this.cS.listIdCita(this.id).subscribe(data => {
        this.form = new FormGroup({
          idCita: new FormControl(data.idCita),
          fechaCita: new FormControl(data.fechaCita),
        });
      });
    }
  }

}
