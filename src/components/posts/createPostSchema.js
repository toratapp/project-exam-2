import * as yup from 'yup';

export const createPostSchema = yup
  .object({
    title: yup.string().required("This is a required field."),
    body: yup.string().required("This is a required field."),
    media: yup.object({
      url: yup.string().required("Please enter a valid URL."),
    }).required("Please enter a valid URL."),
  })
  .required();
