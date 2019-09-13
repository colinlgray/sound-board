import React, { useState, useEffect } from "react";
import Button from "./Button";
import Player from "../utils/Player";

const getStartingArray = size => {
  return new Array(size).fill(null).map(() => {
    return new Array(size).fill(0).map(() => {
      return {};
    });
  });
};

export default function Board(props) {
  const { size } = props;
  const [board, setBoard] = useState(getStartingArray(size));

  useEffect(() => {
    if (props.resetCount > 0) {
      setBoard(getStartingArray(props.size));
    }
  }, [props.resetCount, props.size]);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
        display: "grid",
        gridGap: "8px"
      }}
    >
      {board.map((row, rowIdx) =>
        row.map((val, colIdx) => {
          return (
            <Button
              key={`button-${rowIdx}-${colIdx}`}
              row={rowIdx}
              column={colIdx}
              highlight={props.step === colIdx}
              clicked={val.clicked}
              color={"Gray"}
              idx={rowIdx * size + colIdx}
              onClick={() => {
                Player.play(rowIdx, colIdx);
                const clone = [...board];
                clone[rowIdx][colIdx].clicked = !clone[rowIdx][colIdx].clicked;
                setBoard(clone);
              }}
            />
          );
        })
      )}
    </div>
  );
}
