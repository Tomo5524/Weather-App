import React, { useState, useEffect } from "react";
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
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({
    temp: "",
    feels_like: "",
    temp_min: "",
    temp_max: "",
    humidity: "",
    country: "",
  });

  // const [weather, setWeather] = useState();

  // const handleSwitchChange = () => {
  //   // console.log(!toggle);
  //   // setSwitch(!toggle);
  //   // true denotes metric
  //   toggle === "metric"
  //     ? setToggleSwitch("imperial")
  //     : setToggleSwitch("metric");
  // };

  const getAllDigitsBeforeDecimals = (num) => {
    console.log(typeof num);
    const str_num = num.toString();
    let new_num = "";
    for (let i = 0; i < str_num.length; i++) {
      if (str_num[i] === ".") return new_num;
      new_num += str_num[i];
      // console.log(new_num, "new_num");
    }
  };

  const handleChange = (e) => {
    // console.log(toggle);
    setCity(e.target.value);
  };

  const getWeather = () => {
    // e.preventDefault();
    const APIKey = "edffd1bf975a74d5d10e58c5ac8be2d3";
    // fetch(`api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)  did not work because this did not have http in the beginning

    // promise
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=${unit}`
    )
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let { temp, feels_like, temp_max, temp_min, humidity } = data.main;
        // setWeather(data.main.temp);
        setWeather({
          temp: getAllDigitsBeforeDecimals(temp),
          feels_like: getAllDigitsBeforeDecimals(feels_like),
          temp_min: getAllDigitsBeforeDecimals(temp_max),
          temp_max: getAllDigitsBeforeDecimals(temp_min),
          humidity: humidity,
          city: data.name,
          country: data.sys.country,
        });
        // console.log(
        //   `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=${unit}`
        // );
        console.log(data);
      });
  };

  // async function getWeather () {
  //   fetch()
  // }

  return (
    <div>
      <nav className="nav bg-light justify-content-between p-4 align-items-center">
        <h2>Weather App</h2>
        {/* when clicking enter, page refreshes why?? */}
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={handleChange}
          />
          <Button variant="outline-success" onClick={getWeather}>
            Search
          </Button>
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
          className="switch"
          boxShadow="3px 3px 5px #c8c8c8"
          offColor="#f2f2f2"
          onColor="#f2f2f2"
          uncheckedIcon={<span className="switch-icon">°F</span>}
          checkedIcon={<span className="switch-icon">°C</span>}
          onChange={() =>
            unit === "metric"
              ? setToggleSwitch("imperial")
              : setToggleSwitch("metric")
          }
          // what is checked?
          checked={unit === "metric"}
        />
      </nav>
      {/* end of nav and moves to main div */}
      <Weather value={weather} unit={unit} />
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
