import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Pregunta } from 'src/app/model/pregunta';
import { Opcion } from 'src/app/model/opcion';
import { ActivatedRoute,  Params,  Router } from '@angular/router';


import { PreguntaService } from 'src/app/service/pregunta.service';
import { OpcionService } from 'src/app/service/opcion.service';

@Component({
  selector: 'app-opcion-insertar',
  templateUrl: './opcion-insertar.component.html',
  styleUrls: ['./opcion-insertar.component.css']
})
export class OpcionInsertarComponent implements OnInit{
  id:number=0;
  edicion: boolean = false;
  
  form: FormGroup = new FormGroup({});
  opcion: Opcion = new Opcion()
  mensaje: string = ""

  lista: Pregunta[] = [];
  idPreguntaSelectionada: number = 0;

  constructor(private oS: OpcionService,
    private router: Router,
    private route: ActivatedRoute, private pS:PreguntaService) {
  }
  ngOnInit(): void {

    this.pS.list().subscribe(data => { this.lista = data });
    this.route.params.subscribe((data:Params)=>{
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      });
    this.form = new FormGroup({
      idOpcion: new FormControl(),
      descripcionOpcion: new FormControl(),
      pregunta: new FormControl()
    });
  }

  aceptar(): void {
    this.opcion.idOpcion = this.form.value['idOpcion'];
    this.opcion.descripcionOpcion = this.form.value['descripcionOpcion'];
    this.opcion.pregunta.txtPregunta=this.form.value['txtPregunta'];
    
    if (Object.values(this.form.value).every(val => !val)) {
      this.mensaje = 'Debe rellenar los datos obligatoriamente';
      return;
    }
    if (!this.form.value['descripcionOpcion'] || this.form.value['descripcionOpcion'].length === 0) {
      this.mensaje = 'Ingrese una descripcion';
      return;
    }

    if (this.idPreguntaSelectionada > 0) {
      let p = new Pregunta();
      p.idPregunta = this.idPreguntaSelectionada;
      this.opcion.pregunta=p;
      this.oS.insert(this.opcion).subscribe(() => {
      this.oS.list().subscribe(data => {
            this.oS.setList(data);
          })
        })

      this.router.navigate(['opciones']);
    }else{
      this.mensaje= "Seleccione una opcion";
    }



  }
  
  init() {
    if (this.edicion) {
      this.oS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          idOpcion: new FormControl(data.idOpcion),
          descripcionOpcion: new FormControl(data.descripcionOpcion),
        });
        console.log(data);
      });
    }
  }

}

