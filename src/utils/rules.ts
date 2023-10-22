import type { RegisterOptions } from "react-hook-form";

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
    | "type"]?: RegisterOptions;
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
      value:true,
      message: "Decription is required"
    }
  },
  price: {
    required: {
      value:true,
      message: "Price is required"
    },
    pattern: {
      value: /^\d+(,\d{1,2})?$/,
      message: "Price is not in correct format"
    }
  },
  type: {
    required: {
      value: true,
      message: "Type is required"
    }
  }
};
