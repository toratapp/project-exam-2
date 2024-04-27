import * as yup from 'yup';

export const commentSchema = yup.object({
  body: yup.string().required("This is a required field."),
});
