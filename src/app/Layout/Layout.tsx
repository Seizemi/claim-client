import { Outlet } from "react-router-dom";
import SideBar from "app/SideBar/SideBar";
import TopBar from "app/TopBar/TopBar";
import { mockUser } from "shared/mocks/mockUser";
import { TabItem } from "shared/types/navigation";
import "app/Layout/Layout.scss";

const DASHBOARD_TABS: TabItem[] = [{ key: "reclamations", label: "Réclamations", path: "/" }];

const Layout = () => {
  const user = mockUser;

  return (
    <div className="layout">
      <div className="layout__body">
        <SideBar />
        <div className="layout__content">
          <TopBar tabs={DASHBOARD_TABS} user={user} />
          <main className="layout__page">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
