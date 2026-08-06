import { ReactNode } from "react";
import "features/statistics/components/StatCard/StatCard.scss";

export interface StatCardProps {
  children: ReactNode;
  className?: string;
}

const StatCard = ({ children, className }: StatCardProps) => (
  <div className={`stat-card${className ? ` ${className}` : ""}`}>{children}</div>
);

export default StatCard;
