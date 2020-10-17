import React from "react";
import getCountryName from "./countries";

function Weather(props) {
  console.log(props, "props in Weather");
  console.log(props.value.temp);
  let country = getCountryName(props.value.country);

  // Date.UTC(year[, month[, day[, hour[, minute[, second[, millisecond]]]]]])
  // Date.UTC(96,     1,      2,    3,      4,      5)

  const localTime = new Date();
  let m = localTime.getMonth();
  let d = localTime.getDay();
  let h = localTime.getHours();
  let minutes = localTime.getMinutes();
  let date = new Date(Date.UTC(m, d, h, minutes));

  console.log(date, "local_time");
  let c_name = props.value.country;
  if (c_name) {
    console.log(date.toLocaleString("en-" + c_name));
  }

  // console.log(local_time.toLocaleString("en-US"));
  console.log(props.value.country);
  console.log(`en-${props.value.country}`, "yaaaaaaaaaaaaaaaaaaaaaaaa");

  console.log(country);
  // let cur_time = new Date().toLocaleTimeString();
  // let t = new Date();
  // console.log(t.toLocaleTimeString(), "time////////////");
  let cur_time = getTime();

  function getTime() {
    const today = new Date();
    let h = checkTime(today.getHours());
    let m = checkTime(today.getMinutes());
    let meridian;
    if (h > 12) {
      meridian = "PM";
      h -= 12;
    } else if (h < 12) {
      meridian = "AM";
      if (h == 0) {
        h = 12;
      }
    } else {
      meridian = "PM";
    }
    return h + ":" + m + " " + meridian;
  }

  function checkTime(i) {
    return i < 10 ? "0" + i : i;
  }

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
