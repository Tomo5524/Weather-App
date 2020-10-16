import React from "react";
import getCountryName from "./countries";

function Weather(props) {
  console.log(props, "props in Weather");
  console.log(props.value.temp);
  let country = getCountryName(props.value.country);
  console.log(country);
  let cur_time = new Date().toLocaleTimeString();
  let unit = country ? (props.unit === "metric" ? "°C" : "°F") : "";

  return (
    <div>
      {/* <h3>{props.value}</h3> */}
      <h2>
        {props.value.city}
        {country ? ", " : ""}
        {/* when there is no country set, nothing should appear on screen */}
        {country}
      </h2>
      <p>{country ? "as of " + cur_time : ""}</p>
      <h1>
        {props.value.temp}
        {unit}
      </h1>
      <h3>
        {props.value.feels_like}
        {unit}
      </h3>
      <h3>
        {props.value.temp_max}
        {unit}
      </h3>
      <h3>
        {props.value.temp_min}
        {unit}
      </h3>
    </div>
  );
}

export default Weather;
