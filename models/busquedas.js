const axios = require("axios");

class Busquedas {
  historial = ["Bogotá", "Madrid", "Samacá"];

  constructor() {
    //TODO: LEER DB SI EXISTE
  }

  async ciudad(lugar = "") {
    try {
      const response = await axios.get("https://reqres.in/api/users?page=2");
    } catch (error) {
        
        return [];
    }
    console.log(response);

    return []; //retornar los lugares que coincidan
  }
}

module.exports = Busquedas;
