import React, { useState, useEffect } from "react";
import Button from "./Button";
const getStartingArray = size => {
  return new Array(size).fill(null).map(() => new Array(size).fill(false));
};

const startingTimeout = 500;
const delay = 100;
const subtract = 100;
const maxRipple = 0;

export default function Board(props) {
  const { size } = props;
  const [board, setBoard] = useState(getStartingArray(size));

  const tick = step => {
    console.log("tick", step);
  };

  useEffect(() => {
    setBoard(getStartingArray(props.size));
  }, [props.size]);

  useEffect(() => {
    tick(props.step);
  }, [props.step]);

  const setAndUnset = params => {
    // TODO: Refactor this to use the Tone tick
    const { row, column, time, prev } = params;
    if (board[row][column] === true) {
      return;
    }
    let clone = [...board];
    clone[row][column] = true;
    setBoard(clone);
    setTimeout(() => {
      let cloneTwo = [...board];
      cloneTwo[row][column] = false;
      setBoard(cloneTwo);
    }, time);
    if (time > subtract) {
      let moveDown = row < size - 1 && prev.row <= row;
      let moveUp = row > 0 && prev.row >= row;
      let moveLeft = column > 0 && prev.column >= column;
      let moveRight = column < size - 1 && prev.column <= column;
      if (moveRight) {
        move({ ...params, column: column + 1 });
      }
      if (moveLeft) {
        move({ ...params, column: column - 1 });
      }
      if (moveDown) {
        move({ ...params, row: row + 1 });
      }
      if (moveUp) {
        move({ ...params, row: row - 1 });
      }
    }
  };

  let move = params => {
    if (params.remainingMoves <= 0) {
      return;
    }
    const newTime = params.time - subtract;
    setTimeout(() => {
      setAndUnset({
        ...params,
        time: newTime,
        prev: { row: params.prev.row, column: params.prev.column },
        remainingMoves: params.remainingMoves - 1
      });
    }, delay);
  };

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
        display: "grid",
        gridGap: "8px",
        opacity: props.done ? 0 : 1,
        transition: "opacity 1s ease"
      }}
    >
      {board.map((row, rowIdx) =>
        row.map((highlight, colIdx) => {
          return (
            <Button
              key={`button-${rowIdx}-${colIdx}`}
              row={rowIdx}
              column={colIdx}
              highlight={highlight}
              color={"Gray"}
              idx={rowIdx * size + colIdx}
              onClick={() => {
                setAndUnset({
                  row: rowIdx,
                  column: colIdx,
                  time: startingTimeout,
                  prev: {
                    row: rowIdx,
                    column: colIdx
                  },
                  remainingMoves: maxRipple
                });
              }}
            />
          );
        })
      )}
    </div>
  );
}
