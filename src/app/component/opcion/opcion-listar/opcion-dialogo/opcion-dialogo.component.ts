import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OpcionService } from 'src/app/service/opcion.service';

@Component({
  selector: 'app-opcion-dialogo',
  templateUrl: './opcion-dialogo.component.html',
  styleUrls: ['./opcion-dialogo.component.css']
})
export class OpcionDialogoComponent implements OnInit{

  constructor(private oS: OpcionService,
    private dialogRef: MatDialogRef<OpcionDialogoComponent>){  }
    ngOnInit(): void { }
    confirmar(opcion: boolean) {
      this.oS.setConfirmaEliminacion(opcion);
      this.dialogRef.close();
    }
}

