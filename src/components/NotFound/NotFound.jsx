import React from "react";
import NotFoundimg from "../../assests/images/error.svg";

export default function NotFound() {
  return (
    <div className="d-flex align-item-center justify-content-center">
      <img className="w-100" src={NotFoundimg} alt="NotFoundimg" />
    </div>
  );
}
