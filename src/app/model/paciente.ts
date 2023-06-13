import { Usuario } from "./usuario"

export class Paciente{
    idpaciente: number=0
    correopaciente: String=""
    nacimientopaciente:Date=new Date(Date.now())
    usuario: Usuario=new Usuario();
}