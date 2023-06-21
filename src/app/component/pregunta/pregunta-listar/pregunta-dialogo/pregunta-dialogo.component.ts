import { Component, OnInit } from '@angular/core';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pregunta-dialogo',
  templateUrl: './pregunta-dialogo.component.html',
  styleUrls: ['./pregunta-dialogo.component.css']
})
export class PreguntaDialogoComponent implements OnInit{

  constructor(private pS: PreguntaService,
    private dialogRef: MatDialogRef<PreguntaDialogoComponent>){  }
    ngOnInit(): void { }
    confirmar(pregunta: boolean) {
      this.pS.setConfirmaEliminacion(pregunta);
      this.dialogRef.close();
    }
}
