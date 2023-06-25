import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Psicologo } from 'src/app/model/psicologo';
import { LoginService } from 'src/app/service/login.service';
import { PsicologoService } from 'src/app/service/psicologo.service';

@Component({
  selector: 'app-reporte-correo',
  templateUrl: './reporte-correo.component.html',
  styleUrls: ['./reporte-correo.component.css']
})
export class ReporteCorreoComponent {

  role:string="";
  correomandar: string ="";
  dataSource: MatTableDataSource<Psicologo> = new MatTableDataSource();

  displayedColumns: string[] = ['id', 'correo', 'usuario']

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pS: PsicologoService,private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.pS.getcorreo(this.correomandar).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    })
  }
  buscarPorCorreo() {
    this.pS.getcorreo(this.correomandar).subscribe(data => {
      this.dataSource.data = data; // Asignar los datos al dataSource
      this.dataSource.paginator = this.paginator; // Paginar los datos
      console.log(data);
    });
  }


}

