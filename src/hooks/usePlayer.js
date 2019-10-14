import { useRef, useEffect } from "react";
import Player from "../utils/Player";

export default function usePlayer(count) {
  const player = useRef();
  useEffect(() => {
    if (player.current) {
      player.current.instrument.releaseAll();
    }
    player.current = new Player(count);
  }, [count]);

  return player;
}
