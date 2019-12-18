import React, { useCallback } from "react";
import usePlayer from "../hooks/usePlayer";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { maxTimeCount } from "../constants";
import { ReactComponent as DeleteIcon } from "../icons/delete.svg";

export default function Row(props) {
  const { maxSize, step, onClick, rowData } = props;
  // const [size, setSize] = useState(8);
  let size = rowData.length;
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
  const relativeStep = Math.floor(step / Math.floor(maxTimeCount / size));
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
    <div className="flex w-full h-full m-2">
      <div className="flex w-full">{els}</div>
      <div className="flex">
        <Dropdown
          options={[4, 8, 16]}
          value={size}
          onChange={props.onChangeRowSize}
        />
        <div
          className="mx-1 w-full h-full rounded cursor-pointer flex items-center justify-center bg-white"
          onClick={props.onDelete}
        >
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
}
