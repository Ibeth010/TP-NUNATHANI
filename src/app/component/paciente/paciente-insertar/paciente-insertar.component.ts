import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Paciente } from 'src/app/model/paciente';
import { Usuario } from 'src/app/model/usuario';
import { PacienteService } from 'src/app/service/paciente.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-paciente-insertar',
  templateUrl: './paciente-insertar.component.html',
  styleUrls: ['./paciente-insertar.component.css']
})
export class PacienteInsertarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  paciente: Paciente = new Paciente()
  mensaje: string = ""
  editar: boolean = false;
  lista: Usuario[] = [];
  idusuarioseleccionado: number = 0;
  id: number = 0;

  constructor(
    private pS: PacienteService,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.lista = data
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.editar = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      idpaciente: new FormControl(),
      correopaciente: new FormControl(),
      nacimientopaciente: new FormControl(),
      usuario: new FormControl()
    });
  }

  aceptar(): void {
    this.paciente.idpaciente = this.form.value['idpaciente'];
    this.paciente.correopaciente = this.form.value['correopaciente'];
    this.paciente.nacimientopaciente = this.form.value['nacimientopaciente'];

    let p = new Usuario();
    p.idusuario = this.idusuarioseleccionado;
    this.paciente.usuario = p;

    this.pS.insert(this.paciente).subscribe(() => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
        this.router.navigate(['paciente']);
      });
    });
  }

  init() {
    if (this.editar) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idpaciente: new FormControl(data.idpaciente),
          correopaciente: new FormControl(data.correopaciente),
          nacimientopaciente: new FormControl(data.nacimientopaciente),
          usuario: new FormControl(data.usuario.nameusuario),
        });
      });
    }
  }
}
