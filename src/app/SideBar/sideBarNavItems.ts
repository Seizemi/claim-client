import { FC, SVGProps } from "react";
import { BarChartIcon, PlusCircleIcon, UserIcon, UsersIcon } from "shared/components/icons";
import { ROLES, Role } from "features/auth/types/currentUser";

export interface SideBarNavItem {
  key: string;
  to: string;
  label: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  // Hides the item from users without this role; the route itself is guarded by RequireRole.
  requiredRole?: Role;
}

export const NAV_ITEMS: SideBarNavItem[] = [
  { key: "statistics", to: "/statistics", label: "Statistiques", Icon: BarChartIcon },
  { key: "new-claim", to: "/claims/new", label: "Nouvelle réclamation", Icon: PlusCircleIcon },
  { key: "dashboard", to: "/", label: "Réclamations", Icon: UserIcon },
  { key: "users", to: "/admin/users", label: "Utilisateurs", Icon: UsersIcon, requiredRole: ROLES.SUPERVISOR },
];
