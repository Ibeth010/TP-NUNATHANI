import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from "@angular/material/paginator";
import { Opcion } from 'src/app/model/opcion';
import { OpcionDialogoComponent } from './opcion-dialogo/opcion-dialogo.component';
import { OpcionService } from 'src/app/service/opcion.service';

@Component({
  selector: 'app-opcion-listar',
  templateUrl: './opcion-listar.component.html',
  styleUrls: ['./opcion-listar.component.css']
})
export class OpcionListarComponent implements OnInit{
  lista: Opcion[] = [];
  dataSource: MatTableDataSource<Opcion> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'pregunta','descripcionOpcion', 'ceditar']
  private idMayor: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private oS: OpcionService, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.oS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.oS.getLista().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.oS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.dataSource.paginator = this.paginator;
    });

  }

  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(OpcionDialogoComponent);
  }
  eliminar(id: number) {
    this.oS.eliminar(id).subscribe(() => {
      this.oS.list().subscribe(data => {
        this.oS.setList(data);/* se ejecuta la línea 27 */
      });
    });
  }
  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }


}

