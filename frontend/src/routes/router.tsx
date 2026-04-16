import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import {
  ProtectedRoute,
  SuspenseRoute,
} from "@/routes/RouteWrappers";

const MainLayout = lazy(() =>
  import("@/components/layouts/MainLayout").then((m) => ({
    default: m.MainLayout,
  })),
);
const HomePage = lazy(() => import("../pages/home/HomePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const ProfilePage = lazy(() => import("@/pages/user/profile/Profile"));
const ChatPage = lazy(() => import("@/pages/user/chat/ChatPage"));
const RankingPage = lazy(() => import("@/pages/user/RankingPage"));

// ===== ADMIN IMPORTS =====
const AdminGuard = lazy(() =>
  import("@/components/admin/auth/AdminGuard").then((m) => ({
    default: m.AdminGuard,
  })),
);
const AdminLayout = lazy(() =>
  import("@/components/admin/layout/AdminLayout").then((m) => ({
    default: m.AdminLayout,
  })),
);
const AdminDashboardPage = lazy(() =>
  import("@/pages/admin/AdminDashboardPage").then((m) => ({
    default: m.AdminDashboardPage,
  })),
);
const AdminUsersPage = lazy(() =>
  import("@/pages/admin/AdminUsersPage").then((m) => ({
    default: m.AdminUsersPage,
  })),
);
const AdminGamesPage = lazy(() =>
  import("@/pages/admin/AdminGamesPage").then((m) => ({
    default: m.AdminGamesPage,
  })),
);
const AdminLoginPage = lazy(() =>
  import("@/pages/admin/AdminLoginPage").then((m) => ({
    default: m.AdminLoginPage,
  })),
);
const AdminStatsPage = lazy(() => import("@/pages/admin/AdminStatsPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SuspenseRoute>
        <MainLayout />
      </SuspenseRoute>
    ),
    errorElement: (
      <SuspenseRoute>
        <NotFoundPage />
      </SuspenseRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <SuspenseRoute>
            <HomePage />
          </SuspenseRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <SuspenseRoute>
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </SuspenseRoute>
        ),
      },
      {
        path: "messages",
        element: (
          <SuspenseRoute>
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          </SuspenseRoute>
        ),
      },
      {
        path: "ranking",
        element: (
          <SuspenseRoute>
            <ProtectedRoute>
              <RankingPage />
            </ProtectedRoute>
          </SuspenseRoute>
        ),
      },
    ],
  },

  {
    path: "/auth/login",
    element: (
      <SuspenseRoute>
        <LoginPage />
      </SuspenseRoute>
    ),
  },
  {
    path: "/auth/register",
    element: (
      <SuspenseRoute>
        <RegisterPage />
      </SuspenseRoute>
    ),
  },

  // ===== ADMIN ROUTES =====
  {
    path: "/admin/login",
    element: (
      <SuspenseRoute>
        <AdminLoginPage />
      </SuspenseRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <SuspenseRoute>
        <AdminGuard />
      </SuspenseRoute>
    ),
    errorElement: (
      <SuspenseRoute>
        <NotFoundPage />
      </SuspenseRoute>
    ),
    children: [
      {
        element: (
          <SuspenseRoute>
            <AdminLayout />
          </SuspenseRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <SuspenseRoute>
                <AdminDashboardPage />
              </SuspenseRoute>
            ),
          },
          {
            path: "users",
            element: (
              <SuspenseRoute>
                <AdminUsersPage />
              </SuspenseRoute>
            ),
          },
          {
            path: "games",
            element: (
              <SuspenseRoute>
                <AdminGamesPage />
              </SuspenseRoute>
            ),
          },
          {
            path: "stats",
            element: (
              <SuspenseRoute>
                <AdminStatsPage />
              </SuspenseRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
