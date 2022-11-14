const fs = require('fs');
const axios = require("axios");


class Busquedas {
  historial = [];
  dbPath = './db/database.json';

  constructor() {
    this.leerDB()
  }

  get historialCapitalizado(){
    return this.historial.map(lugar => {
    let i = 0;
    let total = '';
    let hayEspacio = false;
    for( let letra of lugar){

      if(i == 0){
        total += letra.toUpperCase();
      }else if(!!hayEspacio){
        total += letra.toUpperCase();
        hayEspacio = false;
      }else{
        total += letra;
      }
      if(letra == ' '){
        hayEspacio = true;
      }
      i += 1;
    }
      return total;
    });
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

  agregarHistorial(lugar = ''){
    
      lugar.array.forEach(element => {
        
      });
    if(this.historial.includes(lugar.toLowerCase())){
      return;
    }
    this.historial.unshift(lugar.toLocaleLowerCase());

    this.guardarDB();
    //prevenir dublicidad 
    //grabar en db o txt
  }

  guardarDB(){
    const payload = {
      historial: this.historial
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }
  leerDB(){
    if(!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, {
      encoding: 'utf-8'
    });
    const data = JSON.parse(info).historial;

    this.historial = data;
  }
}

module.exports = Busquedas;
