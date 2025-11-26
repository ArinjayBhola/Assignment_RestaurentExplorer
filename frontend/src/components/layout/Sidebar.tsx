import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  UtensilsCrossed,
  Settings,
  User,
  LogOut,
  LogIn,
  X,
} from "lucide-react";
import { Typography } from "../ui/typography";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ className, isOpen, onClose, ...props }: SidebarProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { icon: UtensilsCrossed, label: "Restaurants", href: "/restaurants" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition-transform duration-200 ease-in-out lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
        {...props}
      >
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Typography variant="h4" className="text-primary">
            RestroExplorer
          </Typography>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-muted-foreground"
                )
              }
              onClick={() => onClose()} // Close on mobile nav
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t p-4 space-y-2">
          {isAuthenticated ? (
            <>
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-foreground">
                  {user?.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-primary"
              onClick={() => {
                navigate("/auth/login");
                onClose();
              }}
            >
              <LogIn className="h-5 w-5" />
              Login
            </Button>
          )}
        </div>
      </aside>
    </>
  );
}
