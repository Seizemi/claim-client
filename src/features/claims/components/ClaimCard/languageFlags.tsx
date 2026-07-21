import { FC, HTMLAttributes } from "react";
import { FR, GB, NL } from "country-flag-icons/react/3x2";
import { Language } from "features/claims/types/claim";

type FlagProps = HTMLAttributes<HTMLElement & SVGElement>;

export const LANGUAGE_FLAGS: Record<Language, FC<FlagProps>> = {
  Fr: FR,
  En: GB,
  Nl: NL,
};
