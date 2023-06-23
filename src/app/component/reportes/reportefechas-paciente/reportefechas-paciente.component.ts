import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PacienteUsuarioDTO } from 'src/app/model/PacienteUsuarioDTO';
import { LoginService } from 'src/app/service/login.service';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-reportefechasPaciente',
  templateUrl: './reportefechas-paciente.component.html',
  styleUrls: ['./reportefechas-paciente.component.css']
})
export class ReportefechasPacienteComponent implements OnInit {
  role:string="";
  fechas: PacienteUsuarioDTO[] = [];
  dataSource: MatTableDataSource<PacienteUsuarioDTO> = new MatTableDataSource();

  displayedColumns: string[] = ['nombre','fecha']

  constructor(private pS: PacienteService,private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.pS.getnombresynacimientos().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    })
  }
}