import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  Box,
  IconButton,
  useColorMode,
  useDisclosure,
  useTheme,
} from "@chakra-ui/core";
import { MdDehaze } from "react-icons/md";

import PostList from "./pages/PostList";
import PostEdit from "./pages/PostEdit";
import PostDetail from "./pages/PostDetail";

function App() {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();

  return (
    <Box h="100%">
      <Switch>
        <Route exact path="/">
          <Redirect to="/posts" />
        </Route>
        <Route path="/posts/new">
          <PostEdit />
        </Route>

        <Box h="100%">
          <Box
            d="flex"
            padding=".4rem"
            minHeight="40px"
            borderBottom={
              colorMode === "dark"
                ? `1px solid ${theme.colors.gray["700"]}`
                : "1px solid #ccc"
            }
            justifyContent={{
              sm: "space-between",
              md: "flex-end",
            }}
          >
            <IconButton
              display={{
                sm: "block",
                md: "none",
              }}
              onClick={onToggle}
              icon={MdDehaze}
            />
            <IconButton icon="moon" onClick={toggleColorMode} />
          </Box>
          <Box
            maxW={{
              sm: "100%",
              md: "80%",
              lg: "60%",
            }}
            padding={{
              sm: "2rem",
              md: "0",
            }}
            h="100%"
            marginX="auto"
            display="flex"
          >
            <Route path="/posts">
              <PostList isDrawerOpen={isOpen} closeDrawer={onClose} />
            </Route>
            <Route path="/posts/:postId">
              <PostDetail />
            </Route>
          </Box>
        </Box>
      </Switch>
    </Box>
  );
}

export default App;
