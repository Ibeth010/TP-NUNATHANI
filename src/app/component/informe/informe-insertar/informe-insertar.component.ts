import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Informe } from 'src/app/model/informe';
import { Test } from 'src/app/model/test';
import { Tratamiento } from 'src/app/model/tratamiento';
import { InformeService } from 'src/app/service/informe.service';
import { TestService } from 'src/app/service/test.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';

@Component({
  selector: 'app-informe-insertar',
  templateUrl: './informe-insertar.component.html',
  styleUrls: ['./informe-insertar.component.css']
})
export class InformeInsertarComponent implements OnInit {

  id: number = 0;
  editar: boolean = false;
  listaTest: Test[] = [];
  listaTratamiento: Tratamiento[] = [];
  idSeleccionadoTest: number = 0;
  idSeleccionadoTratamiento: number = 0;

  form: FormGroup = new FormGroup({});
  mensaje: string = ""
  informe: Informe = new Informe()

  constructor(
    private iS: InformeService,
    private router: Router,
    private route :ActivatedRoute,
    private teS:TestService, private trS:TratamientoService){}

    ngOnInit(): void {

      this.route.params.subscribe((data: Params) => {
        this.id = data['id'];
        this.editar = data['id'] != null;
        this.init();
      });
  
      this.teS.list().subscribe(data => { this.listaTest = data});
      this.trS.list().subscribe(data => { this.listaTratamiento = data});
  
      this.form = new FormGroup({
  
        idInforme: new FormControl({value: '', disabled: true}),
        resultado_testInforme: new FormControl(),
        fechatest: new FormControl(),
        temaTratamiento: new FormControl()
      });
  
    }
  
    aceptar(): void {
  
      this.informe.idInforme = this.form.value['idInforme'];
      this.informe.resultado_testInforme = this.form.value['resultado_testInforme'];
      this.informe.test.fechatest = this.form.value['fechatest'];
      this.informe.tratamiento.temaTratamiento = this.form.value['temaTratamiento'];
  
      if (this.form.status=="INVALID") {
        this.mensaje = 'Ingrese todos los campos';
        return;
      }
      if (this.idSeleccionadoTest > 0 && this.idSeleccionadoTratamiento  > 0) {
  
        let te = new Test();
        let tr = new Tratamiento();
  
        te.idtest = this.idSeleccionadoTest;
        tr.idTratamiento=this.idSeleccionadoTratamiento;
  
        this.informe.test=te;
        this.informe.tratamiento=tr;
  
        this.iS.insert(this.informe).subscribe(() => {
        this.iS.list().subscribe(data => {
              this.iS.setList(data);
            })
          })
  
        this.router.navigate(['informes']);
  
    }
  
    }
    init() {
      if (this.editar) {
        this.iS.listId(this.id).subscribe((data) => {
          this.form = new FormGroup({
            idInforme: new FormControl(data.idInforme),
            resultado_testInforme: new FormControl(data.resultado_testInforme),
            fechatest: new FormControl(data.test.fechatest),
            temaTratamiento: new FormControl(data.tratamiento.temaTratamiento)
            
          });
          console.log(data);
        });
      }
    }
  
  }
  