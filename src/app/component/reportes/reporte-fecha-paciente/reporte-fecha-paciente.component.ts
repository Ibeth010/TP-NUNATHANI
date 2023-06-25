import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/model/paciente';
import { LoginService } from 'src/app/service/login.service';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-reporte-fecha-paciente',
  templateUrl: './reporte-fecha-paciente.component.html',
  styleUrls: ['./reporte-fecha-paciente.component.css']
})
export class ReporteFechaPacienteComponent implements OnInit{
  role:string="";
  fechamandar: Date=new Date(Date.now());
  dataSource: MatTableDataSource<Paciente> = new MatTableDataSource();

  displayedColumns: string[] = ['id', 'correo', 'nacimiento', 'usuario']

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pS: PacienteService,private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.pS.getfechanacimiento(this.fechamandar).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    })
  }
  buscarPorFecha() {
    this.pS.getfechanacimiento(this.fechamandar).subscribe(data => {
      this.dataSource.data = data; // Asignar los datos al dataSource
      this.dataSource.paginator = this.paginator; // Paginar los datos
      console.log(data);
    });
  }
}
