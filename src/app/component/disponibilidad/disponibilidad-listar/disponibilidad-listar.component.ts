import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; //THIS
import { MatTableDataSource } from '@angular/material/table';
import { Disponibilidad } from 'src/app/model/disponibilidad';
import { DisponibilidadService } from 'src/app/service/disponibilidad.service';
import { MatDialog } from '@angular/material/dialog';
import { DisponibilidadDialogoComponent } from './disponibilidad-dialogo/disponibilidad-dialogo.component';

@Component({
  selector: 'app-disponibilidad-listar',
  templateUrl: './disponibilidad-listar.component.html',
  styleUrls: ['./disponibilidad-listar.component.css']
})
export class DisponibilidadListarComponent implements OnInit {
  dataSource: MatTableDataSource<Disponibilidad> = new MatTableDataSource();
  lista: Disponibilidad[] = [];
  displayedColumns: string[] = [
    'No',
    'Inicio del turno',
    'Fin del turno',
    'Dias laborales',
    'ceditar',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator; //THIS

  private idMayor: number = 0;
  constructor(private dS: DisponibilidadService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; //THIS
    });
    this.dS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator; //THIS
    });
    this.dS.getConfirmaEliminacion().subscribe((data) => {
      data == true ? this.eliminar(this.idMayor) : false;
    });
  }

  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(DisponibilidadDialogoComponent);
  }

  eliminar(id: number) {
    this.dS.eliminar(id).subscribe(() => {
      this.dS.list().subscribe((data) => {
        this.dS.setList(data);
        this.dataSource = new MatTableDataSource(data); //THIS
        this.dataSource.paginator = this.paginator; //THIS
      });
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }
}
