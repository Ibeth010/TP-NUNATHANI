import { Component, OnInit,ViewChild } from '@angular/core';
import { Estado } from 'src/app/model/estado';
import { EstadoService } from 'src/app/service/estado.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from "@angular/material/paginator";
import { EstadoDialogoComponent } from './estado-dialogo/estado-dialogo.component';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-estado-listar',
  templateUrl: './estado-listar.component.html',
  styleUrls: ['./estado-listar.component.css'],
})
export class EstadoListarComponent implements OnInit {
  role:string="";
  dataSource: MatTableDataSource<Estado> = new MatTableDataSource();
  lista: Estado[] = [];
  displayedColumns: string[] = [
    'No',
    'Disponibilidad',
    'ceditar'
  ];
  private idMayor: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private rS: EstadoService, 
    private dialog:MatDialog,
    private ls:LoginService) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.role=this.ls.showRole();
    console.log(this.role);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.dataSource.paginator = this.paginator;
    });
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(EstadoDialogoComponent);
  }
  eliminar(id: number) {
    this.rS.eliminar(id).subscribe(() => {
      this.rS.list().subscribe(data => {
        this.rS.setList(data);/* se ejecuta la línea 27 */
      });
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }
}