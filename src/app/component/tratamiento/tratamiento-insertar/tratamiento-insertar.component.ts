import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Rutinas_recreativas } from 'src/app/model/rutinas_recreativas';
import { Tratamiento } from 'src/app/model/tratamiento';
import { Rutinas_recreativasService } from 'src/app/service/rutinas_recreativas.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';


@Component({
  selector: 'app-tratamiento-insertar',
  templateUrl: './tratamiento-insertar.component.html',
  styleUrls: ['./tratamiento-insertar.component.css']
})
export class TratamientoInsertarComponent implements OnInit{
  id: number = 0;
  edicion: boolean = false;
  form: FormGroup = new FormGroup({});
  tratamiento: Tratamiento = new Tratamiento();
  mensaje: string = '';
  lista: Rutinas_recreativas[]=[];
  idRutinas_recreativasSeleccionado: number=0;

  constructor(private tS: TratamientoService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private rS:Rutinas_recreativasService) {}
  ngOnInit(): void {
    this.rS.list().subscribe(data => { this.lista = data});
    this.route.params.subscribe((data:Params)=>{
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      });
    this.form = new FormGroup({
      idTratamiento: new FormControl(),
      temaTratamiento: new FormControl(),
      descripcionTratamiento: new FormControl(),
      rutinas_recreativas: new FormControl()
    });
  }
  aceptar(): void {
    this.tratamiento.idTratamiento = this.form.value['idTratamiento'];
    this.tratamiento.temaTratamiento = this.form.value['temaTratamiento'];
    this.tratamiento.descripcionTratamiento = this.form.value['descripcionTratamiento'];
    this.tratamiento.rutinas_recreativas.nombre = this.form.value['rutinas_recreativas.nombre'];

    if(this.idRutinas_recreativasSeleccionado>0){
      let r = new Rutinas_recreativas();
      r.id=this.idRutinas_recreativasSeleccionado;
      this.tratamiento.rutinas_recreativas=r;
      this.tS.insert(this.tratamiento).subscribe(() => {
        this.tS.list().subscribe(data => {
              this.tS.setList(data);
            })
          })
  
        this.router.navigate(['tratamientos']);

    }
  // Verificar si todos los campos están vacíos
  if (Object.values(this.form.value).every(val => !val)) {
    this.mensaje = 'Debe rellenar los datos obligatoriamente';
    return;
  }
  } 

  init() {
    if (this.edicion) {
      this.tS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          idTratamiento: new FormControl(data.idTratamiento),
          temaTratamiento: new FormControl(data.temaTratamiento),
          descripcionTratamiento: new FormControl(data.descripcionTratamiento),
          rutinas_recreativas: new FormControl(data.rutinas_recreativas),

        });
      });
    }
  }

}
