import React from "react";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from "../utils/navigation";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { FooterComp } from "../components/Footer";

const linkClasses =
  "flex items-center gap-2 px-3 py-2 font-normal hover:no-underline rounded-lg text-base";

const SidebarLink = ({ item, activeClassName }) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path? activeClassName : "",
        linkClasses
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
};

export default function SidebarComp() {
  return (
    <div className="flex flex-col bg-neutral-900 w-60 p-3 text-white">
      <Link to='/' className="flex items-center gap-2 px-1 py-3 hover:no-underline">
        <img className="w-10" src="/src/assets/logo-bmkg-no-text.png" />
        <span className="text-neutral-100 text-md">
          BMKG Banyuwangi
        </span>
      </Link>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} activeClassName="bg-blue-500 text-white transition-colors duration-700" />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} activeClassName="bg-blue-500 text-white" />
        ))}
        <FooterComp/>
      </div>
    </div>
  );
}
