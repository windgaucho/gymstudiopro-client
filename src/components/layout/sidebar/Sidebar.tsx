import { BalanceIcon } from "@/components/icons/balance-icon";
import { ChangeLogIcon } from "@/components/icons/changelog-icon";
import { CustomersIcon } from "@/components/icons/customers-icon";
import { DevIcon } from "@/components/icons/dev-icon";
import { FilterIcon } from "@/components/icons/filter-icon";
import { HomeIcon } from "@/components/icons/home-icon";
import { ProductsIcon } from "@/components/icons/products-icon";
import { ReportsIcon } from "@/components/icons/reports-icon";
import { SettingsIcon } from "@/components/icons/settings-icon";
import { ViewIcon } from "@/components/icons/view-icon";
import { Avatar, Tooltip } from "@heroui/react";
import { useLocation } from "@tanstack/react-router";
import { useSidebarContext } from "../layout-context";
import { CollapseItems } from "./CollapseItems";
import { OrganizacionesDropdown } from "./OrganizacionesDropdown";
import { Sidebar } from "./Sidebar.styles";
import { SidebarItem } from "./SidebarItem";
import { SidebarMenu } from "./SidebarMenu";

import { SiAwsorganizations } from "react-icons/si";
import { VscOrganization } from "react-icons/vsc";

export const SidebarWrapper = () => {
  const location = useLocation();
  const pathname = location.pathname;
  console.log("pathname", pathname);
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <OrganizacionesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Configuración">
              <SidebarItem
                isActive={pathname === "/organizaciones"}
                title="Organizaciones"
                icon={<VscOrganization />}
                href="organizaciones"
              />
              <SidebarItem
                isActive={pathname === "/sucursales"}
                title="Sucursales"
                icon={<SiAwsorganizations />}
                href="sucursales"
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              />
              <SidebarItem
                isActive={pathname === "/customers"}
                title="Customers"
                icon={<CustomersIcon />}
              />
              <SidebarItem
                isActive={pathname === "/products"}
                title="Products"
                icon={<ProductsIcon />}
              />
              <SidebarItem
                isActive={pathname === "/reports"}
                title="Reports"
                icon={<ReportsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem
                isActive={pathname === "/developers"}
                title="Developers"
                icon={<DevIcon />}
              />
              <SidebarItem
                isActive={pathname === "/view"}
                title="View Test Data"
                icon={<ViewIcon />}
              />
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<SettingsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
