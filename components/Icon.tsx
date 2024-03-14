import "material-symbols";
import { MaterialSymbol } from "material-symbols";
import { twClass } from "@/utils/twClass";

enum IconSize {
  "2xl" = "text-2xl", // !text-2xl
  "3xl" = "text-3xl", // !text-3xl
  "4xl" = "text-4xl", // !text-4xl
  "5xl" = "text-5xl", // !text-5xl
  "6xl" = "text-6xl", // !text-6xl
  "7xl" = "text-7xl", // !text-7xl
  "8xl" = "text-8xl", // !text-8xl
  "9xl" = "text-9xl", // !text-9xl
  "base" = "text-base", // !text-base
  "lg" = "text-lg", // !text-lg
  "md" = "text-base", // !text-base
  "sm" = "text-sm", // !text-sm
  "xl" = "text-xl", // !text-xl
  "xs" = "text-xs", // !text-xs
  "xxs" = "text-xxs", // !text-xxs
}

type Props = {
  className?: string;
  filled?: boolean;
  name: MaterialSymbol;
  size?: keyof typeof IconSize;
};

export default function Icon({
  className,
  filled,
  name,
  size = "base",
}: Props) {
  // !important needed to overwrite class styles
  const sizeClass = `!${IconSize[size]} !leading-none`;

  return (
    <span
      className={twClass("material-symbols-outlined", sizeClass, className)}
      style={{
        fontVariationSettings: filled ? `"FILL" 1` : undefined,
      }}
    >
      {name}
    </span>
  );
}
