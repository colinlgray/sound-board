import React, { useState, useEffect, useCallback } from "react";
import Button from "./Button";
import Keyboard from "./Keyboard";
import { map } from "lodash";
import { usePlayer } from "../utils/Player";

const getStartingArray = (size, instruments) => {
  return new Array(instruments.length).fill(0).map((_, idx) => {
    return new Array(size).fill(0).map(() => {
      return { ...instruments[idx], clicked: false };
    });
  });
};

const initialRows = [{ notes: [] }];

export default function Board(props) {
  const { size } = props;
  const [board, setBoard] = useState(getStartingArray(size, initialRows));
  const player = usePlayer(size);
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
      console.log("test", notes);
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
    <>
      <div className="p-4">
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
                  playNote={(...args) => {
                    player.current.attackRelease(...args);
                  }}
                  onClick={() => {
                    const clone = [...board];
                    clone[rowIdx][colIdx].clicked = !clone[rowIdx][colIdx]
                      .clicked;
                    clone[rowIdx][colIdx].notes = [];
                    setBoard(clone);
                  }}
                />
              );
            })
          )}
        </div>
      </div>
      <div className="p-4">
        <Keyboard onClick={lookForEvt} />
      </div>
    </>
  );
}
