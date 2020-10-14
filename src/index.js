import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "./reset.css";
import "bootstrap/dist/css/bootstrap.min.css"; // needs this for bootstrap to work

ReactDOM.render(
  // what does this mean
  //   <React.StrictMode>
  //     <Routes />
  //   </React.StrictMode>,
  <App />,
  document.getElementById("root")
);
