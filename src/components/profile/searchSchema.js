import * as yup from 'yup';

export const searchSchema = yup
  .object({
    value: yup.string().required("Search field cannot be empty."),
  })
  .required();
