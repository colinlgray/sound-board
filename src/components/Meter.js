import React, { useEffect, useCallback, useRef } from "react";
import { meter } from "../utils/Player";
const barHeight = 5;
export default function Meter(props) {
  const canvas = useRef();
  const context = useRef();
  const loop = useCallback(() => {
    requestAnimationFrame(loop);
    const meterValue = meter.getValue();
    const width = canvas.current.width;
    const height = canvas.current.height;
    if (meterValue >= 0) {
      context.current.clearRect(0, 0, width, height);
      context.current.fillStyle = "black";
      const positionY = meterValue * height;
      context.current.fillRect(
        0,
        height - positionY - barHeight,
        width,
        barHeight
      );
      context.current.fill();
      if (meterValue > 0) {
        context.current.fillStyle = "gray";
        context.current.fillRect(0, height - positionY, width, height);
        context.current.fill();
      }
    }
  }, []);

  useEffect(() => {
    loop();
  }, [loop]);

  return (
    <canvas
      className="w-4 h-10 m-2 border-2 border-gray-600 rounded"
      ref={node => {
        if (node !== null) {
          canvas.current = node;
          node.width = node.clientWidth * 2;
          node.height = node.clientHeight * 2;
          context.current = node.getContext("2d");
        }
      }}
    >
      meter of current playing audio
    </canvas>
  );
}
