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
    <div className={className}>
      <input
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        className="p-3 w-[80%] outline-none border border-gray-300 focus:border-gray-500 rounded-xl focus:shadow-sm placeholder:text-[1.4rem]"
        {...register(name, type === "tel" ? phoneValidationRule : rules)}
      />
      <div className="mt-1 text-red-600 text-sm min-h-[1.4rem]">
        {errorsMessage}
      </div>
    </div>
  );
}
