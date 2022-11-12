const { inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  let opcionSeleccionada;
  const busquedas = new Busquedas();

  do {
    opcionSeleccionada = await inquirerMenu();

    switch (opcionSeleccionada) {
      case 1:
        
        break;
      case 2:
        console.log("caso 2");
        break;
      case 3:
        console.log("caso 3");
        break;

      default:

        break;
    }
    await pausa()
  } while (opcionSeleccionada !== 0);
};

main();
