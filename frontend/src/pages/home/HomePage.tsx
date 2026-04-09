import useDocumentTitle from "@/hooks/useDocumentTitle";
import GameHub from "@/components/games/GameHub";

export default function HomePage() {
  useDocumentTitle("Trang chủ");

  return (
    <div className="w-full min-h-screen bg-background">
      <GameHub />
    </div>
  );
}
