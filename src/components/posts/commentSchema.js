import * as yup from 'yup';

export const commentSchema = yup
  .object({
    comment: yup.string().required("This is a required field."),
  })
  .required();
