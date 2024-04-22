import * as yup from 'yup';

export const commentSchema = yup.object({
  body: yup.string().min(11, "This is a required field.").required("This is a required field."),
});
