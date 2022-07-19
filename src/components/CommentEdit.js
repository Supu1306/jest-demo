import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  DarkMode,
} from "@chakra-ui/core";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { queryCache } from "../reactQuery";
import { Post } from "../Utils/JSONUtil";

const createComment = ({ content, postId }) => {
  return Post("http://localhost:3002/comments", { content, postId });
};

const CommentEdit = ({ postId }) => {
  const [content, setContent] = useState("");

  const [mutate] = useMutation(createComment);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("===");

    mutate({ content, postId }).then(() => {
      setContent("");

      queryCache.refetchQueries(["commentlist"]);
    });

    // Post API Call
  };

  return (
    <Box marginX=".4rem">
      <form onSubmit={onSubmitHandler}>
        <FormControl>
          <FormLabel htmlFor="content">Comment Content</FormLabel>
          <Input
            type="text"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            aria-describedby="content-helper-text"
          />
        </FormControl>
        <Box marginTop=".3rem">
          <Button type="submit">Add Comment</Button>
        </Box>
      </form>
    </Box>
  );
};

export default CommentEdit;
