import { useEffect, useState } from 'react';
import axios from 'axios';

import { getTemperatureHue, getTemperaturePercentage } from '../../utils';

import './style.scss';

/*
  TODO:
  - mettre en place un système de loading
  - utiliser les icônes de OpenWeather
      - const { icon, description } = response.data.weather[0]
      - dans le JSX

      ```jsx
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
      ```

  - dynamiser la ville (utilisation des props ou autre ?)
    → input ?
    → géolocalisation ?
    → map picker ?

  Doc API : https://openweathermap.org/current
*/

function Meteo() {
  const [temperature, setTemperature] = useState(null);

  const percent = getTemperaturePercentage(temperature);
  const hue = getTemperatureHue(percent);

  const url = process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_API_URL}&q=saint-etienne&zip=42000,fr`
    : process.env.REACT_APP_API_URL;

  useEffect(() => {
    console.log(url);
    axios.get(url)
      .then((response) => {
        console.log(response.data);
        setTemperature(response.data.main.temp);
      })
      .catch(console.error);
  }, [url]);

  return (
    <article className="meteo">
      <div className="meteo-container">
        <div className="meteo-infos">
          <h3 className="meteo-city">Saint-Étienne</h3>
          <p className="meteo-code">42000</p>
        </div>

        <p
          className="meteo-temperature"
          style={{
            color: `hsl(${hue}, 90%, 40%)`,
          }}
        >
          {Math.round(temperature)} °C
        </p>
      </div>

      <div className="meteo-thermometer">
        <div
          className="meteo-thermometer-inside"
          style={{
            backgroundColor: `hsl(${hue}, 90%, 40%)`,
            width: `${percent}%`,
          }}
        />
      </div>

      {/* <div
        style={{
          width: '100%',
          height: '20px',
          marginTop: '50px',
          background: `linear-gradient(
            to right,
            hsl(230, 90%, 40%) 0%,
            hsl(207, 90%, 40%) 10%,
            hsl(184, 90%, 40%) 20%,
            hsl(161, 90%, 40%) 30%,
            hsl(138, 90%, 40%) 40%,
            hsl(115, 90%, 40%) 50%,
            hsl(92, 90%, 40%) 60%,
            hsl(69, 90%, 40%) 70%,
            hsl(46, 90%, 40%) 80%,
            hsl(23, 90%, 40%) 90%,
            hsl(0, 90%, 40%) 100%
          )`,
        }}
      /> */}
    </article>
  );
}

export default Meteo;
