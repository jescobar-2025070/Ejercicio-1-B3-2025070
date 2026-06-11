import type { Prioridad } from "../types/prioridad.js";

export interface incidenteDTO{
    titulo:string;
    descripcion:string;
    abiertoPor:string;
    prioridad:Prioridad;
}