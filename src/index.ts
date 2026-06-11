import { crearIncidente, listarIncidentes, modificar } from "./servicios/incidenteService.js";
import { rl } from "./hooks/entradaPorTerminal.js";

async function main() {
    let salir = false;

    while (!salir) {
        console.log("Incidentes");
        console.log("1. Agregar");
        console.log("2. Listar");
        console.log("3. Modificar");
        console.log("4. Salir");

        const opcion = await rl.question("Seleccione una opcion: ");

        switch (opcion) {
            case "1":
                const incidente = await crearIncidente();
                console.log("Incidente creado:", incidente);
                break;

            case "2":
                listarIncidentes();
                break;

            case "3":
                await modificar();
                break;

            case "4":
                salir = true;
                console.log("Vuelva pronto");
                break;

            default:
                console.log("Opción no válida");
        }
    }

    rl.close();
}

await main();