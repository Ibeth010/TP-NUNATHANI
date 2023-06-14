import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Paciente } from 'src/app/model/paciente';
import { Test } from 'src/app/model/test';
import { PacienteService } from 'src/app/service/paciente.service';
import { TestService } from 'src/app/service/test.service';

@Component({
  selector: 'app-test-insertar',
  templateUrl: './test-insertar.component.html',
  styleUrls: ['./test-insertar.component.css']
})
export class TestInsertarComponent implements OnInit{
  form: FormGroup = new FormGroup({});
test: Test = new Test();
mensaje: string = "";
editar: boolean = false;
lista: Paciente[] = [];
idpacienteseleccionado: number = 0;
id: number = 0;

constructor(
  private tS: TestService,
  private router: Router,
  private route: ActivatedRoute,
  private pS: PacienteService
) {}

ngOnInit(): void {
  this.pS.list().subscribe(data => {
    this.lista = data;
  });

  this.route.params.subscribe((data: Params) => {
    this.id = data['id'];
    this.editar = data['id'] != null;
    this.init();
  });

  this.form = new FormGroup({
    idtest: new FormControl(),
    fechatest: new FormControl(),
    paciente: new FormControl(),
  });
}

aceptar(): void {
  this.test.idtest = this.form.value['idtest'];
  this.test.fechatest = this.form.value['fechatest'];

  let p = new Paciente();
  p.idpaciente = this.idpacienteseleccionado;
  this.test.paciente = p;

  this.tS.insert(this.test).subscribe(() => {
    this.tS.list().subscribe((data) => {
      this.tS.setList(data);
      this.router.navigate(['test']);
    });
  });
}

init() {
  if (this.editar) {
    this.tS.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        idtest: new FormControl(data.idtest),
        fechatest: new FormControl(data.fechatest),
      });
    });
  }
}

}
