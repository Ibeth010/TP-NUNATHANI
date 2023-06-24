import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InformeTratamientoDTO } from 'src/app/model/InformeTratamientoDTO';
import { LoginService } from 'src/app/service/login.service';
import { InformeService } from 'src/app/service/informe.service';

@Component({
  selector: 'app-reporte-informe',
  templateUrl: './reporte-informe.component.html',
  styleUrls: ['./reporte-informe.component.css']
})
export class ReporteInformeComponent implements OnInit{
  role:string="";
  dataSource: MatTableDataSource<InformeTratamientoDTO> = new MatTableDataSource();

  displayedColumns: string[] = ['informeName','tratamientoCount']

  constructor(private iS: InformeService, private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.iS.getTratamientoCountByInforme().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    })
  }
}
