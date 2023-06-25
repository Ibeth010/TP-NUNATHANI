import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PsicologoEspecialidadDTO } from 'src/app/model/PsicologoEspecialidadDTO';
import { LoginService } from 'src/app/service/login.service';
import { PsicologoService } from 'src/app/service/psicologo.service';

@Component({
  selector: 'app-reporte-especialidad',
  templateUrl: './reporte-especialidad.component.html',
  styleUrls: ['./reporte-especialidad.component.css']
})
export class ReporteEspecialidadComponent implements OnInit {
  role:string="";
  rutinaCounts: PsicologoEspecialidadDTO[] = [];
  dataSource: MatTableDataSource<PsicologoEspecialidadDTO> = new MatTableDataSource();

  displayedColumns: string[] = ['especialidad','cantidad']

  constructor(private pS: PsicologoService, private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.pS.getEspecialidadByCountPsicologo().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  getEspecialidadCountByPsicologo(): void {
    this.pS.getEspecialidadByCountPsicologo()
      .subscribe((data: PsicologoEspecialidadDTO[]) => {
        this.rutinaCounts = data;
      });
  }
}

