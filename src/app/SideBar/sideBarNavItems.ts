import { FC, SVGProps } from "react";
import { BarChartIcon, PlusCircleIcon, UserIcon } from "shared/components/icons";

export interface SideBarNavItem {
  key: string;
  to: string;
  label: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
}

export const NAV_ITEMS: SideBarNavItem[] = [
  { key: "statistics", to: "/statistics", label: "Statistiques", Icon: BarChartIcon },
  { key: "new-claim", to: "/claims/new", label: "Nouvelle réclamation", Icon: PlusCircleIcon },
  { key: "dashboard", to: "/", label: "Réclamations", Icon: UserIcon },
];
