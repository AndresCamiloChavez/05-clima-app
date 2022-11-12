const inquirer = require("inquirer");
require("colors");

const menuOptions = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      { value: 1, name: `${"1.".green} Buscar ciudad` },
      { value: 2, name: `${"2.".green} Historial` },
      { value: 0, name: `${"3.".green} Salir` },
    ],
  },
];
const opcionPausa = [
  {
    type: "input",
    name: "opcion",
    message: `Presione ${"ENTER".blue} para continuar \n`,
  },
];

const inquirerMenu = async () => {
  // console.clear();
  console.log("==================================".green);
  console.log("Seleccione una opción");
  console.log("==================================\n".green);

  const { opcion } = await inquirer.prompt(menuOptions);
  return opcion;
};

const pausa = async () => {
  let resp = await inquirer.prompt(opcionPausa);
  console.log("\n");
  return resp;
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];
  let { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    return {
      value: tarea.id,
      name: `${(i + 1 + ". ").green}${tarea.descripcion}`,
    };
  });

  const preguntasBorrar = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];
  choices.unshift({ value: 0, name: "Cancelar" });
  const { id } = await inquirer.prompt(preguntasBorrar);
  return id;
};

const mostrarListadoChoices = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    return {
      value: tarea.id,
      name: `${(i + 1 + ". ").green}${tarea.descripcion}`,
      checked: (tarea.completadoEn) ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChoices
};
