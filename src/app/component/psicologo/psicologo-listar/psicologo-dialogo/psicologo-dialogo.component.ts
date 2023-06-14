import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PsicologoService } from 'src/app/service/psicologo.service';

@Component({
  selector: 'app-psicologo-dialogo',
  templateUrl: './psicologo-dialogo.component.html',
  styleUrls: ['./psicologo-dialogo.component.css']
})
export class PsicologoDialogoComponent implements OnInit{
  constructor(private pS:PsicologoService,
    private dialogoRef: MatDialogRef<PsicologoDialogoComponent>){}
    ngOnInit():void{}
    confirmar(estado: boolean){
      this.pS.setConfirmarEliminacion(estado);
      this.dialogoRef.close();
    }
 
}
