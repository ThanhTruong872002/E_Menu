import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props {
  type: React.HTMLInputTypeAttribute;
  errorsMessage?: string;
  placeholder?: string;
  className?: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  autoComplete?: string;
}

export default function Input({
  type,
  errorsMessage,
  placeholder,
  className,
  name,
  register,
  rules,
  autoComplete,
}: Props) {
  const phoneValidationRule = {
    ...rules,
    pattern: {
      value: /^[0-9]+$/,
      message: "Please enter a valid phone number with only numeric characters",
    },
  };

  return (
    <div >
      <input
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        className={` px-8 py-2 w-[320px] lg:w-[80%] min-h-[60px] outline-none border border-gray-500 focus:border-gray-500  focus:shadow-sm placeholder:text-[1.4rem] ${
          className
            ? className
            : "rounded-[72px]"
        }  `}
        {...register(name, type === "tel" ? phoneValidationRule : rules)}
      />
      <div className="mt-1 text-red-600 text-sm min-h-[1.4rem]">
        {errorsMessage}
      </div>
    </div>
  );
}
