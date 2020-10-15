import React from "react";

function Weather(props) {
  console.log(props.value);
  // console.log(props.value.name);
  return (
    <div>
      <h3>{props.value}</h3>
      {props.value}
    </div>
  );
}

export default Weather;
