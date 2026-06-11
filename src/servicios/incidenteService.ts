import type { incidenteDTO } from "../dto/incidenteDTO.js";
import type { Incidente } from "../interfaces/incidente.js";
import type { Prioridad } from "../types/prioridad.js";
import type { Estado } from "../types/estado.js";
import { rl } from "../hooks/entradaPorTerminal.js";

//Globales
let i = 1;
let incidentesAlmacenado:Incidente[] = [];

//Funcion para crear un nuevo incidente
export async function crearIncidente(){

let tituloIngresado = await rl.question("Ingrese el Titulo: ")
let descripcionIngresada = await rl.question("Ingrese la descripcion: ")
let usuarioIngresado = await rl.question("Ingrese su nombre o usuario: ")
let prioridadIngresada = await rl.question("Ingrese la prioridad puede ser Alta/Media/Baja: ")

const regex: RegExp = /^\s*$/;
while(regex.test(tituloIngresado)===true){
    console.log("El titulo no puede estar vacio")
    tituloIngresado = await rl.question("Ingrese el Titulo: ")
}

while(regex.test(descripcionIngresada)===true){
    console.log("La descripcion no puede estar vacio")
    descripcionIngresada = await rl.question("Ingrese la descripcion: ")
}

while(regex.test(usuarioIngresado)===true){
    console.log("El usuario no puede estar vacio")
    usuarioIngresado = await rl.question("Ingrese su nombre o usuario: ")
}

while (
    prioridadIngresada !== "Alta" && 
    prioridadIngresada !== "Media" && 
    prioridadIngresada !== "Baja"
) {
    console.log("Opción invalida. Por favor, escribe exactamente 'Alta', 'Media' o 'Baja'.");
    prioridadIngresada = await rl.question("Ingrese la prioridad: ");
}

const dto: incidenteDTO = {
    titulo: tituloIngresado,
    descripcion: descripcionIngresada,
    abiertoPor: usuarioIngresado,
    prioridad: prioridadIngresada as Prioridad
};

function construirIncidente(datos: incidenteDTO): Incidente {
    return {
        ...datos,
        Id: i++,
        fecha: new Date(),
        estado: "Abierto"
    };
}
const incidenteCompleto = construirIncidente(dto);
incidentesAlmacenado.push(incidenteCompleto);
return incidenteCompleto;
    
}

//Listar los incidentes ordenados por prioridad
export function listarIncidentes() {
    const prioridadValor: Record<Prioridad, number> = {
        Alta: 1,
        Media: 2,
        Baja: 3
    };

    const ordenados = [...incidentesAlmacenado].sort(
        (a, b) => prioridadValor[a.prioridad] - prioridadValor[b.prioridad]
    );

    console.table(ordenados,['Id','titulo','descripcion','prioridad','estado','abiertoPor','fecha']);
}

//Modificar el estado de un incidente en base a su ID
export async function modificar() {
    const idIngresado = await rl.question("Ingrese el ID del incidente que desea modificar: ");
    const idBuscado = parseInt(idIngresado);
    
    if (isNaN(idBuscado)) {
        console.log("El ID ingresado no es un número válido.");
        return null; 
    }

    let nuevoEstado = await rl.question("Ingrese en qué estado se encuentra actualmente el incidente: ");
    
    while (
        nuevoEstado !== "Abierto" && 
        nuevoEstado !== "En Proceso" && 
        nuevoEstado !== "Cerrado"
    ) {
        console.log("Opción inválida. Por favor, escribe exactamente 'Abierto', 'En Proceso' o 'Cerrado'.");
        nuevoEstado = await rl.question("Ingrese en qué estado se encuentra actualmente el incidente: ");
    }

    const incidente = incidentesAlmacenado.find(i => i.Id === idBuscado);
    
    if (incidente) {
        incidente.estado = nuevoEstado as Estado; 
        console.log(`Actualizado con éxito.`);
        return console.log(incidente);
    } else {
        console.log(`No se encontró ningún incidente con el ID: ${idBuscado}`);
        return null;
    }
}