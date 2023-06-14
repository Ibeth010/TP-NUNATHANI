import { Disponibilidad } from "./disponibilidad";
import { Especialidad } from "./especialidad";
import { Usuario } from "./usuario";

export class Psicologo{

    idPsicologo:number=0
    correoPsicologo:string=""
    fotoPsicologo:string=""
    disponibilidad:Disponibilidad=new Disponibilidad();
    especialidad:Especialidad=new Especialidad();
    usuario:Usuario=new Usuario();
    
   }