import { useState, useEffect } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
// import type { Game } from "@/types/game";
import { gameApi } from "@/services/gameApi";
import { GameCarousel } from "@/components/games/GameCarousel";
import { GameControlPanel } from "@/components/games/GameControlPanel";
import { GamePlayer } from "@/components/games/GamePlayer";
import { GameHelpDialog } from "@/components/games/GameHelpDialog";
import { useGameSound } from "@/hooks/useGameSound";
import { GAME_INSTRUCTIONS, type GameType } from "@/components/games/GameInstructions";
import { BoxButton } from "../ui/box-button";
import { useNavigate } from "react-router-dom";

// import game image
import caroImage from "@/assets/games/caro.webp";
import snakeImage from "@/assets/games/snake.webp";
import tictactoeImage from "@/assets/games/tictactoe.webp";
import match3Image from "@/assets/games/match3.webp";
import memoryImage from "@/assets/games/memory.webp";
import drawingImage from "@/assets/games/drawing.webp";

const GAME_ASSETS: {
  id: number;
  title: string;
  image: string;
  variant: "primary" | "secondary" | "accent" | "danger";
  url: string;
  instructionKey: GameType;
}[] = [
  {
    id: 1,
    title: "Cờ caro 5 hàng",
    image: caroImage,
    variant: "primary",
    url: "/games/caro-5",
    instructionKey: "caro",
  },
  {
    id: 2,
    title: "Cờ Caro 4 hàng",
    image: caroImage,
    variant: "primary",
    url: "/games/caro-4",
    instructionKey: "caro",
  },
  {
    id: 3,
    title: "Rắn Săn Mồi",
    image: snakeImage,
    variant: "danger",
    url: "/games/snake",
    instructionKey: "snake",
  },
  {
    id: 4,
    title: "TIC TAC TOE",
    image: tictactoeImage,
    variant: "accent",
    url: "/games/tic-tac-toe",
    instructionKey: "tictactoe",
  },
  {
    id: 5,
    title: "Kẹo Ngọt",
    image: match3Image,
    variant: "primary",
    url: "/match-3",
    instructionKey: "match3",
  },
  {
    id: 6,
    title: "Cờ trí nhớ",
    image: memoryImage,
    variant: "accent",
    url: "/memory",
    instructionKey: "memory",
  },
  {
    id: 7,
    title: "Vẽ tranh",
    image: drawingImage,
    variant: "danger",
    url: "/drawing",
    instructionKey: "drawing",
  },
];

export const GameHub = () => {
  const [games, setGames] = useState<any[]>([]); // Use any[] to include variant
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const { playSound } = useGameSound();
  const { token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await gameApi.getAllGames();
        // Merge API data with local assets
        const mergedGames = data.map((game) => {
          const asset = GAME_ASSETS.find((a) => a.id === game.id);
          const instructions = asset?.instructionKey
            ? GAME_INSTRUCTIONS[asset.instructionKey]
            : null;

          return {
            ...game,
            name: asset?.title || game.name,
            image_url: asset?.image || game.image_url,
            variant: asset?.variant || "primary",
            instructions: instructions,
          };
        });
        setGames(mergedGames);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const handleNext = () => {
    playSound("button1");
    setSelectedIndex((prev) => (prev + 1) % games.length);
  };

  const handlePrev = () => {
    playSound("button1");
    setSelectedIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  const handleEnter = () => {
    // require login to start a game
    if( !token )
      navigate("/auth/login")

    if (selectedGame && selectedGame.is_active) {
      playSound("button2");
      setIsPlaying(true);
    } else {
      playSound("button"); // Âm thanh lỗi/khoá
    }
  };

  const handleBack = () => {
    playSound("button2");
    setIsPlaying(false);
  };

  const handleHelp = () => {
    playSound("button");
    setShowHelp(true);
  };

  const selectedGame = games[selectedIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for arrows
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        // e.preventDefault(); // Optional: prevent scrolling if desired
      }

      if (e.key === "Escape") {
        if (isPlaying || showHelp) {
          handleBack();
          setShowHelp(false);
          return;
        }
      }

      if (isPlaying) return; // Disable other keys while playing

      switch (e.key) {
        case "ArrowRight":
          handleNext();
          break;
        case "ArrowLeft":
          handlePrev();
          break;
        case "Enter":
          handleEnter();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, games, selectedIndex, showHelp]); // Add dependencies needed for handlers

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] w-full relative">
      {isPlaying && selectedGame ? (
        // Mode CHƠI GAME
        <div className="w-full max-w-7xl animate-in zoom-in-95 duration-300 flex flex-col items-center">
            {/* GLOBAL BACK BUTTON */}
            {/* GLOBAL BACK BUTTON & TITLE */}
            <div className="w-full flex items-center justify-between mb-4 px-4 sm:px-0 relative">
              <div className="absolute left-4 sm:-left-3 sm:-top-3 z-10">
                <BoxButton 
                  onClick={handleBack} 
                  variant="danger" 
                  size="small"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">QUAY LẠI</span>
                </BoxButton>
              </div>
              
              <div className="w-full flex justify-center pointer-events-none">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] truncate max-w-[70%]">
                  {selectedGame.name}
                </h1>
              </div>
              
              {/* Spacer to balance the layout if needed, or just let the absolute positioning handle left button */}
              <div className="w-10"></div> 
            </div>
            
            <GamePlayer game={selectedGame} onBack={handleBack} />
        </div>
      ) : (
        // Mode CAROUSEL
        <div className="w-full">
           <div className="mb-2 text-center space-y-1">
             <h1 className="text-3xl md:text-4xl font-black uppercase text-primary drop-shadow-md">
               Game Center
             </h1>
             <p className="text-sm text-muted-foreground font-medium">
               Chọn trò chơi và nhấn CHƠI NGAY để bắt đầu
             </p>
           </div>
           
           <GameCarousel 
             games={games} 
             selectedIndex={selectedIndex} 
             onSelect={setSelectedIndex} 
           />
        </div>
      )}

      {/* Control Panel luôn hiển thị (nhưng thay đổi trạng thái) */}
      <GameControlPanel
        onNext={handleNext}
        onPrev={handlePrev}
        onEnter={handleEnter}
        onHelp={handleHelp}
        canEnter={!!selectedGame && selectedGame.is_active}
        isPlaying={isPlaying}
        gameLocked={selectedGame ? !selectedGame.is_active : true}
      />

      <GameHelpDialog
        game={selectedGame}
        instructions={selectedGame?.instructions}
        open={showHelp}
        onOpenChange={setShowHelp}
      />
    </div>
  );
};
