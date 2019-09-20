import Tone from "tone";

let synth = null;

const changeInstrument = val => {
  synth = new Tone[val]().toMaster();
};

const play = (instrument, note) => {
  if (synth === null) {
    changeInstrument("Synth");
  }
  synth.triggerAttackRelease(note, "8n");
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
  changeInstrument,
  startLoop,
  stopLoop,
  createLoop,
  play
};
