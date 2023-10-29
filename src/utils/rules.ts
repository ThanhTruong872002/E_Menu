import type { RegisterOptions } from "react-hook-form";
import * as yup from "yup";

type Rules = {
  [key in
    | "username"
    | "password"
    | "email"
    | "phonenumber"
    | "fullname"
    | "foodname"
    | "description"
    | "price"
    | "type"
    | "subject"
    | "message"
    | "total_person"]?: RegisterOptions;
};

export const rules: Rules = {
  username: {
    required: {
      value: true,
      message: "Username is required ",
    },
    pattern: {
      value: /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/,
      message: "Username is not in correct format",
    },
  },
  password: {
    required: {
      value: true,
      message: "Password is required",
    },
    pattern: {
      value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      message: "Password is not in correct format",
    },
  },
  email: {
    required: {
      value: true,
      message: "Email is required",
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Email is not in correct format",
    },
  },
  phonenumber: {
    required: {
      value: true,
      message: "PhoneNumber is required",
    },
    pattern: {
      value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})/,
      message: "PhoneNumber is not in correct format",
    },
  },
  fullname: {
    required: {
      value: true,
      message: "Fullname is required",
    },
    pattern: {
      value: /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/,
      message: "FullName is not in correct format",
    },
  },
  foodname: {
    required: {
      value: true,
      message: "Foodname is required",
    },
  },
  description: {
    required: {
      value: true,
      message: "Decription is required",
    },
  },
  price: {
    required: {
      value: true,
      message: "Price is required",
    },
    pattern: {
      value: /^\d+(,\d{1,2})?$/,
      message: "Price is not in correct format",
    },
  },
  type: {
    required: {
      value: true,
      message: "Type is required",
    },
  },
  subject: {
    required: {
      value: true,
      message: "Subject is requied",
    },
  },
  message: {
    required: {
      value: true,
      message: "Subject is required",
    },
  },
  total_person: {
    required: {
      value: true,
      message: "Total person is required",
    },
    pattern: {
      value: /^[1-9]|10$/,
      message: "Forced a number of from 1 to 10",
    },
  },
};

export const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(5, "Length from 5-160 characters")
    .max(160, "Length from 5-160 characters"),
  phone_number: yup
    .string()
    .required("Phone Number is required")
    .min(6, "Độ dài từ 6 - 11 ký tự")
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Invalid phone number")
    .max(12, "Độ dài từ 6 - 11 ký tự"),
  total_person: yup
    .number()
    .required("Total Person is required")
    .min(1, "Total Person must be greater than or equal to 1")
    .max(10, "Total Person must be less than or equal to 10")
    .integer("Total Person must be an integer"),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export type Schema = yup.InferType<typeof schema>;
