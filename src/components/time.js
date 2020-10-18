function GetTime(timezone) {
  let d = new Date();
  let localTime = d.getTime(); // returns the number of milliseconds*
  let localOffset = d.getTimezoneOffset() * 60000; // 60000 convert offset to minute
  console.log(localTime, "localTime");
  console.log(localOffset, "localOffset");
  let utc = localTime + localOffset;
  let cur_localtime = utc + 1000 * timezone; // Obtain destination city's offset in hours and convert to milliseconds
  //1000 will result in the first millisecond of the next second, https://www.w3schools.com/jsref/jsref_utc.asp
  let time = new Date(cur_localtime);
  let h = checkTime(time.getHours());
  let m = checkTime(time.getMinutes());
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

  // handle edge case where 05 AM should be 5 AM
  h = h.toString();
  h = h.length === 2 && h[0] === "0" ? h.slice(1) : h;

  return h + ":" + m + " " + meridian;
}

function checkTime(i) {
  return i < 10 ? "0" + i : i;
}

export default GetTime;
