import React, { useState, useCallback } from "react";
import { usePlayer } from "../utils/Player";
import Button from "./Button";
import Dropdown from "./Dropdown";

export default function Row(props) {
  const { maxSize, step, onClick, rowData } = props;
  const [size, setSize] = useState(8);

  const player = usePlayer(maxSize);
  const playNote = useCallback(
    (...args) => {
      if (player.current) {
        player.current.attackRelease(...args);
      }
    },
    [player]
  );

  let els = [];
  // TODO: Transform the 16n notes to whatever row count is using
  const relativeStep = Math.floor(step / Math.floor(16 / size));
  for (let colIdx = 0; colIdx < size; colIdx++) {
    els.push(
      <Button
        {...rowData[colIdx]}
        key={`button-${colIdx}`}
        highlight={relativeStep === colIdx}
        time={size}
        playNote={playNote}
        onClick={() => {
          onClick(colIdx);
        }}
      />
    );
  }
  return (
    <>
      {els}

      <Dropdown
        options={[4, 8, 16]}
        value={size}
        onChange={val => {
          setSize(val);
        }}
      />
    </>
  );
}
