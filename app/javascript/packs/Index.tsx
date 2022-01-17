import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import * as React from "react";
import { render } from "react-dom";
import App from "../components/App";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <App />,
    document.body.appendChild(document.createElement("div"))
  );
});