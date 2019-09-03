import * as mm from "@magenta/music";

const mmPlayer = new mm.Player();
let _started = false;
export const player = {
  play(val) {
    console.log("val", val + 20);
    if (!_started) {
      mmPlayer.resumeContext();
      _started = true;
    }
    mmPlayer.start({
      notes: [
        {
          pitch: val + 30,
          quantizedStartStep: 0,
          quantizedEndStep: 1,
          isDrum: true
        }
      ],
      quantizationInfo: { stepsPerQuarter: 4 },
      tempos: [{ time: 0, qpm: 120 }],
      totalQuantizedSteps: 1
    });
  }
};
