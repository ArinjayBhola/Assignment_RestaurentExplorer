
import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/toaster";

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/10 p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
}
