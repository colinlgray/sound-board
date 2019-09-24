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

export const meter = new Tone.Meter("level");
export const fft = new Tone.Analyser("fft", 64);
export const waveform = new Tone.Analyser("waveform", 256);
export default class Player {
  constructor(count) {
    this.loopCallback = () => {};
    if (!count || count === 1) {
      this.instrument = new Tone.Synth()
        .connect(meter)
        .fan(fft, waveform)
        .toMaster();
    } else {
      this.instrument = new Tone.PolySynth(count, Tone.Synth)
        .connect(meter)
        .fan(fft, waveform)
        .toMaster();
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
