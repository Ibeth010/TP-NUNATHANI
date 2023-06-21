import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opcion',
  templateUrl: './opcion.component.html',
  styleUrls: ['./opcion.component.css']
})
export class OpcionComponent implements OnInit{
  ngOnInit(): void {
      
  }
  constructor(public route:ActivatedRoute){}

}