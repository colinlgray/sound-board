import Tone from "tone";
import { maxTimeCount } from "../constants";
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
    this.changeInstrument = this.changeInstrument.bind(this);
    this.loopCallback = () => {};
    this.changeInstrument(count, "Synth");
  }
  createLoop(fn) {
    this.loopCallback = fn;
    new Tone.Loop(this.loopCallback, `${maxTimeCount}n`).start(0);
  }

  static startLoop() {
    Tone.Transport.start();
  }

  stopLoop() {
    Tone.Transport.stop();
    this.loopCallback = () => {};
  }

  attack(notes, ...rest) {
    evtCallbacks.forEach(cb => {
      cb(notes);
    });
    this.instrument.triggerAttack(notes, ...rest);
  }

  release(...rest) {
    this.instrument.triggerRelease(...rest);
  }

  attackRelease(notes, ...rest) {
    evtCallbacks.forEach(cb => {
      cb(notes);
    });
    this.instrument.triggerAttackRelease(notes, ...rest);
  }

  changeInstrument(count, newInstrumentConstructor) {
    if (this.instrument) {
      this.instrument.releaseAll();
    }
    this.instrument = new Tone.PolySynth(count, Tone[newInstrumentConstructor])
      .connect(meter)
      .fan(fft, waveform)
      .toMaster();
  }
}
