import React, { useState } from "react";
import getCountryName from "./countries";
import GetTime from "./time";
import NextFiveDays from "./nextDaysForecast";
// import "../reset.css";

function Weather(props) {
  const [icon, setIcon] = useState("");
  let country = getCountryName(props.country.toUpperCase());
  const cur_time = GetTime(props.value.timezone);
  let unit = country ? (props.unit === "metric" ? "°C" : "°F") : "";
  getIcon(props.value.icon);

  async function getIcon(iconName) {
    if (iconName) {
      const iconApi = await fetch(
        `https://openweathermap.org/img/w/${iconName}.png`,
        {
          mode: "cors",
        }
      );
      setIcon(iconApi.url);
    }
  }

  const nextFiveDays = props.forecast.map((item, idx) => (
    <NextFiveDays key={idx} id={idx} value={item} unit={unit} />
  ));

  return (
    <div>
      <div className="d-flex justify-content-around align-items-center text-light mt-3">
        <div>
          <h2>
            {props.value.cityName}
            {country ? ", " : ""}
            {country}
          </h2>
          <p>{country ? "as of " + cur_time : ""}</p>
          <h1 className="mb-0">
            {props.value.temp}
            {unit}
          </h1>
          <h3>{props.value.description}</h3>
          <h4>
            Feels like: {props.value.feels_like}
            {unit}
          </h4>
        </div>
        <div>
          <img
            id="wicon"
            style={{ width: 120, height: 120 }}
            src={icon}
            alt="Weather icon"
          ></img>
          <div className="d-flex">
            <h4>
              {props.value.temp_max}
              {unit}
            </h4>
            <h4 className="px-3">/</h4>
            <h4>
              {props.value.temp_min}
              {unit}
            </h4>
          </div>
        </div>
      </div>
      <div className="bg-light my-3 p-3 radius opacity">
        <h2>Daily Forecast</h2>
        <div className="d-flex">{nextFiveDays}</div>
      </div>
    </div>
  );
}

export default Weather;
