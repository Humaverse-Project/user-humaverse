import Navigation from "./Navigation";
import { ThemeProvider } from '@mui/material/styles';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {theme} from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  </ThemeProvider>
  </React.StrictMode>
);
