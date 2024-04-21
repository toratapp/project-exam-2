import * as yup from 'yup';

export const createPostSchema = yup
  .object({
    title: yup.string().required("This is a required field."),
    body: yup.string().required("This is a required field."),
    media: yup.object().shape({
      url: yup.string().min(11, "This is a required field, must contain a valid url.").required("This is a required field, must contain a valid url."),
    }),
  })
  .required();
