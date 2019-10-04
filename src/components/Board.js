import React, { useState, useEffect, useCallback } from "react";
import Row from "./Row";
import Keyboard from "./Keyboard";
import { map } from "lodash";

const getEmptyRow = size => {
  return [
    new Array(size).fill(0).map(() => {
      return { notes: [], clicked: false };
    })
  ];
};

export default function Board(props) {
  const { maxSize } = props;
  const [board, setBoard] = useState(getEmptyRow(maxSize));
  useEffect(() => {
    const clear = () => {
      const clone = map(board, row => {
        return map(row, val => {
          return { ...val, notes: [], clicked: false };
        });
      });
      setBoard(clone);
    };
    const addRow = () => {
      setBoard(board.concat(getEmptyRow(maxSize)));
    };
    props.emitter.addEventListener("clear", clear);
    props.emitter.addEventListener("addRow", addRow);
    return () => {
      props.emitter.removeEventListener("clear", clear);
      props.emitter.removeEventListener("addRow", addRow);
    };
  }, [props.emitter, props.size, board, maxSize]);

  const lookForEvt = useCallback(
    notes => {
      board.forEach((row, rowIdx) => {
        row.forEach((el, colIdx) => {
          if (el.clicked && !el.notes.length) {
            const clone = [...board];
            clone[rowIdx][colIdx].notes = notes;
            setBoard(clone);
          }
        });
      });
    },
    [board]
  );

  return (
    <div>
      <div className="flex  w-full">
        <div className="flex h-auto m-2 w-full flex-col">
          {board.map((rowData, rowIdx) => (
            <Row
              rowData={rowData}
              maxSize={maxSize}
              step={props.step}
              key={rowIdx}
              onClick={colIdx => {
                const clone = [...board];
                clone[rowIdx][colIdx].clicked = !clone[rowIdx][colIdx].clicked;
                clone[rowIdx][colIdx].notes = [];
                setBoard(clone);
              }}
            />
          ))}
        </div>
      </div>
      <div className="p-4 w-full justify-center">
        <Keyboard onClick={lookForEvt} />
      </div>
    </div>
  );
}
