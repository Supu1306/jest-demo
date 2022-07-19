import { List, ListItem, useColorMode, useTheme } from "@chakra-ui/core";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Get } from "../Utils/JSONUtil";

const CommentList = ({ postId }) => {
  const { isLoading, error, data, refetch } = useQuery("commentlist", () => {
    return Get(`http://localhost:3002/comments?postId=${postId}`);
  });

  const { colorMode } = useColorMode();
  const theme = useTheme();

  useEffect(() => {
    refetch();
  }, [postId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <List marginBottom=".8rem" ml=".8rem">
      {data.data.map((commentItem) => {
        return (
          <ListItem
            padding=".9rem"
            mt=".9rem"
            boxShadow="md"
            bg={
              colorMode === "dark"
                ? theme.colors.gray["900"]
                : theme.colors.gray["100"]
            }
            key={commentItem.id}
          >
            {commentItem.content}
          </ListItem>
        );
      })}
    </List>
  );
};

export default CommentList;
