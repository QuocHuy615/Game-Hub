import { lazy, Suspense } from "react";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { Loader2 } from "lucide-react";

const GameHub = lazy(() => import("@/components/games/GameHub"));

export default function HomePage() {
  useDocumentTitle("Trang chủ");

  return (
    <div className="w-full min-h-screen bg-background">
      <Suspense 
        fallback={
          <div className="flex h-screen items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        }
      >
        <GameHub />
      </Suspense>
    </div>
  );
}
