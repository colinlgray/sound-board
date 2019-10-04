import React, { useState, useEffect, useCallback } from "react";
import Row from "./Row";
import Keyboard from "./Keyboard";
import { map } from "lodash";

const getStartingArray = (size, instruments) => {
  return new Array(instruments.length).fill(0).map((_, idx) => {
    return new Array(size).fill(0).map(() => {
      return { ...instruments[idx], clicked: false };
    });
  });
};

const initialRows = [{ notes: [] }, { notes: [] }];

export default function Board(props) {
  const { maxSize } = props;
  const [board, setBoard] = useState(getStartingArray(maxSize, initialRows));
  useEffect(() => {
    const clear = () => {
      const clone = map(board, row => {
        return map(row, val => {
          return { ...val, notes: [], clicked: false };
        });
      });
      setBoard(clone);
    };
    props.emitter.addEventListener("clear", clear);
    return () => {
      props.emitter.removeEventListener("clear", clear);
    };
  }, [props.emitter, props.size, board]);

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
