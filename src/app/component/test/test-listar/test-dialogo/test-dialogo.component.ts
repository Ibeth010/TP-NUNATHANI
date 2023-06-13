import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TestService } from 'src/app/service/test.service';

@Component({
  selector: 'app-test-dialogo',
  templateUrl: './test-dialogo.component.html',
  styleUrls: ['./test-dialogo.component.css']
})
export class TestDialogoComponent implements OnInit{
constructor(private tS: TestService,
  private dialogRef: MatDialogRef<TestDialogoComponent>) {}
  ngOnInit(): void {
      
  }
  confirmar(estado:Boolean){
    this.tS.setConfirmaEliminacion(estado);
    this.dialogRef.close();
  }
}
