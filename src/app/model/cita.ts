import { Estado } from "./estado";

export class Cita{
    idCita: number=0
    fechaCita = new Date(Date.now())
    estado:Estado= new Estado();
}