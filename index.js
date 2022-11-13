require("dotenv").config();
const { inquirerMenu, pausa, leerInput, listadoLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
// console.log(process.env);
const main = async () => {
  let opcionSeleccionada;
  const busquedas = new Busquedas();
  do {
    opcionSeleccionada = await inquirerMenu();

    switch (opcionSeleccionada) {
      case 1:
        const lugar = await leerInput("¿Lugar a buscar?");
        const lugaresQueCoinciden = await busquedas.ciudad("Samacá");
        
        const idSeleccionado = await listadoLugares(lugaresQueCoinciden);
        const lugarSeleccionado = lugaresQueCoinciden.find(lugar => lugar.id == idSeleccionado);
        console.log('Lugar seleccinado', lugarSeleccionado);
        busquedas.ciudad(lugar);
        console.log("\n información del clima \n".green);
        console.log("Ciudad:", lugarSeleccionado.nombre);
        console.log("Lat:", lugarSeleccionado.lat);
        console.log("Log:", lugarSeleccionado.lng);
        console.log("Temperatura:");
        console.log("Temperatura mímina:");
        console.log("Temperatura máxima:");
        break;
      case 2:
        break;
      case 3:
        console.log("caso 3");
        break;

      default:
        break;
    }
    await pausa();
  } while (opcionSeleccionada !== 0);
};

main();
