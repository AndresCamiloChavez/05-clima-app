require("dotenv").config();
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoLugares,
} = require("./helpers/inquirer");
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
        const lugaresQueCoinciden = await busquedas.ciudad(lugar);

        const idSeleccionado = await listadoLugares(lugaresQueCoinciden);
        if (idSeleccionado == 0) continue;


        const lugarSeleccionado = lugaresQueCoinciden.find(
          (lugar) => lugar.id == idSeleccionado
        );
        busquedas.agregarHistorial(lugarSeleccionado.nombre)

        const lugarFinal = await busquedas.climaPorLugar(
          lugarSeleccionado.lat,
          lugarSeleccionado.lng
        );
        busquedas.ciudad(lugar);
        console.log("\n información del clima \n".green);
        console.log("Ciudad:", lugarSeleccionado.nombre);
        console.log("Lat:", lugarSeleccionado.lat);
        console.log("Log:", lugarSeleccionado.lng);
        console.log("Temperatura:", lugarFinal.temp);
        console.log("Temperatura mímina:", lugarFinal.temp_min);
        console.log("Temperatura máxima:", lugarFinal.temp_max);
        console.log("Cómo está el clima:", lugarFinal.descripcion);
        break;
      case 2:
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          console.log(`${((i+1)+'').green} ${lugar}`);
        });
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
