const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  let opcionSeleccionada;
  const busquedas = new Busquedas();

  do {
    opcionSeleccionada = await inquirerMenu();

    switch (opcionSeleccionada) {
      case 1:
          const lugar = await leerInput('¿Lugar a buscar?');

          busquedas.ciudad(lugar);
          console.log('\n información del clima \n'.green);
          console.log('Ciudad:', );
          console.log('Lat:', );
          console.log('Log:', );
          console.log('Temperatura:', );
          console.log('Temperatura mímina:', );
          console.log('Temperatura máxima:', );
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
