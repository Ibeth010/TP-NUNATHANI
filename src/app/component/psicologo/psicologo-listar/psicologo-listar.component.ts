import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Psicologo } from 'src/app/model/psicologo';
import { PsicologoService } from 'src/app/service/psicologo.service';
import { PsicologoDialogoComponent } from './psicologo-dialogo/psicologo-dialogo.component';
import { LoginService } from 'src/app/service/login.service';



@Component({
  selector: 'app-psicologo-listar',
  templateUrl: './psicologo-listar.component.html',
  styleUrls: ['./psicologo-listar.component.css']
})
export class PsicologoListarComponent implements OnInit {
  role:string="";
  lista: Psicologo[] = [];
  dataSource: MatTableDataSource<Psicologo> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'correo', 'foto', 'tipoEspecialidad','usuario','disponible','ceditar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private idMayor:number = 0;
  constructor(private pS: PsicologoService, private dialog: MatDialog,
     private ls:LoginService) {
  }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.pS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.pS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getConfirmarEliminacion().subscribe(data =>{
      data==true ? this.eliminar(this.idMayor) :false;
    });

  }
  confirmar(id:number){
    this.idMayor = id;
    this.dialog.open(PsicologoDialogoComponent);
  }
  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }
  eliminar(id:number){
    this.pS.eliminar(id).subscribe(()=>{
      this.pS.list().subscribe(data=>{
        this.pS.setList(data);
        this.dataSource.paginator = this.paginator ;

      });
    });
  }

}