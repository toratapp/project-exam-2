import * as yup from 'yup';

export const registerSchema = yup
  .object({
    name: yup.string().min(3, "This is a required field.").required("This is a required field."),
    email: yup.string().email("Please provide a valid email address.").required("Please provide a valid email address."),
    password: yup.string().min(8, "This is a required field, at least 8 characters.").required("This is a required field, at least 8 characters."),
    avatar: yup.object().shape({
      url: yup.string().min(11, "This is a required field, must contain a valid url.").required("This is a required field, must contain a valid url."),
    }),
    banner: yup.object().shape({
      url: yup.string().min(11, "This is a required field, must contain a valid url.").required("This is a required field, must contain a valid url."),
    }),
  })
  .required();
