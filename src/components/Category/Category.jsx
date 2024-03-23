import React from "react";

export default function Category({ item }) {
  return (
    <>
      <div className="px-1">
        <img
          src={item.image}
          height={200}
          className="w-100 cursor-pointer"
          alt={item.name}
        />
        <h5>{item.name}</h5>
      </div>
    </>
  );
}
