import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tratamiento } from 'src/app/model/tratamiento';
import { LoginService } from 'src/app/service/login.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';

@Component({
  selector: 'app-reporte-tema',
  templateUrl: './reporte-tema.component.html',
  styleUrls: ['./reporte-tema.component.css']
})
export class ReporteTemaComponent {
    
  role:string="";
  temaenviar: string ="";
  dataSource: MatTableDataSource<Tratamiento> = new MatTableDataSource();

  displayedColumns: string[] = ['id', 'tema', 'descripcion']

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tS: TratamientoService,private ls:LoginService) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.tS.gettema(this.temaenviar).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    })
  }
  buscarPorTema() {
    this.tS.gettema(this.temaenviar).subscribe(data => {
      this.dataSource.data = data; // Asignar los datos al dataSource
      this.dataSource.paginator = this.paginator; // Paginar los datos
      console.log(data);
    });
  }

}
