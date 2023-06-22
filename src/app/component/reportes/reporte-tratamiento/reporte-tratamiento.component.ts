import { Component,OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RutinaTratamientoDTO } from 'src/app/model/rutinaTratamientoDTO';
import { LoginService } from 'src/app/service/login.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';

@Component({
  selector: 'app-reporte-tratamiento',
  templateUrl: './reporte-tratamiento.component.html',
  styleUrls: ['./reporte-tratamiento.component.css']
})
export class ReporteTratamientoComponent implements OnInit  {
  role:string="";
  rutinaCounts: RutinaTratamientoDTO[] = [];
  dataSource: MatTableDataSource<RutinaTratamientoDTO> = new MatTableDataSource();

  displayedColumns: string[] = ['tratamiento','cantidad']

  constructor(private rS: TratamientoService, private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.rS.getRutinaCountByTratamiento().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  getPetCountByVaccine(): void {
    this.rS.getRutinaCountByTratamiento()
      .subscribe((data: RutinaTratamientoDTO[]) => {
        this.rutinaCounts = data;
      });
  }
}
