import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/service/cita.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cita-dialogo',
  templateUrl: './cita-dialogo.component.html',
  styleUrls: ['./cita-dialogo.component.css']
})
export class CitaDialogoComponent implements OnInit {
  constructor(private cS: CitaService,
    private dialogRef: MatDialogRef<CitaDialogoComponent>){  }
    ngOnInit(): void { }
    confirmar(cita: boolean) {
      this.cS.setConfirmaEliminacion(cita);
      this.dialogRef.close();
    }

}
