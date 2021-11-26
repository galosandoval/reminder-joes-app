import React, { useState } from "react";
import { expandSVG, minimizeSVG, xSVG } from "../../styles/svgs";
import { TodoList } from "./TodoList";

const initialPaperState = {
  class: "paper__container",
  isExpanded: false
};

const Paper = ({ listState, handleClick, grocerylistId }) => {
  const [paperState, setPaperState] = useState(initialPaperState);

  const handleFullscreen = (event) => {
    const { name } = event.currentTarget;

    if (name === "expand") {
      setPaperState({
        class: "paper__container paper__container--fullscreen",
        isExpanded: true
      });
    }

    if (name === "minimize") {
      setPaperState(initialPaperState);
    }
  };

  return (
    <div className="paper" style={{ top: `${listState.setTop}%` }}>
      <div className={paperState.class}>
        {paperState.isExpanded ? (
          <div className="paper__btn-container">
            <button
              className="paper__btn paper__btn-minimize"
              name="minimize"
              onClick={handleFullscreen}
            >
              {minimizeSVG}
            </button>
          </div>
        ) : (
          <div className="paper__btn-container">
            <button
              className="paper__btn paper__btn-expand"
              name="expand"
              onClick={handleFullscreen}
            >
              {expandSVG}
            </button>
            <button className="paper__btn paper__btn-close" name="close-list" onClick={handleClick}>
              {xSVG}
            </button>
          </div>
        )}
        <div className="paper__pattern">
          <div className="paper__content">
            <div className="paper__todo-list">
              <TodoList grocerylistId={grocerylistId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paper;
