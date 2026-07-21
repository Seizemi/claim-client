import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "app/SideBar/sideBarNavItems";
import "app/SideBar/SideBar.scss";

const SideBar = () => {
  return (
    <nav className="side-bar">
      {NAV_ITEMS.map(({ key, to, label, Icon }) => (
        <NavLink
          key={key}
          to={to}
          end={to === "/"}
          title={label}
          aria-label={label}
          className={({ isActive }) =>
            `side-bar__item${isActive ? " side-bar__item--active" : ""}`
          }
        >
          <Icon className="side-bar__icon" />
        </NavLink>
      ))}
    </nav>
  );
};

export default SideBar;
