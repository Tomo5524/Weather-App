import React, { useState } from "react";
import getCountryName from "./countries";
import GetTime from "./time";
// import "../reset.css";

function Weather(props) {
  const [icon, setIcon] = useState("");

  console.log(props, "props in Weather");
  console.log(props.value.icon, "icon");
  let country = getCountryName(props.value.country);

  const cur_time = GetTime(props.value.timezone);
  // console.log(cur_time, "time////////////");
  let unit = country ? (props.unit === "metric" ? "°C" : "°F") : "";
  let iconUrl = getIcon(props.value.icon);

  // let iconurl = `http://openweathermap.org/img/w/${props.value.icon}.png`;
  // console.log(iconurl);
  // let image = useRef();
  // image.current.src = iconurl;

  async function getIcon(iconName) {
    if (iconName) {
      const iconApi = await fetch(
        "http://openweathermap.org/img/w/" + iconName + ".png"
      );
      setIcon(iconApi.url);
    }
  }

  return (
    <div className="d-flex justify-content-around align-items-center text-light mt-3">
      <div>
        {/* <h3>{props.value}</h3> */}
        <h2>
          {props.value.cityName}
          {country ? ", " : ""}
          {/* when there is no country set, nothing should appear on screen */}
          {country}
        </h2>
        <p>{country ? "as of " + cur_time : ""}</p>
        {/* line height should be smaller? */}
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
  );
}

export default Weather;
