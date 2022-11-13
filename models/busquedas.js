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

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER,
      units: "metric",
      lang: "es",
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
  async climaPorLugar(lat, lon) {
    let respuesta = {};
    try {
      //crear instacia de axios
      const instance = await axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        params: { ...this.paramsWeather, lat, lon },
      });
      const { data } = await instance.get();
      respuesta = {
        descripcion: data.weather[0].description,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        temp: data.main.temp,
      };
      // respuesta -> extrer la data ,, descripción "nubes", temperatura mimina maxima normal
    } catch (error) {
      console.log("Ocurrió un error", error);
    }
    return respuesta;
  }
}

module.exports = Busquedas;
