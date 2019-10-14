import React from "react";

export default function Button(props) {
  return (
    <select
      onChange={e => {
        props.onChange(e.target.value);
      }}
      className="border h-10 mx-2 flex border-gray-400 hover:border-gray-500 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      value={props.value}
    >
      {props.options.map(val => (
        <option key={val}>{val}</option>
      ))}
    </select>
  );
}
