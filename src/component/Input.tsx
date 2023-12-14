import { FC } from "react";

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  name?: string;
  value?: string;
  required?: boolean;
  admin?: boolean;
}

interface InputVal {
  onBlur?: (event: any) => void;
  onChange?: (value: any) => void;
}

type Inputs = InputProps & InputVal;

const Input: FC<Inputs> = ({
  label,
  type,
  placeholder,
  className,
  name,
  value,
  required,
  admin,
  onBlur,
  onChange,
}) => {
  return (
    <div>
      {admin ? (
        <div className="flex flex-col">
          <label
            htmlFor=""
            className={`text-[#697a8d] text-sm mb-1 ${
              required ? 'after:content-["*"] after:text-red-600' : ""
            }`}
          >
            {label}
          </label>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            className={`${className} bg-transparent border rounded-md focus:outline-none py-[0.6rem] px-[0.875rem]  font-light text-sm mb-3  text-[#697a8d]`}
          />
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <label
            htmlFor=""
            className={`text-[#697a8d] text-sm mb-1 ${
              required ? 'after:content-["*"] after:text-red-600' : ""
            }`}
          >
            {label}
          </label>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            className={`${className} w-full bg-transparent border rounded-md focus:outline-none py-[0.6rem] px-[0.875rem]  font-light text-sm mb-3  text-[#697a8d]`}
          />
        </div>
      )}
    </div>
  );
};

export default Input;
