import { FC } from "react";

interface ButtonProps {
  label?: string;
  className?: string;
  onClick?: React.MouseEventHandler;
  type?: "button" | "submit" | "reset";
  other?: boolean;
}

const Button: FC<ButtonProps> = ({
  type,
  label,
  className,
  onClick,
  other,
}) => {
  return (
    <div>
      {other ? (
        <button
          type={type}
          className={`${className} btn  border-none text-white focus:outline-none`}
          onClick={onClick}
        >
          {label}
        </button>
      ) : (
        <button
          type={type}
          className={`${className} btn bg-primary border-none text-white hover:bg-primaryHover focus:outline-none`}
          onClick={onClick}
        >
          {label}
        </button>
      )}
    </div>
  );
};

export default Button;
