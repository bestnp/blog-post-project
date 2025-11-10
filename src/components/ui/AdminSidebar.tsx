import React, { useEffect, useState } from "react";
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
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/authentication";

interface AdminSidebarProps {
  userName?: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ userName = "Admin" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

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

  const handleToggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <aside className="w-full lg:w-[260px] bg-brown-100 border-b border-brown-200 lg:border-b-0 lg:min-h-screen lg:flex lg:flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 lg:p-6">
        <div className="flex items-center gap-3">
          <LogoIcon className="w-[40px] h-[40px] lg:w-[44px] lg:h-[44px]" />
          <div>
            <p className="text-sm text-brown-500 lg:text-brown-400">Welcome back,</p>
            <h2 className="text-body-lg font-semibold text-orange-500">{userName}</h2>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggleMenu}
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-brown-600 hover:bg-brown-200/60 focus:outline-none focus:ring-2 focus:ring-brown-300"
          aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className={cn("lg:flex lg:flex-col lg:flex-1", isMobileMenuOpen ? "block" : "hidden", "lg:block")}>        
        {/* Menu Items */}
        <nav className="px-4 pb-4 lg:px-3 lg:pb-0">
          <ul className="flex flex-col gap-1 lg:space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <button
                    onClick={() => handleNavigate(item.path)}
                    className={cn(
                      "w-full flex items-center justify-between lg:justify-start gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                      active
                        ? "bg-brown-200 text-brown-600 font-medium"
                        : "text-brown-500 hover:bg-brown-200/60"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="text-body-md whitespace-nowrap">{item.label}</span>
                    </span>
                    <span className="lg:hidden text-xs text-brown-400">Tap</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-brown-200 px-4 py-3 space-y-1 lg:border-t-0 lg:p-3 mt-auto">
          <button
            onClick={handleWebsiteClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left text-brown-500 hover:bg-brown-200/60"
          >
            <OutLight className="w-5 h-5" />
            <span className="text-body-md">hh. website</span>
          </button>

          <div className="h-[1px] bg-brown-300 my-1 lg:my-2"></div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left text-brown-500 hover:bg-brown-200/60"
          >
            <SignOutSquareLight className="w-5 h-5" />
            <span className="text-body-md">Log out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;



