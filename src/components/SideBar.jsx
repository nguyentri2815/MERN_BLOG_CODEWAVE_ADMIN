import React from "react";
import { MdDashboard } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";

const SideBar = () => {
  // MENU -hard tại đây theo tác giả - nên cấu hình ở const/ enum
  const MENU = [
    {
      icon: <MdDashboard />,
      label: "Dashboard",
      to: "",
    },
    {
      icon: <MdDashboard />,
      label: "Analytics",
      to: "analytics",
    },
    {
      icon: <MdDashboard />,
      label: "Contents",
      to: "contents",
    },
    {
      icon: <MdDashboard />,
      label: "writer",
      to: "writer",
    },
  ];

  const location = useLocation();

  const path = location.pathname?.slice(1);
  console.log('path',path);
  
  return (
    <div>
      <ul className="space-y-2 bg-gray-600 space-y-2">
        {MENU?.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={() =>
              item.to === path ? "active text-sky-700" : "text-white"
            }
          > 
            <div className="flex items-center gap-2 ">
                <span>{item.icon}</span>
                <p>{item.label}</p>
            </div>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
