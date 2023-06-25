import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rutinas_recreativas } from 'src/app/model/rutinas_recreativas';
import { Rutinas_recreativasService } from 'src/app/service/rutinas_recreativas.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { YoutubeService } from 'src/app/service/services/youtube.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-app-rutinas-recreativas-recomendacion-vista',
  templateUrl: './app-rutinas-recreativas-recomendacion-vista.component.html',
  styleUrls: ['./app-rutinas-recreativas-recomendacion-vista.component.css']
})
export class AppRutinasRecreativasRecomendacionVistaComponent implements OnInit {
  role:string="";
  id:any; //id de la rutina
  nombre_:any; //nombre de la rutina 
  descripcion_:any; //descripción de la rutina
  form:FormGroup=new FormGroup({});
  rutinas_recreativas: Rutinas_recreativas=new Rutinas_recreativas(); //Lo instanciamos como nuevo para que se llegue a conectar a la data o rutina Service sin nigún problema.

  channels:any //Se hace uso para la recomendación de canal

  @ViewChild('channelName') channelName: ElementRef; //Ayuda a tomar como referencia auxiliar al input de Descripción

  constructor(
    private fb: FormBuilder,
    private rS: Rutinas_recreativasService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private youtube: YoutubeService, //Tipo objeto que se toma como parametro debido a que nos estamos conectando a una api.
    private ls:LoginService
    ) { }

  ngOnInit(): void {
    this.role=this.ls.showRole();
    console.log(this.role);
    //BUSCAMOS LA DATA MEDIANTE NUESTRO PATH (GUIARSE DE LA ARQUITECTURA DEL PATH)
    this.route.params.subscribe((data: Params)=> {
      this.id=data['id'];//lo agarra del path el tipo de dato :id
      this.nombre_=data['nombre']; //lo agarra del path el tipo de dato :nombre
      this.descripcion_=data['descripcion']; //lo agarra del path el tipo de dato :descripcion
      this.channelName=data['descripcion']; //lo agarra del path el tipo de dato :descripcion
    })
    //TRASPASAMOS LA DATA AL FORM
    this.form = new FormGroup({
      id: new FormControl({value: this.id, disabled: true}),
      nombre: new FormControl({value:this.nombre_, disabled: true}),
      descripcion: new FormControl({value:this.descripcion_, disabled:true}),
    });

    //PASAMOS LA DATA AL MOMENTO QUE SE INICIALICE 
    this.youtube.getChannels(this.channelName).subscribe((data)=>{
      console.log(data); 
      this.channels=data.items
    });
    
  }
  redirectToChannel(): void {
    const channelId = this.channels[0].id.channelId; // Obtén el valor del channelId desde 'channels' o cualquier otra fuente
    const youtubeUrl = `https://www.youtube.com/channel/${channelId}`; //GENERAMOS LA ARQUITECTURA DEL LINK QUE NOS DEVOLVERÁ LA API, (SE LE AGREGA EL CHANNELID que nos recomienda youtube según la descripción de la rutina o que se muestra en nuestro path)
    window.open(youtubeUrl, '_blank'); //Se abre en una nueva ventana el link que nos recomendó la api de youtube
  }
}


