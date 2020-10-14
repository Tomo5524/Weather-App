import React, { useState, useEffect } from "react";
import Switch from "react-switch";
// import Navbar from "react-bootstrap/Navbar";
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
  const [toggle, setSwitch] = useState(false);
  const [search, setSearch] = useState("");

  const handleSwitchChange = () => {
    console.log(!toggle);
    setSwitch(!toggle);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const getCity = (search) => {};

  return (
    <div>
      <nav className="nav bg-light justify-content-between align-items-center">
        <h2>Weather App</h2>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={handleChange}
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <div className="d-flex">
          <span className="mx-2">°F</span>
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customSwitches"
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
        </div>
      </nav>
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
