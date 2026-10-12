import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "app/SideBar/sideBarNavItems";
import { useCurrentUser } from "features/auth/useCurrentUser";
import "app/SideBar/SideBar.scss";

const SideBar = () => {
  const { hasRole } = useCurrentUser();
  const visibleItems = NAV_ITEMS.filter(({ requiredRole }) => !requiredRole || hasRole(requiredRole));

  return (
    <nav className="side-bar">
      {visibleItems.map(({ key, to, label, Icon }) => (
        <NavLink
          key={key}
          to={to}
          end={to === "/"}
          aria-label={label}
          className={({ isActive }) =>
            `side-bar__item${isActive ? " side-bar__item--active" : ""}`
          }
        >
          <Icon className="side-bar__icon" />
          <span className="side-bar__tooltip">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default SideBar;
