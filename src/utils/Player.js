import Tone from "tone";

export const synth = new Tone.Synth().toMaster();
export const instruments = { synth };

const play = (instrument, note, ...rest) => {
  if (!instruments[instrument]) {
    console.error(`Unable to find instrument ${instrument}`);
    return;
  }
  instruments[instrument].triggerAttackRelease(note, ...rest);
};

let callback = () => {};

const createLoop = fn => {
  callback = fn;
  new Tone.Loop(callback, "8n").start(0);
};

const startLoop = fn => {
  Tone.Transport.start();
};

const stopLoop = () => {
  Tone.Transport.stop();
  callback = () => {};
};

export default {
  startLoop,
  stopLoop,
  createLoop,
  instruments,
  play
};
