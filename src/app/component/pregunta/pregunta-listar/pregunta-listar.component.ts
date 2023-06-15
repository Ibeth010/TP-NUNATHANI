import { Component, OnInit, ViewChild} from '@angular/core';
import { Pregunta } from 'src/app/model/pregunta';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { PreguntaDialogoComponent } from './pregunta-dialogo/pregunta-dialogo.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from "@angular/material/paginator";
@Component({
  selector: 'app-pregunta-listar',
  templateUrl: './pregunta-listar.component.html',
  styleUrls: ['./pregunta-listar.component.css']
})
export class PreguntaListarComponent implements OnInit{
  lista: Pregunta[] = [];
  dataSource: MatTableDataSource<Pregunta> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'txtPregunta', 'test', 'ceditar']
  private idMayor: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pS: PreguntaService, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.pS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.pS.getLista().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.dataSource.paginator = this.paginator;
    });

  }

  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(PreguntaDialogoComponent);
  }
  eliminar(id: number) {
    this.pS.eliminar(id).subscribe(() => {
      this.pS.list().subscribe(data => {
        this.pS.setList(data);/* se ejecuta la línea 27 */
      });
    });
  }
  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }


}
