import { Component,ElementRef, OnInit,ViewChild } from '@angular/core';
import { Rutinas_recreativas } from 'src/app/model/rutinas_recreativas';
import { Rutinas_recreativasService } from 'src/app/service/rutinas_recreativas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'
import { Rutinas_recreativasDialogoComponent } from './rutinas-recreativas-dialogo/rutinas-recreativas-dialogo.component';
import { LoginService } from 'src/app/service/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { YoutubeService } from 'src/app/service/services/youtube.service';

@Component({
  selector: 'app-rutinas_recreativas-listar',
  templateUrl: './rutinas_recreativas-listar.component.html',
  styleUrls: ['./rutinas_recreativas-listar.component.css'],
})
export class Rutinas_recreativasListarComponent implements OnInit {

  channels:any

  @ViewChild('channelName') channelName: ElementRef;
  
  role:string="";
  dataSource: MatTableDataSource<Rutinas_recreativas> = new MatTableDataSource();
  lista: Rutinas_recreativas[] = [];
  displayedColumns: string[] = [
    'No',
    'Nombre de la rutina recreativa',
    'Descripcion',
    'ceditar',
  ];
  private idMayor:number=0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS: Rutinas_recreativasService, 
    private dialog: MatDialog,  private ls:LoginService
    , private youtube: YoutubeService) {}

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    this.rS.list().subscribe((data) => {
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

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(Rutinas_recreativasDialogoComponent);
  }
  eliminar(id: number) {
    this.rS.eliminar(id).subscribe(() => {
      this.rS.list().subscribe(data => {
        this.rS.setList(data);/* se ejecuta la línea 27 */
      });
    });
  }

}
