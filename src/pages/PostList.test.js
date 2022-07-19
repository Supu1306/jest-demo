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

import {render} from "../Utils/testUtil"

import {
    ThemeProvider,
    CSSReset,
    ColorModeProvider,
    theme
  } from "@chakra-ui/core";

const {ReactQueryCacheProvider,QueryCache} = reactQuery
//jest.mock("react-query");
const defaultTheme = {
    ...theme,
  };
const server = setupServer(rest.get("http://localhost:3002/posts",(req,res,ctx)=>{
    return res(ctx.json([
        { id: 1, title: "API Dummy title" },
        { id: 2, title: "API Another Dummy title" },
        { id: 3, title: "API Test Another Dummy title" },
      ]));
}));
/*
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
*/
//Arrange Act Assertion

describe("PostList", () => {

        let useQuery = null;
    beforeAll(()=>{
        useQuery = jest.spyOn(reactQuery,'useQuery');
        server.listen()
    })
    /*
    beforeEach(()=>{
        log = jest.spyOn(reactQuery, 'useQuery').mockImplementation(()=>{
            console.error()
        })
    })
    */
   beforeEach(()=>{
    server.resetHandlers()
    useQuery.mockClear();
   });

   afterAll(()=>{
    server.close();
   })
  it("When isLoading is true then loading text should be displayed", () => {
    //Arrange
    useQuery.mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    useColorMode.mockReturnValue({ colorMode: "dark-mode" });
    useTheme.mockReturnValue({});
    //Act
    render(<PostList isDrawerOpen={false} closeDrawer={jest.fn()} />);
    //Assertion
    //const text = screen.queryByText("Loading..").innerHTML

    //queryby is better than getBy as it checks in a loop kind of thing
    //if the item can be null then use QueryBy
    //if the item has to staY There use getBy

    const text = screen.queryByTestId("loading-text");
    expect(text).toHaveTextContent("Loading..");
  });

  it("When is loading is false and data exist then render list of data", () => {
    //Arrange
    useQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        data: [
          { id: 1, title: "Dummy title" },
          { id: 2, title: "Another Dummy title" },
          { id: 3, title: "Test Another Dummy title" },
        ],
      },
    });

    useColorMode.mockReturnValue({ colorMode: "light" });

    useTheme.mockReturnValue({});

    //Act
    render(
      <BrowserRouter>
        <PostList isDrawerOpen={false} closeDrawer={jest.fn()} />
      </BrowserRouter>
    );
    const data = screen.getAllByTestId("list-item").map((li) => li.textContent);
    console.log(data);

    expect(data).toMatchInlineSnapshot(`
      Array [
        "Dummy title",
        "Another Dummy title",
        "Test Another Dummy title",
      ]
    `);
  });

  it("When API call made to POST Endpoint", async()=>{

    useQuery.mockRestore();
    useColorMode.mockReturnValue({ colorMode: "light" });

    useTheme.mockReturnValue({});

    //Act
    render(
      <BrowserRouter>
        <PostList isDrawerOpen={false} closeDrawer={jest.fn()} />
      </BrowserRouter>
    );

    //await waitForElementToBeRemoved(() => screen.getByTestId("loading-text"));
    //const data = screen.getAllByTestId("list-item").map((li) => li.textContent);
    //expect(data).toMatchInlineSnapshot()
  });
});
