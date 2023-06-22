import { Component,Input, OnInit  } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit{
  role:string="";
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
     ruta:'estados',
     icon:'fa-solid  fa-users',
     name: 'Estado',
    },
    {
      number: '6',
      ruta:'tratamientos',
      icon:'fa-solid fa-book-open-reader',
      name:'Tratamiento',
     },
     {
      number: '7',
      ruta:'test',
      icon:'fa-solid fa-clipboard-check',
      name:'Test',
     },
     {
      number: '8',
      ruta:'paciente',
      icon:'fa-solid fa-user-injured',
      name:'Paciente',
     },
     {
      number: '9',
      ruta:'psicologo',
      icon:'fa-solid fa-brain',
      name:'Psicologo',
     },

     {
      number: '10',
      ruta:'informes',
      icon:'fa-solid fa-chart-line',
      name:'Informe',
     },

     {
      number: '11',
      ruta:'citas',
      icon: 'fa-solid fa-calendar-alt',
      name:'Citas',
     },
     {
      number:'12',
      ruta:'preguntas',
      icon:'fa-solid fa-question-circle',
      name: 'Preguntas',
     },

     {
      number: '13',
      ruta:'opciones',
      icon: 'fa-solid fa-cogs',
      name:'Opciones',
     },
     {
      number: '14',
      ruta: 'login',
      icon: 'fas fa-times',
      name: 'Logout',
     },
     {
      number: '15',
      ruta: 'reportes',
      icon: 'fas fa-times',
      name: 'Reporte',
     }

  ];
  
  constructor(private ls:LoginService){
  }
  ngOnInit():void{
    this.role=this.ls.showRole();
    console.log(this.role);
  }
  handleClick(item: any) {
    if (item.ruta === 'login') {
      this.cerrar();
    }
  }
  cerrar() {
    sessionStorage.clear();
  }
  shouldHideItem(item: any): boolean {
    if (this.role === 'PACIENTE') {
      return item.ruta === 'estados' || item.ruta === 'test' || item.ruta === 'preguntas';
    } else if (this.role === 'PSICOLOGO') {
      return item.ruta === 'opciones';
    } else {
      return false; // No ocultar ningún otro elemento para roles distintos de 'PACIENTE' y 'PSICOLOGO'
    }
  }
  

}


