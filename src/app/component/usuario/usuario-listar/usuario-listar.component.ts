import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator'; //THIS
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UsuarioDialogoComponent } from './usuario-dialogo/usuario-dialogo.component';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.css']
})
export class UsuarioListarComponent implements OnInit {
  role:string="";
  lista: Usuario[] = [];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['no', 'nombre', 'apellido', 'contraseña', 'telefono', 'ceditar']
  private idMayor: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private uS:UsuarioService, private dialog: MatDialog,private ls:LoginService){}
  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.uS.list().subscribe((data)=>{ 
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getList().subscribe((data)=>{

      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.uS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.dataSource.paginator = this.paginator;
    });
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(UsuarioDialogoComponent);
  }
  eliminar(id: number) {
    this.uS.eliminar(id).subscribe(() => {
      this.uS.list().subscribe(data => {
        this.uS.setList(data);
      });
    });
  }

  filtrar(e:any){
    this.dataSource.filter=e.target.value.trim();
  }
}



