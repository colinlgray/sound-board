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
  constructor() {
    this.loopCallback = () => {};
    this.instrument = new Tone.Synth().toMaster();
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

  release() {
    // TODO: Implement event listener
    this.instrument.triggerRelease();
  }
}
