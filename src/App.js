import React, { useState, useEffect, useRef, useCallback } from "react";
import Board from "./components/Board";
import FFT from "./components/FFT";
import Meter from "./components/Meter";
import Dropdown from "./components/Dropdown";
import Player from "./utils/Player";
import { postSequence, getSequence } from "./utils/network";
import { map } from "lodash";
import "./styles/tailwind.css";
import { maxTimeCount, synthOptions } from "./constants";

const buttonClasses =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1";
const maxSize = maxTimeCount;
const defaultSize = 8;
const initialStep = -1;

const getEmptyRow = size => {
  return [
    new Array(size).fill(0).map(() => {
      return { notes: [], synthName: null, clicked: false };
    })
  ];
};

function App() {
  const [step, setStep] = useState(initialStep);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [shareId, setShareId] = useState("");
  const [synthName, setSynthName] = useState(synthOptions[0]);
  const [board, setBoard] = useState(getEmptyRow(defaultSize));
  const stepContainer = useRef(step);
  const loopPlayer = useRef();

  const tick = () => {
    let newVal;
    if (stepContainer.current + 1 < maxSize) {
      newVal = stepContainer.current + 1;
    } else {
      newVal = 0;
    }
    stepContainer.current = newVal;
    setStep(stepContainer.current);
  };

  const onNotePress = useCallback(
    notes => {
      board.forEach((row, rowIdx) => {
        row.forEach((el, colIdx) => {
          if (el.clicked && !el.notes.length) {
            const clone = [...board];
            clone[rowIdx][colIdx].notes = notes;
            clone[rowIdx][colIdx].synthName = synthName;
            setBoard(clone);
          }
        });
      });
    },
    [board, synthName]
  );

  useEffect(() => {
    // Setup time loop
    loopPlayer.current = new Player(1);
    loopPlayer.current.createLoop(tick);

    // Look for query param
    const urlParams = new URLSearchParams(window.location.search);

    // key listener for modal
    const modalCloseListener = e => {
      if (e.keyCode === 27) {
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", modalCloseListener);
    if (urlParams.has("sequence") && urlParams.get("sequence").length === 24) {
      getSequence(urlParams.get("sequence"))
        .then(board => {
          setBoard(board);
        })
        .catch(err => {
          console.error("error parsing board");
          console.error(err);
        });
    }

    return () => {
      window.removeEventListener("keydown", modalCloseListener);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-200">
      {showModal && (
        <div
          id="modal-bg"
          onClick={e => {
            if (e.target && e.target.id === "modal-bg" && showModal) {
              setShowModal(false);
            }
          }}
          style={{ backgroundColor: "rgba(25, 25, 25, .5)" }}
          className="fixed inset-0 z-50 overflow-auto flex"
        >
          <div className="relative p-8 bg-white max-w-2xl min-w-md m-auto flex-col opacity-100 flex rounded">
            {saving && <p>Saving...</p>}
            {!saving && (
              <a
                className="font-mono text-lg text-gray-800 text-center underline"
                href={`${
                  window.location.href.split("?")[0]
                }?sequence=${shareId}`}
              >
                {window.location.href.split("?")[0]}?sequence={shareId}
              </a>
            )}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between p-1">
        <Meter />
        <FFT />
        <Meter />
      </div>
      <div className="flex items-center justify-between p-1 text-sm">
        <button
          className={buttonClasses}
          onClick={() => {
            loopPlayer.current.constructor.startLoop();
          }}
        >
          Start
        </button>
        <button
          className={buttonClasses}
          onClick={() => {
            loopPlayer.current.stopLoop();

            stepContainer.current = initialStep;
            setStep(initialStep);
          }}
        >
          Stop
        </button>
        <button
          className={buttonClasses}
          onClick={() => {
            const clone = map(board, row => {
              return map(row, val => {
                return { ...val, notes: [], clicked: false };
              });
            });
            setBoard(clone);
          }}
        >
          Clear
        </button>
        <button
          className={buttonClasses}
          onClick={() => {
            setBoard(board.concat(getEmptyRow(defaultSize)));
          }}
        >
          Add row
        </button>
        <button
          className={buttonClasses}
          disabled={saving}
          onClick={() => {
            setShowModal(true);
            setSaving(true);
            postSequence(board)
              .then(res => {
                setShareId(res._id);
                setSaving(false);
              })
              .catch(() => {
                setSaving(false);
              });
          }}
        >
          Share
        </button>
        <Dropdown
          options={synthOptions}
          value={synthName}
          onChange={val => {
            setSynthName(val);
          }}
        />
      </div>
      <Board
        maxSize={maxSize}
        step={step}
        synthName={synthName}
        board={board}
        setBoard={setBoard}
        onButtonClick={(rowIdx, colIdx) => {
          const clone = [...board];
          clone[rowIdx][colIdx].clicked = !clone[rowIdx][colIdx].clicked;
          clone[rowIdx][colIdx].notes = [];
          setBoard(clone);
        }}
        onDeleteRow={rowIdx => {
          const clone = [...board];
          clone.splice(rowIdx, 1);
          setBoard(clone);
        }}
        onNotePress={onNotePress}
      />
    </div>
  );
}

export default App;
