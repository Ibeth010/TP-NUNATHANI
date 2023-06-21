import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Pregunta } from 'src/app/model/pregunta';
import { Test } from 'src/app/model/test';
import { ActivatedRoute,  Params,  Router } from '@angular/router';


import * as moment from 'moment';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { TestService } from 'src/app/service/test.service';
@Component({
  selector: 'app-pregunta-insertar',
  templateUrl: './pregunta-insertar.component.html',
  styleUrls: ['./pregunta-insertar.component.css']
})
export class PreguntaInsertarComponent implements OnInit{
  id:number=0;
  edicion: boolean = false;
  
  form: FormGroup = new FormGroup({});
  pregunta: Pregunta = new Pregunta()
  mensaje: string = ""
  maxFecha: Date = moment().add(-1, 'days').toDate();

  lista: Test[] = [];
  idTestSelectionada: number = 0;
  preguntaSeleccionada: number =0;

  constructor(private pS: PreguntaService,
    private router: Router,
    private route: ActivatedRoute, private tS:TestService) {
  }
  ngOnInit(): void {
    this.tS.list().subscribe(data => { this.lista = data });
    this.route.params.subscribe((data:Params)=>{
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      });
    this.form = new FormGroup({
      idPregunta: new FormControl(),
      txtPregunta: new FormControl(),
      test: new FormControl()
    });
  }

  aceptar(): void {
    this.pregunta.idPregunta = this.form.value['idPregunta'];
    this.pregunta.txtPregunta = this.form.value['txtPregunta'];
    this.pregunta.test.idtest=this.form.value['test.idtest'];
    
    if (Object.values(this.form.value).every(val => !val)) {
      this.mensaje = 'Debe rellenar los datos obligatoriamente';
      return;
    }
    if (!this.form.value['txtPregunta'] || this.form.value['txtPregunta'].length === 0) {
      this.mensaje = 'Ingrese una pregunta';
      return;
    }

    if (this.idTestSelectionada > 0) {
      let t = new Test();
      t.idtest = this.idTestSelectionada;
      this.pregunta.test=t;
      this.pS.insert(this.pregunta).subscribe(() => {
      this.pS.list().subscribe(data => {
            this.pS.setList(data);
          })
        })

      this.router.navigate(['preguntas']);
    }else{
      this.mensaje= "Seleccione un paciente";
    }



  }
  
  init() {
    if (this.edicion) {
      this.pS.listIdPregunta(this.id).subscribe(data => {
        this.form = new FormGroup({
          idPregunta: new FormControl(data.idPregunta),
          txtPregunta: new FormControl(data.txtPregunta),
        });
      });
    }
  }

}
