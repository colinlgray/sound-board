import React from "react";

export default function Button(props) {
  return (
    <div>
      <input
        className="btn w-full bg-gray-600"
        key={`button-${props.row}-${props.column}`}
      />
    </div>
  );
}
