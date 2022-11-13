const axios = require("axios");

class Busquedas {
  historial = ["Bogotá", "Madrid", "Samacá"];

  constructor() {
    //TODO: LEER DB SI EXISTE
  }

  get paramsMapbox() {
    return {
      limit: 5,
      language: "es",
      access_token: process.env.MAPBOX_KEY, // Se consulta el valor de la variable de entorno
    };
  }

  async ciudad(lugar = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });
      const response = await instance.get();
      return response.data.features.map((feature) => ({
        id: feature.id,
        nombre: feature.place_name,
        lng: feature.center[0],
        lat: feature.center[1],
      }));
    } catch (error) {
      console.log(e);
      return [];
    }
    console.log(response);

    return []; //retornar los lugares que coincidan
  }
}

module.exports = Busquedas;
