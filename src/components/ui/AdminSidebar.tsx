import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LogoIcon, 
  FileLight, 
  NotebookLight, 
  UserDuotone, 
  BellLight, 
  RefreshLight,
  SignOutSquareLight,
  OutLight
} from "@/icon/IconsAll";

interface AdminSidebarProps {
  userName?: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ userName = "Admin" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      label: "Article management",
      icon: NotebookLight,
      path: "/admin/articles",
    },
    {
      label: "Category management",
      icon: FileLight,
      path: "/admin/categories",
    },
    {
      label: "Profile",
      icon: UserDuotone,
      path: "/admin/profile",
    },
    {
      label: "Notification",
      icon: BellLight,
      path: "/admin/notifications",
    },
    {
      label: "Reset password",
      icon: RefreshLight,
      path: "/admin/reset-password",
    },
  ];

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  const handleWebsiteClick = () => {
    navigate("/");
  };

  return (
    <div className="w-[240px] min-h-screen bg-brown-100 flex flex-col">
      {/* Logo and Title */}
      <div className="p-6">
        <LogoIcon className="w-[44px] h-[44px] mb-2" />
        <h2 className="text-body-lg font-semibold text-orange-500">Admin panel</h2>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left
                    ${active 
                      ? "bg-brown-200 text-brown-600 font-medium" 
                      : "text-brown-500 hover:bg-brown-200/50"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-body-md">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 space-y-1">
        <button
          onClick={handleWebsiteClick}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left text-brown-500 hover:bg-brown-200/50"
        >
          <OutLight className="w-5 h-5" />
          <span className="text-body-md">hh. website</span>
        </button>

        {/* Divider */}
        <div className="h-[1px] bg-brown-300 my-1"></div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left text-brown-500 hover:bg-brown-200/50"
        >
          <SignOutSquareLight className="w-5 h-5" />
          <span className="text-body-md">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;



