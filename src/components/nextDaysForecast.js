import React from "react";

function NextFiveDays(props) {
  console.log(props, "props in next five days");
  console.log(props.id, "id in next five days");
  console.log(props.value.dt, "dt from props");
  let date = new Date(props.value.dt * 1000);
  console.log(date, "date");
  let day = date.getDate();
  let month = date.getMonth() + 1;
  console.log(day, month, "day and month");
  return (
    <div
      className={"m-2 radius bg-white text-center flex-grow-1"}
      //   apply opacity to bg
      //   id={props.value.name}
    >
      <h3>
        {month}/{day}
      </h3>
    </div>
  );
}

export default NextFiveDays;
