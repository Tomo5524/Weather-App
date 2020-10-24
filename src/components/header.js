import React, { useState, useRef, useEffect } from "react";
import Weather from "./weather";
// import Navbar from "react-bootstrap/Navbar";
import Switch from "react-switch";
import { Button, FormControl, Form } from "react-bootstrap";

export default function Header() {
  const [unit, setToggleSwitch] = useState("metric");
  // console.log(unit, "unit/////////////////////////////");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [nextFiveDays, setNextFiveDays] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [weather, setWeather] = useState({
    temp: "",
    feels_like: "",
    temp_min: "",
    temp_max: "",
    description: "",
    humidity: "",
    // country: "",
    cityName: "",
    dt: 0,
    timezone: 0,
  });

  const handleChange = (e) => {
    // onChange, each time user enters, userInput gets updated
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    // fires when submit gets clicked
    // set city to userInput
    setCity(userInput);
  };

  const handleSwitchChange = () => {
    // avoid showing no location message when there is no valid city to look up
    // avoid switicing toggle there is no valid city
    if (no_location.current.classList.contains("no-display")) {
      setToggleSwitch(unit === "metric" ? "imperial" : "metric");
    }
  };

  useEffect(() => {
    // get 2 API calls in the same function
    // first get Latitude and Longitude, then call another API with lat and lon
    async function getWeather() {
      try {
        const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
        let cityName = "";
        // Fecth firsst API
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`,
          {
            mode: "cors",
          }
        );
        // convert to json

        let data = await response.json();
        // Store the post data to a variable
        let lat = data.coord.lat;
        let lng = data.coord.lon;
        setCountry(data.sys.country);
        cityName = data.name;

        // Fetch another API
        let weather_res = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,alerts&appid=${APIKey}&units=${unit}`,
          {
            mode: "cors",
          }
        );

        let res = await weather_res.json();
        let { temp, feels_like, humidity, weather } = res.current;
        setWeather({
          temp: Math.round(temp),
          feels_like: Math.round(feels_like),
          temp_min: Math.round(res.daily[0].temp.min),
          temp_max: Math.round(res.daily[0].temp.max),
          description: weather[0].description,
          humidity: humidity,
          cityName: cityName,
          dt: res.dt,
          timezone: res.timezone_offset,
          icon: weather[0].icon,
        });
        // get arrays of next five days
        setNextFiveDays(res.daily.slice(1, 6));
        hideDiv(no_location);
        ShowDiv(locationFound);
      } catch (e) {
        error.current.classList.add("display");
        setTimeout(() => {
          error.current.classList.remove("display");
        }, 2000);
        hideDiv(locationFound);
        setTimeout(() => {
          ShowDiv(no_location);
        }, 2000);
      }
    }
    if (city) {
      getWeather();
    }
  }, [unit, city]);

  /////// calling multiple API calls asynchronouslly (but looks like synchronously) with out async and await
  // if (city) {
  //   // const APIGeoKey = process.env.REACT_APP_Geo_API_KEY;
  //   const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
  //   let cityName = "";
  //   fetch(
  //     `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
  //   )
  //     .then(function (response) {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         return Promise.reject(response);
  //       }
  //     })
  //     .then(function (data) {
  //       console.log(data, "data of lat and lng////");
  //       // Store the post data to a variable
  //       let lat = data.coord.lat;
  //       let lng = data.coord.lon;
  //       setCountry(data.sys.country);
  //       cityName = data.name;

  //       // Fetch another API
  //       // console.log(
  //       //   `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,alerts&appid=${APIKey}&units=${unit}`
  //       // );
  //       return fetch(
  //         `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,alerts&appid=${APIKey}&units=${unit}`
  //       );
  //     })
  //     .then(function (response) {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         return Promise.reject(response);
  //       }
  //     })
  //     .then(function (res) {
  //       console.log(res, "response of weather////");
  //       let { temp, feels_like, humidity, weather } = res.current;
  //       console.log(temp, feels_like, humidity, weather);
  //       console.log(Math.round(res.daily[0].temp.min), "min temp");
  //       setWeather({
  //         temp: Math.round(temp),
  //         feels_like: Math.round(feels_like),
  //         temp_min: Math.round(res.daily[0].temp.min),
  //         temp_max: Math.round(res.daily[0].temp.max),
  //         description: weather[0].description,
  //         humidity: humidity,
  //         cityName: cityName,
  //         dt: res.dt,
  //         timezone: res.timezone_offset,
  //         icon: weather[0].icon,
  //       });
  //       setNextFiveDays(res.daily.slice(1, 6));
  //       console.log("weather fetched ////////////");

  //       hideDiv(no_location);
  //       ShowDiv(locationFound);
  //     })
  //     .catch(function (e) {
  //       console.log(e, "not valid");

  //       error.current.classList.add("display");
  //       setTimeout(() => {
  //         error.current.classList.remove("display");
  //       }, 2000);
  //       hideDiv(locationFound);
  //       setTimeout(() => {
  //         ShowDiv(no_location);
  //       }, 2000);
  //     });
  // }

  function ShowDiv(div) {
    div.current.classList.remove("no-display");
  }

  function hideDiv(div) {
    console.log(div);
    div.current.classList.add("no-display");
  }

  let error = useRef(); // grab html element
  let no_location = useRef();
  let locationFound = useRef();

  return (
    <div>
      <nav className="nav bg-custom radius justify-content-between p-4 align-items-center">
        <h2 className="pb-3">Weather App</h2>
        <div>
          <div className="d-flex align-items-center">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={handleChange}
            />
            <Button variant="outline-success" onClick={handleClick}>
              Search
            </Button>
          </div>
          <div ref={error} className="error-container d-block pb-3">
            <p className="m-0">Location Not Found</p>
          </div>
        </div>

        <Switch
          className="switch pb-3"
          boxShadow="3px 3px 5px #c8c8c8"
          offColor="#f2f2f2"
          onColor="#f2f2f2"
          uncheckedIcon={<span className="switch-icon">°F</span>}
          checkedIcon={<span className="switch-icon">°C</span>}
          onChange={handleSwitchChange}
          // what is checked?
          checked={unit === "metric"}
        />
      </nav>
      {/* end of nav and moves to main div */}
      <div ref={no_location} className="text-center pt-5">
        <h1>
          No Location found...😭
          {/* <p style={{ fontSize: 100, color: "yellow" }}> 128575</p> */}
        </h1>
      </div>
      <div ref={locationFound} className="no-display">
        <Weather
          value={weather}
          unit={unit}
          country={country}
          forecast={nextFiveDays}
        />
      </div>
    </div>
  );
}
