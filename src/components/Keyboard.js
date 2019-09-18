import React from "react";
import clsx from "clsx";

const classes = {
  white: "h-40 z-0 bg-gray-100",
  black: "h-20 z-10 bg-gray-800"
};

function Key(props) {
  return (
    <div
      className={clsx(
        "border-2 border-gray w-8",
        { "-ml-4": !props.first },
        props.className,
        classes[props.color]
      )}
      role="button"
    />
  );
}

function KeyGroup(props) {
  return (
    <>
      <Key color="white" first />
      {new Array(props.size).fill(0).map((_, index) => (
        <React.Fragment key={`group-${index}`}>
          <Key color="black" key={`key-${index}`} />
          <Key color="white" key={`key-${index + 1}`} />
        </React.Fragment>
      ))}
    </>
  );
}

export default function Keyboard() {
  return (
    <div className="flex">
      <KeyGroup size={2} />
      <KeyGroup size={3} />
      <KeyGroup size={2} />
      <KeyGroup size={3} />
    </div>
  );
}
