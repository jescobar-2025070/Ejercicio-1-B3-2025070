import type { Estado } from '../types/estado.js'
import type { Prioridad } from '../types/prioridad.js'

export interface Incidente {
    readonly Id:number;
    titulo:string;
    descripcion:string;
    abiertoPor:string;
    prioridad:Prioridad;
    estado:Estado;
    fecha:Date;
}