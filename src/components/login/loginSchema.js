import * as yup from 'yup';

export const loginSchema = yup
  .object({
    email: yup.string().email("Please provide a valid email address.").required("Please provide a valid email address."),
    password: yup.string().required("This is a required field, at least 8 characters."),
  })
  .required();
