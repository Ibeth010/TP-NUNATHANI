import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/model/paciente';
import { PacienteService } from 'src/app/service/paciente.service';
import { PacienteDialogoComponent } from './paciente-dialogo/paciente-dialogo.component';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-paciente-listar',
  templateUrl: './paciente-listar.component.html',
  styleUrls: ['./paciente-listar.component.css']
})
export class PacienteListarComponent implements OnInit{
  role:string="";
  lista: Paciente[] = [];
  dataSource: MatTableDataSource<Paciente> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'correo', 'nacimiento', 'usuario','ceditar']
  private idMayor: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pS: PacienteService, private dialog: MatDialog,private ls:LoginService) {
  }
  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.pS.list().subscribe((data)=>{ 
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getLista().subscribe((data)=>{

      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.dataSource.paginator = this.paginator;
    });
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(PacienteDialogoComponent);
  }
  eliminar(id: number) {
    this.pS.eliminar(id).subscribe(() => {
      this.pS.list().subscribe(data => {
        this.pS.setList(data);
      });
    });
  }

  filtrar(e:any){
    this.dataSource.filter=e.target.value.trim();
  }
}
