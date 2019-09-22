import { useRef, useEffect } from "react";
import Tone from "tone";
import { without } from "lodash";

let evtCallbacks = [];

export const addNoteListener = cb => {
  evtCallbacks.push(cb);
};
export const removeNoteListener = cb => {
  evtCallbacks = without(evtCallbacks, cb);
};

export default class Player {
  constructor(count) {
    this.loopCallback = () => {};
    if (!count || count === 1) {
      this.instrument = new Tone.Synth().toMaster();
    } else {
      this.instrument = new Tone.PolySynth(count, Tone.Synth).toMaster();
    }
  }
  createLoop(fn) {
    this.loopCallback = fn;
    new Tone.Loop(this.loopCallback, "8n").start(0);
  }

  static startLoop() {
    Tone.Transport.start();
  }

  stopLoop() {
    Tone.Transport.stop();
    this.loopCallback = () => {};
  }

  attack(note, ...rest) {
    // TODO: Implement event listener
    this.instrument.triggerAttack(note, ...rest);
  }

  release(...rest) {
    // TODO: Implement event listener
    this.instrument.triggerRelease(...rest);
  }
}

export function usePlayer(count) {
  const player = useRef();
  useEffect(() => {
    player.current = new Player(count);
  }, [count]);

  return player;
}
