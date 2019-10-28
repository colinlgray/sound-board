import React from "react";
import Row from "./Row";
import Keyboard from "./Keyboard";

export default function Board(props) {
  const {
    maxSize,
    synthName,
    board,
    onButtonClick,
    onDeleteRow,
    onNotePress
  } = props;

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
                onButtonClick(rowIdx, colIdx);
              }}
              onDelete={() => {
                onDeleteRow(rowIdx);
              }}
            />
          ))}
        </div>
      </div>
      <div className="p-4 w-full justify-center">
        <Keyboard synthName={synthName} onNotePress={onNotePress} />
      </div>
    </div>
  );
}
