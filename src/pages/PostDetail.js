import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Get, Put } from "../Utils/JSONUtil";
import { useMutation, useQuery } from "react-query";

import { queryCache } from "../reactQuery";

import PostManage from "../components/PostManage";
import CommentEdit from "../components/CommentEdit";
import CommentList from "../components/CommentList";

const editPost = ({ postId, title, description }) => {
  return Put(`http://localhost:3002/posts/${postId}`, {
    title,
    description,
  });
};

const PostDetail = () => {
  const { postId } = useParams();

  const { isLoading, error, data, refetch } = useQuery("postdetail", () => {
    return Get(`http://localhost:3002/posts/${postId}`);
  });

  const [mutate] = useMutation(editPost);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmitHandler = (values) => {
    const { title, description } = values;

    mutate({
      postId,
      title,
      description,
    })
      .then(() => {
        // Close Modal
        onClose();
        // refetch Detail
        refetch();

        // Refetch Post List
        queryCache.refetchQueries(["postlist"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    refetch();
  }, [postId]);

  return (
    <Box w="100%">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <Box display="flex" justifyContent="flex-end">
            <IconButton marginTop=".6rem" icon="edit" onClick={onOpen} />
          </Box>
          <Box marginLeft=".3rem" marginTop="1rem" minHeight="300px">
            {data.data.description}
          </Box>

          <CommentList postId={postId} />
          <CommentEdit postId={postId} />
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Post Manage</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <PostManage
                  onSubmit={onSubmitHandler}
                  defaultTitle={data.data.title}
                  defaultDescription={data.data.description}
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
};

export default PostDetail;
