import { Estado } from "./estado";
import { Psicologo } from "./psicologo";
import { Paciente } from "./paciente";
export class Cita{
    idCita: number=0
    fechaCita = new Date(Date.now())
    estado:Estado= new Estado();
    psicologo:Psicologo= new Psicologo();
    paciente:Paciente=new Paciente();
}