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
import { useAuth } from "@/context/authentication";

interface AdminSidebarProps {
  userName?: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ userName = "Admin" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

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

  const handleLogout = async () => {
    console.log("Logging out...");
    await logout(); // Use logout from useAuth which calls API
  };

  const handleWebsiteClick = () => {
    navigate("/");
  };

  return (
    <div className="fixed left-0 top-0 w-[260px] h-screen bg-brown-200 flex flex-col z-10">
      {/* Logo and Title */}
      <div className="p-6">
        <LogoIcon className="w-[60px] h-[60px] mb-2" />
        <h2 className="text-h4 text-orange">Admin panel</h2>
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
                      ? "bg-brown-300 text-brown-500 text-body-lg" 
                      : "text-brown-400 hover:bg-brown-200/50"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-body-lg whitespace-nowrap">{item.label}</span>
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
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left text-brown-400 hover:bg-brown-200/50"
        >
          <OutLight className="w-5 h-5" />
          <span className="text-body-lg">hh. website</span>
        </button>

        {/* Divider */}
        <div className="h-[1px] bg-brown-300 my-1"></div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left text-brown-400 hover:bg-brown-200/50"
        >
          <SignOutSquareLight className="w-5 h-5" />
          <span className="text-body-lg">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;



