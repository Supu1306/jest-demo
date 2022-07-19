import { render as RTL, screen } from "@testing-library/react";
import React from "react";
import PostList from "./PostList";
import * as reactQuery from "react-query";
import { BrowserRouter } from "react-router-dom";
import { useColorMode, useTheme } from "@chakra-ui/core";
import { setupServer } from "msw/node"
import { rest } from "msw"
import {createMemoryHistory} from "history"
import { Router } from "react-router-dom";
//import { ReactQueryCacheProvider } from "react-query";
//import { queryCache } from "./reactQuery";

import {
    ThemeProvider,
    CSSReset,
    ColorModeProvider,
    theme
  } from "@chakra-ui/core";
const {ReactQueryCacheProvider,QueryCache} = reactQuery
const render = (component, option = {}) => {

    
    const queryCache = new QueryCache();
    const history = createMemoryHistory();
    return RTL(  <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Router history={history}>
            <ReactQueryCacheProvider queryCache={queryCache}>
              {component}
            </ReactQueryCacheProvider>
          </Router>
        </ColorModeProvider>
      </ThemeProvider>,
        option);
}

export {render}