import * as yup from 'yup';

export const editProfileSchema = yup
  .object({
    avatar: yup.object().shape({
      url: yup.string().min(11, "This is a required field, must contain a valid url.").required("This is a required field, must contain a valid url."),
    }),
    banner: yup.object().shape({
      url: yup.string().required("This is a required field, must contain a valid url."),
    }),
  })
  .required();
