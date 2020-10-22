import React, { useState, useRef, useEffect } from "react";
import Weather from "./weather";
// import Navbar from "react-bootstrap/Navbar";
import Switch from "react-switch";
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";

export default function Header() {
  const [unit, setToggleSwitch] = useState("metric");
  console.log(unit, "unit/////////////////////////////");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [geo, setGeo] = useState({
    lat: 0,
    lng: 0,
  }); // get from openCage
  // const [lat, setLat] = useState(0);
  // const [lng, setLng] = useState(0);
  // console.log(geo.lat, geo.lng, "lat lng /////////////////////////////");
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

  // const [weather, setWeather] = useState();

  const getAllDigitsBeforeDecimals = (num) => {
    // console.log(typeof num);
    const str_num = num.toString();
    let new_num = "";
    for (let i = 0; i < str_num.length; i++) {
      if (str_num[i] === ".") return new_num;
      new_num += str_num[i];
      // console.log(new_num, "new_num");
    }
    // needs this new_num for when num has no decimal e.g. 12°C
    return new_num;
  };

  const handleChange = (e) => {
    // console.log(toggle);
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    console.log("submitted");
    setCity(userInput);
    // setUserInput("");
  };

  const handleSwitchChange = () => {
    // avoid showing no location message when there is no valid city to look up
    // avoid switicing toggle there is no valid city
    if (no_location.current.classList.contains("no-display")) {
      setToggleSwitch(unit === "metric" ? "imperial" : "metric");
    }
  };

  useEffect(() => {
    async function getWeather() {
      console.log("getWeather fired");
      console.log(lat, lng, "lat and lng in get weather");
      const APIKey = process.env.REACT_APP_WEATHER_API_KEY;

      // console.log(cur_unit, "cur_unit in getweather/////////");
      console.log(unit, "unit in getweather/////////");

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${geo.lat}&lon=${geo.lng}&exclude=minutely,hourly,alerts&appid=${APIKey}&units=${unit}`
        );
        // console.log(
        //   `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=${unit}`
        // );

        let data = await response.json();
        console.log(data, "//////////////////////  weather ");
        let { temp, feels_like, humidity, weather } = data.current;
        setWeather({
          temp: getAllDigitsBeforeDecimals(temp),
          feels_like: getAllDigitsBeforeDecimals(feels_like),
          temp_min: getAllDigitsBeforeDecimals(data.daily[0].min),
          temp_max: getAllDigitsBeforeDecimals(data.daily[0].max),
          description: weather[0].description,
          humidity: humidity,
          // country: data.sys.country,
          cityName: data.name,
          dt: data.dt,
          timezone: data.timezone_offset,
          icon: data.weather[0].icon,
        });
        // no_location.classList.add("no-display");
        // locationFound.classList.remove("no-display");
        hideDiv(no_location);
        ShowDiv(locationFound);
        // reset city
        // userInput("");
      } catch (e) {
        // clean up display when there is no city

        // fires when json returns 404
        console.log("not valid");
        // console.log(locationFound, "locationFound");
        // locationFound.classList.add("no-display");
        // no_location.classList.remove("no-display");
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
    // if city not checked, this useEffect fires right after application opens.
    if (city) {
      const res = getLatAndLng();
      res.then((res) => {
        console.log(res, "res ///////////");
        setGeo(res.results[0].geometry.lat, res.results[0].geometry.lng);
        // getWeather(res.results[0].geometry.lat, res.results[0].geometry.lng);
      });
      // console.log(res, "res ///////////");
      // setCountry(res.results[0].components.country_code);
      // // then((data) => {
      // //   console.log(data);
      // // });
      // // console.log(res, "res///////////////////////");
      // // let lat = res.lat;
      // // let lng = res.lng;
      // // console.log(lat, lng, "lat and lng before get weather");
      // getWeather(res.results[0].geometry.lat, res.results[0].geometry.lng);
    }
    // console.log(geo.lat, geo.lng, "lat lng /////////////////////////////");
    // if (geo.lat !== 0 && geo.lng !== 0) {
    //   console.log("weahter fired");
    //   getWeather();
    // }
  }, [unit, city, geo]);

  async function getLatAndLng() {
    // return this function
    console.log("geodata fired");
    const APIKey = process.env.REACT_APP_Geo_API_KEY;

    let queryPath = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${APIKey}`;
    return fetch(queryPath).then((response) => response.json());

    // fetch(
    //   `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${APIKey}`
    // )
    //   .then((response) => response.json())
    //   .then((response) => response);

    // console.log(
    //   `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${APIKey}`
    // );

    // let data = await response.json();
    // console.log(data, "lat log data///////////////////");
    // console.log(data.results);
    // console.log(data.results[0].geometry);
    // setCountry(data.results[0].components.country_code);
    // let geo_arr = [data.results[0].geometry.lat, data.results[0].geometry.lng];
    // console.log(geo_arr, "geo_arr");
    // return data;
    // setGeo({
    //   country: data.results[0].components.country_code,
    //   lat: data.results[0].geometry.lat,
    //   lng: data.results[0].geometry.lng,
    // });
    // setCountry(data.results[0].components.country_code);
    // setLat(data.results[0].geometry.lat);
    // setLng(data.results[0].geometry.lng);
  }

  function ShowDiv(div) {
    div.current.classList.remove("no-display");
  }

  function hideDiv(div) {
    console.log(div);
    div.current.classList.add("no-display");
  }

  //   // promise
  //   fetch(
  //     `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=${unit}`
  //   )
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       let { temp, feels_like, temp_max, temp_min, humidity } = data.main;
  //       // setWeather(data.main.temp);
  //       setWeather({
  //         temp: getAllDigitsBeforeDecimals(temp),
  //         feels_like: getAllDigitsBeforeDecimals(feels_like),
  //         temp_min: getAllDigitsBeforeDecimals(temp_min),
  //         temp_max: getAllDigitsBeforeDecimals(temp_max),
  //         humidity: humidity,
  //         city: data.name,
  //         country: data.sys.country,
  //       });

  let error = useRef(); // grab html element
  let no_location = useRef();
  let locationFound = useRef();

  return (
    <div>
      <nav className="nav bg-custom radius justify-content-between p-4 align-items-center">
        <h2 className="pb-3">Weather App</h2>
        {/* when clicking enter, page refreshes why?? */}
        <Form>
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
        </Form>
        {/* <div className="d-flex">
            <span className="mx-2">°F</span>
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitches"
                style={{cursor:"pointer"}}
                checked={toggle}
                onChange={handleSwitchChange}
              />
              <label
                className="custom-control-label mx-2"
                htmlFor="customSwitches"
              >
                °C
              </label>
            </div>
          </div> */}
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
        <Weather value={weather} unit={unit} country={country} />
      </div>
    </div>

    // <Navbar bg="light" expand="col">
    //   <Navbar.Brand style={{ fontSize: "2rem" }} href="#home">
    //     Weather APP
    //   </Navbar.Brand>
    //   <Form inline className="justify-content-center">
    //     <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    //     <Button variant="outline-success">Search</Button>
    //   </Form>
    // </Navbar>
  );
}
