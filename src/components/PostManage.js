import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const PostManage = ({
  onSubmit,
  defaultTitle = "",
  defaultDescription = "",
}) => {
  const { control, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.title}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Controller
          defaultValue={defaultTitle}
          control={control}
          name="title"
          as={Input}
          rules={{
            required: {
              value: true,
              message: "It is required",
            },
            minLength: {
              value: 3,
              message: "minimum length is 3",
            },
            maxLength: {
              value: 20,
              message: "maximum length is 20",
            },
          }}
        />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.description}>
        <FormLabel htmlFor="Description">Description</FormLabel>
        <Controller
          defaultValue={defaultDescription}
          control={control}
          name="description"
          as={Textarea}
          rules={{
            required: {
              value: true,
              message: "It is required",
            },
            minLength: {
              value: 3,
              message: "minimum length is 3",
            },
            maxLength: {
              value: 100,
              message: "maximum length is 100",
            },
          }}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>

      <div>
        <Button marginTop="2rem" variantColor="green" type="submit">
          {defaultTitle ? "Edit Blog" : "Add Blog"}
        </Button>
      </div>
    </form>
  );
};

export default PostManage;
