import { Component,OnInit, ViewChild  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Tratamiento } from 'src/app/model/tratamiento';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { MatPaginator } from '@angular/material/paginator';
import { TratamientoDialogoComponent } from './tratamiento-dialogo/tratamiento-dialogo.component';

@Component({
  selector: 'app-tratamiento-listar',
  templateUrl: './tratamiento-listar.component.html',
  styleUrls: ['./tratamiento-listar.component.css']
})
export class TratamientoListarComponent implements OnInit{
  lista: Tratamiento[] = [];
  dataSource: MatTableDataSource<Tratamiento> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'tema', 'descripcion', 'rutinas_recreativas','ceditar']
  private idMayor: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS: TratamientoService, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.rS.getLista().subscribe(data => {
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
    this.dialog.open(TratamientoDialogoComponent);
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
