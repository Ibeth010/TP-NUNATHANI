import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Test } from 'src/app/model/test';
import { TestService } from 'src/app/service/test.service';
import { TestDialogoComponent } from './test-dialogo/test-dialogo.component';

@Component({
  selector: 'app-test-listar',
  templateUrl: './test-listar.component.html',
  styleUrls: ['./test-listar.component.css']
})
export class TestListarComponent implements OnInit{
  lista: Test[] = [];
  dataSource: MatTableDataSource<Test> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'fecha', 'paciente', 'pregunta', 'opciones', 'ceditar']
  private idMayor: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tS: TestService, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.tS.list().subscribe((data)=>{ 
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.tS.getLista().subscribe((data)=>{

      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.tS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.dataSource.paginator = this.paginator;
    });
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(TestDialogoComponent);
  }
  eliminar(id: number) {
    this.tS.eliminar(id).subscribe(() => {
      this.tS.list().subscribe(data => {
        this.tS.setList(data);
      });
    });
  }

  filtrar(e:any){
    this.dataSource.filter=e.target.value.trim();
  }
}
