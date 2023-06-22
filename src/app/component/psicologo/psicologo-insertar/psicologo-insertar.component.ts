import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Disponibilidad } from 'src/app/model/disponibilidad';
import { Especialidad } from 'src/app/model/especialidad';
import { Psicologo } from 'src/app/model/psicologo';
import { Usuario } from 'src/app/model/usuario';
import { DisponibilidadService } from 'src/app/service/disponibilidad.service';
import { EspecialidadService } from 'src/app/service/especialidad.service';
import { PsicologoService } from 'src/app/service/psicologo.service';
import { UsuarioService } from 'src/app/service/usuario.service';
@Component({
  selector: 'app-psicologo-insertar',
  templateUrl: './psicologo-insertar.component.html',
  styleUrls: ['./psicologo-insertar.component.css']
})
export class PsicologoInsertarComponent implements OnInit{

  

  id: number = 0;
  edicion: boolean = false;
  idSeleccionado: number = 0;
  idSeleccionadou: number = 0;
  idSeleccionadod: number = 0;
  listae: Especialidad[] = [];
  listau: Usuario[] = []; 
  listad: Disponibilidad[] = []; 

  form: FormGroup = new FormGroup({});
  psicologo: Psicologo = new Psicologo();
  mensaje: string = '';
  constructor(
    private pS: PsicologoService,
    private router: Router,
    private route :ActivatedRoute, private eS:EspecialidadService, 
    private uS:UsuarioService, private dS:DisponibilidadService){}


  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.eS.list().subscribe(data => { this.listae = data});
    this.uS.list().subscribe(data => { this.listau = data});
    this.dS.list().subscribe(data => { this.listad = data});

    this.form = new FormGroup({

      idPsicologo: new FormControl({value: '', disabled: true}),
      correoPsicologo: new FormControl(),
      fotoPsicologo: new FormControl(),
      nameusuario: new FormControl(),
      dias_laborales: new FormControl(),
      tipoEspecialidad: new FormControl()
    });

  }

  aceptar(): void {

    this.psicologo.idPsicologo = this.form.value['idPsicologo'];
    this.psicologo.correoPsicologo = this.form.value['correoPsicologo'];
    this.psicologo.fotoPsicologo = this.form.value['fotoPsicologo'];
    this.psicologo.especialidad.tipoEspecialidad = this.form.value['tipoEspecialidad'];
    this.psicologo.usuario.nameusuario = this.form.value['nameusuario'];
    this.psicologo.disponibilidad.dias_laborables = this.form.value['dias_laborales'];

    if (this.form.status=="INVALID") {
      this.mensaje = 'Ingrese todos los campos';
      return;
    }
    if (this.idSeleccionado > 0 && this.idSeleccionadod  > 0  && this.idSeleccionadou > 0) {

      let a = new Especialidad();
      let b = new Usuario();
      let c = new Disponibilidad();

      a.idEspecialidad = this.idSeleccionado;
      b.idusuario=this.idSeleccionadou;
      c.idDisponibilidad=this.idSeleccionadod;

      this.psicologo.especialidad=a;
      this.psicologo.usuario=b;
      this.psicologo.disponibilidad=c;

      this.pS.insert(this.psicologo).subscribe(() => {
      this.pS.list().subscribe(data => {
            this.pS.setList(data);
          })
        })

      this.router.navigate(['psicologo']);

  }else{
    this.mensaje= "Seleccione los campos requeridos"
  }

  }
  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idPsicologo: new FormControl(data.idPsicologo),
          correoPsicologo: new FormControl(data.correoPsicologo),
          fotoPsicologo: new FormControl(data.fotoPsicologo),
          tipoEspecialidad: new FormControl(data.especialidad.tipoEspecialidad),
          nameusuario: new FormControl(data.usuario.nameusuario),
          dias_laborales: new FormControl(data.disponibilidad.dias_laborables),
          
          
        });
        console.log(data);
      });
    }
  }

}
