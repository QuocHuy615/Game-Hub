import { Suspense, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

export const RouteFallback = () => (
  <div className="min-h-[40vh] w-full animate-pulse bg-background" />
);

export const SuspenseRoute = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<RouteFallback />}>{children}</Suspense>
);

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAuthStore();
  if (!token) return <Navigate to="/auth/login" replace />;
  return <>{children}</>;
};
