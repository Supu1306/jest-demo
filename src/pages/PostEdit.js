import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@chakra-ui/core";

import { Post } from "../Utils/JSONUtil";
import PostManage from "../components/PostManage";
import { useMutation } from "react-query";

const createPost = ({ title, description }) => {
  return Post("http://localhost:3002/posts", { title, description });
};

const PostEdit = () => {
  const { push } = useHistory();

  const [mutate] = useMutation(createPost);

  const onSubmitHandler = (values) => {
    const { title, description } = values;

    mutate({ title, description })
      .then(() => {
        push("/posts");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box maxW="40%" marginX="auto">
      <PostManage onSubmit={onSubmitHandler} />
    </Box>
  );
};

export default PostEdit;
