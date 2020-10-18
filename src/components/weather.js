import React from "react";
import getCountryName from "./countries";
import GetTime from "./time";

function Weather(props) {
  console.log(props, "props in Weather");
  console.log(props.value.temp);
  let country = getCountryName(props.value.country);

  const cur_time = GetTime(props.value.timezone);
  // console.log(cur_time, "time////////////");
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
