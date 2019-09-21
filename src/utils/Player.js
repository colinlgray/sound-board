import Tone from "tone";
import { without } from "lodash";

export const synth = new Tone.Synth().toMaster();
export const loopSynth = new Tone.Synth().toMaster();
export const instruments = { synth, loopSynth };

let evtCallbacks = [];

export const attack = (instrument, note, ...rest) => {
  evtCallbacks.forEach(fn => {
    fn(note);
  });

  instruments[instrument].triggerAttack(note, ...rest);
};
export const release = (instrument, ...rest) => {
  instruments[instrument].triggerRelease(...rest);
};

export const addNoteListener = cb => {
  evtCallbacks.push(cb);
};
export const removeNoteListener = cb => {
  evtCallbacks = without(evtCallbacks, cb);
};
let loopCallback = () => {};

const createLoop = fn => {
  loopCallback = fn;
  new Tone.Loop(loopCallback, "8n").start(0);
};

const startLoop = fn => {
  Tone.Transport.start();
};

const stopLoop = () => {
  Tone.Transport.stop();
  loopCallback = () => {};
};

export default {
  startLoop,
  stopLoop,
  createLoop,
  instruments
};
