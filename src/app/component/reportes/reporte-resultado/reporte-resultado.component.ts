import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Informe } from 'src/app/model/informe'; 
import { LoginService } from 'src/app/service/login.service';
import { InformeService } from 'src/app/service/informe.service'; 

@Component({
  selector: 'app-reporte-resultado',
  templateUrl: './reporte-resultado.component.html',
  styleUrls: ['./reporte-resultado.component.css']
})
export class ReporteResultadoComponent {

  role:string="";
  resultadomandar: string ="";
  dataSource: MatTableDataSource<Informe> = new MatTableDataSource();

  displayedColumns: string[] = ['id', 'test', 'tratamiento']

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private iS: InformeService,private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.iS.getresultado(this.resultadomandar).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    })
  }
  buscarPorResultado() {
    this.iS.getresultado(this.resultadomandar).subscribe(data => {
      this.dataSource.data = data; // Asignar los datos al dataSource
      this.dataSource.paginator = this.paginator; // Paginar los datos
      console.log(data);
    });
  }


}
