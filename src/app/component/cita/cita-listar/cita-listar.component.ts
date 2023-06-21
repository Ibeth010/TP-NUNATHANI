import { Component, OnInit,ViewChild } from '@angular/core';
import { Cita } from 'src/app/model/cita';
import { CitaService } from 'src/app/service/cita.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'
import { CitaDialogoComponent } from './cita-dialogo/cita-dialogo.component';
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'app-cita-listar',
  templateUrl: './cita-listar.component.html',
  styleUrls: ['./cita-listar.component.css']
})
export class CitaListarComponent implements OnInit{
  lista: Cita[] = [];
  dataSource: MatTableDataSource<Cita> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'fecha', 'estado','ceditar']
  private idMayor: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: CitaService, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.cS.getLista().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.dataSource.paginator = this.paginator;
    });

  }

  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(CitaDialogoComponent);
  }
  eliminar(id: number) {
    this.cS.eliminar(id).subscribe(() => {
      this.cS.list().subscribe(data => {
        this.cS.setList(data);/* se ejecuta la línea 27 */
      });
    });
  }
  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

}
