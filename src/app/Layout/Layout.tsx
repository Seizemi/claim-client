import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "app/SideBar/SideBar";
import TopBar from "app/TopBar/TopBar";
import { useCurrentUser } from "features/auth/useCurrentUser";
import { useLookupsStore } from "features/claims/lookups/useLookupsStore";
import { TabItem } from "shared/types/navigation";
import { getInitials } from "shared/utils/getInitials";
import "app/Layout/Layout.scss";

const TOP_BAR_TABS: TabItem[] = [
  { key: "reclamations", label: "Réclamations", path: "/" },
  { key: "new-claim", label: "Nouvelle-réclamation", path: "/claims/new" },
  { key: "statistics", label: "Statistiques", path: "/statistics" },
  { key: "users", label: "Utilisateurs", path: "/admin/users" },
];

const Layout = () => {
  const { user } = useCurrentUser();
  const displayName = user?.displayName || user?.email || "";

  // Rendered only behind AuthGate, so the session exists before the first API call.
  useEffect(() => {
    useLookupsStore.getState().fetchLookups();
  }, []);

  return (
    <div className="layout">
      <div className="layout__body">
        <SideBar />
        <div className="layout__content">
          <TopBar tabs={TOP_BAR_TABS} user={{ name: displayName, initials: getInitials(displayName) }} />
          <main className="layout__page">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
