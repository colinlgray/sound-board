import Tone from "tone";
import { maxTimeCount, maxPolySynthSize, synthOptions } from "../constants";
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
    this.initInstruments(count);
    this.releaseAll = this.releaseAll.bind(this);
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

  attack(synthName, notes, ...rest) {
    evtCallbacks.forEach(cb => {
      cb(notes);
    });
    if (!this[synthName]) {
      console.error("Unable to find synth", synthName);
      return;
    }
    this[synthName].triggerAttack(notes, ...rest);
  }

  release(synthName, ...rest) {
    if (!this[synthName]) {
      console.error("Unable to find synth", synthName);
      return;
    }
    this[synthName].triggerRelease(...rest);
  }

  releaseAll() {
    synthOptions.forEach(synthConstructorName => {
      this[synthConstructorName].releaseAll();
    });
  }

  attackRelease(synthName, notes, ...rest) {
    evtCallbacks.forEach(cb => {
      cb(notes);
    });
    if (!this[synthName]) {
      console.error("Unable to find synth", synthName);
      return;
    }
    this[synthName].triggerAttackRelease(notes, ...rest);
  }

  initInstruments(count) {
    let synthSize = count;
    if (count > maxPolySynthSize) {
      synthSize = maxPolySynthSize;
    }
    synthOptions.forEach(synthConstructorName => {
      this.setInstrument(synthSize, synthConstructorName);
    });
  }

  setInstrument(synthSize, newInstrumentConstructor) {
    this[newInstrumentConstructor] = new Tone.PolySynth(
      synthSize,
      Tone[newInstrumentConstructor]
    )
      .connect(meter)
      .fan(fft, waveform)
      .toMaster();
  }
}
