import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Informe } from 'src/app/model/informe';
import { InformeService } from 'src/app/service/informe.service';
import { InformeDialogoComponent } from './informe-dialogo/informe-dialogo.component';

@Component({
  selector: 'app-informe-listar',
  templateUrl: './informe-listar.component.html',
  styleUrls: ['./informe-listar.component.css']
})
export class InformeListarComponent implements OnInit{
  lista: Informe[] = [];
  dataSource: MatTableDataSource<Informe> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'resultado', 'test', 'tratamiento','ceditar']
  private idMayor: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private iS: InformeService, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.iS.list().subscribe((data)=>{ 
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.iS.getList().subscribe((data)=>{

      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.iS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.dataSource.paginator = this.paginator;
    });
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(InformeDialogoComponent);
  }
  filtrar(e:any){
    this.dataSource.filter=e.target.value.trim();
  }
  eliminar(id: number) {
    this.iS.eliminar(id).subscribe(() => {
      this.iS.list().subscribe(data => {
        this.iS.setList(data);
        this.dataSource.paginator = this.paginator ;
      });
    });
  }
}
