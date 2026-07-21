import { useEffect, useMemo, useRef, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { TabItem } from "shared/types/navigation";

export const useTopBar = (tabs: TabItem[], activeTabKeyProp?: string) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const activeTabKey = useMemo(() => {
    if (activeTabKeyProp) {
      return activeTabKeyProp;
    }

    const matchedTab = tabs.find(
      (tab) => tab.path && matchPath({ path: tab.path, end: tab.path === "/" }, location.pathname)
    );

    return matchedTab?.key ?? tabs[0]?.key;
  }, [tabs, activeTabKeyProp, location.pathname]);

  return { isMenuOpen, toggleMenu, closeMenu, menuRef, activeTabKey };
};
