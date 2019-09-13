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

export const scheduleNote = (row, col, time) => {
  console.log("schedle", toNote(row, col), time);
};
