import React from "react";
import ReactDOM from "react-dom";
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  theme,
} from "@chakra-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryCacheProvider } from "react-query";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { queryCache } from "./reactQuery";

const defaultTheme = {
  ...theme,
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <ColorModeProvider>
        <CSSReset />
        <Router>
          <ReactQueryCacheProvider queryCache={queryCache}>
            <App />
          </ReactQueryCacheProvider>
        </Router>
      </ColorModeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
