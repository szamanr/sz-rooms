import "material-symbols";
import { MaterialSymbol } from "material-symbols";

type Props = {
  name: MaterialSymbol;
};

export default function Icon({ name }: Props) {
  return <span className="material-symbols-outlined">{name}</span>;
}
