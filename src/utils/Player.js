import Tone from "tone";

let synth = null;

const notes = ["C", "D", "E", "F", "G", "A", "B", "C"];
export const changeInstrument = val => {
  synth = new Tone[val]().toMaster();
};

const toNote = (row, col) => {
  return `${notes[row]}${col + 1}`;
};
export const play = (row, col) => {
  if (synth === null) {
    changeInstrument("Synth");
  }
  if (notes[row]) {
    synth.triggerAttackRelease(toNote(row, col), "8n");
  }
};

let callbacks = [];

export const createLoop = callback => {
  new Tone.Loop(callback, "8n").start(0);
};

export const startLoop = fn => {
  Tone.Transport.start();
  callbacks.push(fn);
};

export const stopLoop = () => {
  Tone.Transport.stop();
  callbacks = [];
};
