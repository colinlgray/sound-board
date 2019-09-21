import React, { useState, useEffect, useCallback } from "react";
import Button from "./Button";
import { map } from "lodash";
import { addNoteListener, removeNoteListener } from "../utils/Player";

const getStartingArray = (size, instruments) => {
  return new Array(instruments.length).fill(0).map((_, idx) => {
    return new Array(size).fill(0).map(() => {
      return { ...instruments[idx], clicked: false };
    });
  });
};

const initialRows = [{ note: "" }];

export default function Board(props) {
  const { size } = props;
  const [board, setBoard] = useState(getStartingArray(size, initialRows));
  useEffect(() => {
    const clear = () => {
      const clone = map(board, row => {
        return map(row, val => {
          val.note = "";
          val.clicked = false;
          return { ...val, note: "", clicked: false };
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
    note => {
      board.forEach((row, rowIdx) => {
        row.forEach((el, colIdx) => {
          if (el.clicked && !el.note) {
            const clone = [...board];
            clone[rowIdx][colIdx].note = note;
            setBoard(clone);
          }
        });
      });
    },
    [board]
  );

  useEffect(() => {
    addNoteListener(lookForEvt);
    return () => {
      removeNoteListener(lookForEvt);
    };
  }, [props.note, lookForEvt]);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${board.length}, 1fr)`,
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
              time={row.length}
              onClick={() => {
                const clone = [...board];
                clone[rowIdx][colIdx].clicked = !clone[rowIdx][colIdx].clicked;
                clone[rowIdx][colIdx].note = "";
                setBoard(clone);
              }}
            />
          );
        })
      )}
    </div>
  );
}
