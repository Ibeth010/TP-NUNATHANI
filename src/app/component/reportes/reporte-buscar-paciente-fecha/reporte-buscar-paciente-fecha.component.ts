import { Component, OnInit,ViewChild} from '@angular/core';
import { CitaService } from 'src/app/service/cita.service';
import { LoginService } from 'src/app/service/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cita } from 'src/app/model/cita';


@Component({
  selector: 'app-reporte-buscar-paciente-fecha',
  templateUrl: './reporte-buscar-paciente-fecha.component.html',
  styleUrls: ['./reporte-buscar-paciente-fecha.component.css']
})
export class ReporteBuscarPacienteFechaComponent implements OnInit {

  role:string="";
  fechaEnviar: Date=new Date(Date.now());
  dataSource: MatTableDataSource<Cita> = new MatTableDataSource();

  displayedColumns: string[] = ['id', 'estado', 'psicologo','paciente']
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private cS: CitaService, private ls:LoginService){}

    ngOnInit(): void {
      this.role=this.ls.showRole();
      console.log(this.role);
      this.cS.getbuscarBuscarFecha(this.fechaEnviar).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        console.log(data);
      })
    }
    buscarPorFecha() {
      this.cS.getbuscarBuscarFecha(this.fechaEnviar).subscribe(data => {
        this.dataSource.data = data; // Asignar los datos al dataSource
        this.dataSource.paginator = this.paginator; // Paginar los datos
        console.log(data);
      });
    }
  
}
