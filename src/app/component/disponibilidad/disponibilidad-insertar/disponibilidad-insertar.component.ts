import { DisponibilidadService } from 'src/app/service/disponibilidad.service';
import { Disponibilidad } from 'src/app/model/disponibilidad';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-disponibilidad-insertar',
  templateUrl: './disponibilidad-insertar.component.html',
  styleUrls: ['./disponibilidad-insertar.component.css'],
})

export class DisponibilidadInsertarComponent implements OnInit {
  id: number = 0;
  edicion: boolean = false;

  form: FormGroup = new FormGroup({});
  disponibilidad: Disponibilidad = new Disponibilidad();
  mensaje: string = '';

  //maxFecha: Date = moment().add(-1, 'days').toDate();
  constructor(private dS: DisponibilidadService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      idDisponibilidad: new FormControl(),
      inicio_turno: new FormControl(),
      fin_turno: new FormControl(),
      dias_laborables: new FormControl(),
    });
  }
  aceptar(): void {
    this.disponibilidad.idDisponibilidad = this.form.value['idDisponibilidad'];
    this.disponibilidad.inicio_turno = this.form.value['inicio_turno'];
    this.disponibilidad.fin_turno = this.form.value['fin_turno'];
    this.disponibilidad.dias_laborables = this.form.value['dias_laborables'];


  
  if (this.form.status=="INVALID") {
    this.mensaje = 'Ingrese todos los campos';
    return;
  }
  if (this.form.value['inicio_turno'].length > 0) {
    if (this.edicion) {
      //guardar lo actualizado
      this.dS.update(this.disponibilidad).subscribe(() => {
        this.dS.list().subscribe((data) => {
          this.dS.setList(data);
        });
      });}
     else{
      this.dS.insert(this.disponibilidad).subscribe((data) => {
        this.dS.list().subscribe((data) => {
          this.dS.setList(data);
        });
      });
     }

    this.router.navigate(['disponibilidad']);
  }

}

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idDisponibilidad: new FormControl(data.idDisponibilidad),
          inicio_turno: new FormControl(data.inicio_turno),
          fin_turno: new FormControl(data.fin_turno),
          dias_laborables: new FormControl(data.dias_laborables),
        });
        console.log(data);
      });
    }
  }
}
