import { Component,Input, OnInit  } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit{
  @Input() sideNavStatus: boolean = false;
  list=[
    {
     number: '1',
     ruta:'usuario',
     icon:'fa-solid fa-user',
     name:'Usuario',
    },
    {
     number: '2',
     ruta:'disponibilidad',
     icon:'fa-solid fa-clock',
     name:'Disponibilidades',
    },
    {
     number: '3',
     ruta:'especialidad',
     icon:'fa-solid fa-user-tie',
     name:'Especialidades',
    },
    {
     number: '4',
     ruta:'rutinas_recreativas',
     icon:'fa-solid fa-book-open-reader',
     name:'Rutinas Recreativas',
    },
    {
     number: '5',
     ruta:'estado',
     icon:'fa-solid  fa-users',
     name: 'Estado',
    }

  ];

  constructor(){
  }
  ngOnInit():void{}

}


