import * as yup from "yup";

export const logSchema = yup.object({
  email: yup
    .string()
    .email("please enter the valid email")
    .required("please enter the email"),
  password: yup.string().required("please enter the password"),
});

export const schema = yup.object({
  full_name: yup.string().required("please enter your full name"),
  email: yup
    .string()
    .email("please enter the valid email")
    .required("please enter your email"),
  password: yup
    .string()
    .required("please enter the password")
    .min(6, "your password must be at least of 6 characters"),
  Confirm_password: yup
    .string()
    .required("please re-enter the password")
    .oneOf(
      [yup.ref("password"), ""],
      "please enter the password entered above"
    ),
});
