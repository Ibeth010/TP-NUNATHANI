import { Component, OnInit } from '@angular/core';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tratamiento-dialogo',
  templateUrl: './tratamiento-dialogo.component.html',
  styleUrls: ['./tratamiento-dialogo.component.css']
})
export class TratamientoDialogoComponent implements OnInit {

  constructor(private tS: TratamientoService,
    private dialogRef: MatDialogRef<TratamientoDialogoComponent>){  }
    ngOnInit(): void { }
    confirmar(tratamiento: boolean) {
      this.tS.setConfirmaEliminacion(tratamiento);
      this.dialogRef.close();
    }
}
