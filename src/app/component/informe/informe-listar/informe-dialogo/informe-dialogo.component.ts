import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InformeService } from 'src/app/service/informe.service';

@Component({
  selector: 'app-informe-dialogo',
  templateUrl: './informe-dialogo.component.html',
  styleUrls: ['./informe-dialogo.component.css']
})
export class InformeDialogoComponent implements OnInit{
  constructor(private iS: InformeService,
    private dialogRef: MatDialogRef<InformeDialogoComponent>){}
    ngOnInit(): void {
        
    }
    confirmar(estado:Boolean){
      this.iS.setConfirmaEliminacion(estado);
      this.dialogRef.close();
    }
}