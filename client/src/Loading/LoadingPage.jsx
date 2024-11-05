import React from "react";
import { LoadingUI } from "./LoadingComponent";
import "../assets/overlay.css";
function Overlay() {
  return (
    <div className="overlay">
      <LoadingUI />
    </div>
  );
}
export { Overlay };
