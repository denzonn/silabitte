import { FC } from "react";

interface ButtonProps {
  label?: string;
  className?: string;
  onClick?: React.MouseEventHandler;
  type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({ type, label, className, onClick }) => {
  return (
    <button
      type={type}
      className={`${className} btn bg-primary border-none text-white w-full hover:bg-primaryHover focus:outline-none`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
