import React, { useEffect, useCallback, useRef } from "react";
import { fft } from "../utils/Player";
import { scale } from "../utils";
import { clamp } from "lodash";

export default function FFT(props) {
  const canvas = useRef();
  const context = useRef();
  const loop = useCallback(() => {
    requestAnimationFrame(loop);
    const value = fft.getValue();
    const width = canvas.current.width;
    const height = canvas.current.height;
    context.current.clearRect(0, 0, width, height);
    context.current.fillStyle = "black";
    value.forEach((v, i) => {
      const x = scale(i, 0, value.length, 0, width);
      const barHeight = clamp(scale(v, -100, 0, 0, height), 0, height);
      context.current.fillRect(x, height / 2 - barHeight / 2, 2, barHeight);
      context.current.fill();
    });
    context.current.strokeStyle = "white";
    context.current.stroke();
  }, []);

  useEffect(() => {
    loop();
  }, [loop]);

  return (
    <div className="flex flex-col items-center font-bold text-gray-700">
      FFT
      <canvas
        className="w-24 h-10 border-2 border-gray-600 rounded"
        ref={node => {
          if (node !== null) {
            canvas.current = node;
            node.width = node.clientWidth * 2;
            node.height = node.clientHeight * 2;
            context.current = node.getContext("2d");
          }
        }}
      >
        waveform of current playing audio
      </canvas>
    </div>
  );
}
