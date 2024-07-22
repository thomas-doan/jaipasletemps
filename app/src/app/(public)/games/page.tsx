"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/contexts/Socket";
import { useEffect, useState } from "react";
import { DialogGames } from "@/components/games/DialogGames";
import { CardGames } from "@/components/games/CardGames";

function GamePage() {
  const { socket } = useSocket();
  const { user } = useAuth();
  const [openDialogGames, setOpenDialogGames] = useState(false);

  return (
    <section className="grid grid-flow-col lg:grid-cols-[auto,1fr] lg:gap-4 bg-flora-white 2xl:px-52 xl:px-12 pt-12">
      <div>
        {user.isAuth ? (
          <Button onClick={() => setOpenDialogGames(true)}>Créer un partie</Button>
        ) : (
          <Button>Vous connectez pour jouer</Button>
        )}
        <DialogGames open={openDialogGames} setOpen={setOpenDialogGames} />
      </div>
      <div></div>
    </section>
  );
}

export default GamePage;
