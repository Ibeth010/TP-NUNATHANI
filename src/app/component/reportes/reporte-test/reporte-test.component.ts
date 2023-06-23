import { Component, OnInit } from '@angular/core';
import { PreguntaTestDTO } from 'src/app/model/PreguntaTestDTO';
import { MatTableDataSource } from '@angular/material/table';
import { TestService } from 'src/app/service/test.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-reporte-test',
  templateUrl: './reporte-test.component.html',
  styleUrls: ['./reporte-test.component.css']
})
export class ReporteTestComponent implements OnInit{

  role:string="";
  dataSource: MatTableDataSource<PreguntaTestDTO> = new MatTableDataSource();

  displayedColumns: string[] = ['idtest','cantidad']

  constructor(private tS: TestService, private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.tS.getPreguntaCountByTest().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    })
  }



}
