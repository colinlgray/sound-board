import React, { useState, useEffect } from "react";
import Button from "./Button";

const getStartingArray = (size, instruments) => {
  return new Array(instruments.length).fill(0).map((_, idx) => {
    return new Array(size).fill(0).map(() => {
      return { ...instruments[idx], clicked: false };
    });
  });
};

export default function Board(props) {
  const { size } = props;
  const [board, setBoard] = useState(getStartingArray(size, props.instruments));
  useEffect(() => {
    props.emitter.addEventListener("clear", () => {
      setBoard(getStartingArray(props.size, props.instruments));
    });
    return () => {
      props.emitter.clearCallbacks("clear");
    };
  }, [props.emitter, props.size, props.instruments]);

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
        row.map((noteProps, colIdx) => {
          return (
            <Button
              {...noteProps}
              key={`button-${rowIdx}-${colIdx}`}
              highlight={props.step === colIdx}
              color={"Gray"}
              onClick={() => {
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
