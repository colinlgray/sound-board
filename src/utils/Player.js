import Tone from "tone";

let synth = null;

const notes = ["C", "D", "E", "F", "G", "A", "B", "C"];
const changeInstrument = val => {
  synth = new Tone[val]().toMaster();
};

const toNote = (row, col) => {
  return `${notes[row]}${col + 1}`;
};
const play = (row, col) => {
  if (synth === null) {
    changeInstrument("Synth");
  }
  if (notes[row]) {
    synth.triggerAttackRelease(toNote(row, col), "8n");
  }
};

let callback = () => {};
let loop = null;

const createLoop = fn => {
  callback = fn;
  loop = new Tone.Loop(callback, "8n").start(0);
};

const startLoop = fn => {
  Tone.Transport.start();
  window.asd = loop;
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
