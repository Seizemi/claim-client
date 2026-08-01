import { LogOutIcon, UserIcon } from "shared/components/icons";
import { useTopBar } from "app/TopBar/useTopBar";
import { AppUser } from "shared/types/user";
import { TabItem } from "shared/types/navigation";
import "app/TopBar/TopBar.scss";

export interface TopBarProps {
  tabs: TabItem[];
  activeTabKey?: string;
  leftSlot?: React.ReactNode;
  user: AppUser;
  onProfileClick?: () => void;
  onLogout?: () => void;
}

const TopBar = ({ tabs, activeTabKey: activeTabKeyProp, leftSlot, user, onProfileClick, onLogout }: TopBarProps) => {
  const { isMenuOpen, toggleMenu, closeMenu, menuRef, activeTabKey } = useTopBar(tabs, activeTabKeyProp);
  const activeTab = tabs.find((tab) => tab.key === activeTabKey);

  const handleProfileClick = () => {
    closeMenu();
    onProfileClick?.();
  };

  const handleLogout = () => {
    closeMenu();
    onLogout?.();
  };

  return (
    <header className="top-bar">
      <div className="top-bar__left">{leftSlot}</div>

      <nav className="top-bar__tabs">
        {activeTab && <span className="top-bar__tab top-bar__tab--active">{activeTab.label}</span>}
      </nav>

      <div className="top-bar__user" ref={menuRef}>
        <button type="button" className="top-bar__avatar" onClick={toggleMenu} aria-label={user.name}>
          {user.initials}
        </button>

        {isMenuOpen && (
          <div className="top-bar__menu">
            <button type="button" className="top-bar__menu-item" onClick={handleProfileClick}>
              <UserIcon className="top-bar__menu-icon" />
              Mon profil
            </button>
            <button type="button" className="top-bar__menu-item" onClick={handleLogout}>
              <LogOutIcon className="top-bar__menu-icon" />
              Deconnexion
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
