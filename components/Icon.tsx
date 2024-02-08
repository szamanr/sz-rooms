import "material-symbols";
import { MaterialSymbol } from "material-symbols";
import { twClass } from "@/utils/twClass";

enum IconSize {
  "2xl" = "text-2xl",
  "3xl" = "text-3xl",
  "4xl" = "text-4xl",
  "5xl" = "text-5xl",
  "6xl" = "text-6xl",
  "7xl" = "text-7xl",
  "8xl" = "text-8xl",
  "9xl" = "text-9xl",
  "base" = "text-base",
  "lg" = "text-lg",
  "md" = "text-base",
  "sm" = "text-sm",
  "xl" = "text-xl",
  "xs" = "text-xs",
  "xxs" = "text-xxs",
}

type Props = {
  className?: string;
  name: MaterialSymbol;
  size?: keyof typeof IconSize;
};

export default function Icon({ className, name, size = "base" }: Props) {
  // !important needed to overwrite class styles
  const sizeClass = `!${IconSize[size]} !leading-none`;

  return (
    <span
      className={twClass("material-symbols-outlined", sizeClass, className)}
    >
      {name}
    </span>
  );
}
