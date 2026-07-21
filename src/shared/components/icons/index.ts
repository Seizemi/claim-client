import { FC, SVGProps } from "react";
import {
  FiBarChart2,
  FiPlusCircle,
  FiUser,
  FiLogOut,
  FiHome,
  FiCalendar,
  FiInbox,
} from "react-icons/fi";

// react-icons@5's IconType returns ReactNode, which @types/react@19's stricter
// JSX element typing rejects when used directly as a JSX tag. Cast once here.
type Icon = FC<SVGProps<SVGSVGElement>>;

export const BarChartIcon = FiBarChart2 as unknown as Icon;
export const PlusCircleIcon = FiPlusCircle as unknown as Icon;
export const UserIcon = FiUser as unknown as Icon;
export const LogOutIcon = FiLogOut as unknown as Icon;
export const HomeIcon = FiHome as unknown as Icon;
export const CalendarIcon = FiCalendar as unknown as Icon;
export const InboxIcon = FiInbox as unknown as Icon;
