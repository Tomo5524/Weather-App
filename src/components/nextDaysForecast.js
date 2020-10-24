import React, { useState } from "react";

function NextFiveDays(props) {
  const [icon, setIcon] = useState("");
  let date = new Date(props.value.dt * 1000);
  // console.log(date, "date");
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let max_temp = props.value.temp.max;
  let max_temp_rounded = Math.round(max_temp);
  let min_temp = props.value.temp.min;
  let min_temp_rounded = Math.round(min_temp);
  getIcon(props.value.weather[0].icon);

  async function getIcon(iconName) {
    if (iconName) {
      const iconApi = await fetch(
        `https://openweathermap.org/img/w/${iconName}.png`
      );
      setIcon(iconApi.url);
    }
  }

  return (
    <div
      className={
        "m-2 text-center flex-grow-1 " + (props.id !== 4 ? "border-right" : "")
      }
    >
      <h4>
        {month}/{day}
      </h4>
      <h3>
        {max_temp_rounded}
        {props.unit}
      </h3>
      <h5>
        {min_temp_rounded}
        {props.unit}
      </h5>
      <img
        id="wicon"
        style={{ width: 70, height: 70 }}
        src={icon}
        alt="Weather icon"
      ></img>
      <h5>Humidity: {props.value.humidity}%</h5>
    </div>
  );
}

export default NextFiveDays;
