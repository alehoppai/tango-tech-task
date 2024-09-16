import { InputHTMLAttributes, ReactNode } from "react";

type Props = {
  rightSlot?: ReactNode;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextInput = ({ rightSlot, errorMessage, ...props }: Props) => (
  <div className="relative w-full flex-col gap-2">
    <input
      type="text"
      className="py-2 px-4 w-full bg-blue-950 text-primary rounded-xl"
      {...props}
    />
    {rightSlot && <div className="absolute top-2 right-2">{rightSlot}</div>}
    {errorMessage && <div className="text-error">{errorMessage}</div>}
  </div>
);
