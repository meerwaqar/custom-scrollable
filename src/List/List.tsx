import React, { useEffect, useState } from "react";
import { ListProps } from "./list.props";
import "./list.style.scss";
import { getDragAfterElement } from "./helper";

const List = (props: ListProps<any>) => {
  const {
    data = [],
    orientation = "vertical",
    showButtons = true,
    showGotoElement = true,
    component,
    width = 500,
    height = 500,
    isDragable = false,
  } = props;

  const isVertical = orientation === "vertical";

  const [elementToScroll, setElementToScroll] = useState(0);

  useEffect(() => {
    if (isDragable) {
      const items = document.querySelectorAll(".list-item");
      const main = document.querySelector(".container");
      items.forEach((item) => {
        // adding class on element being dragged
        item.addEventListener("dragstart", () => {
          item.classList.add("dragging");
        });

        item.addEventListener("dragend", () => {
          item.classList.remove("dragging");
        });
      });

      main?.addEventListener("dragover", (e: any) => {
        // TODO clientY does not exist on type Event
        e.preventDefault(); // to remove disable cursor while dragging
        const draggingItem = document.querySelector(".dragging");
        const isListVertical = orientation === "vertical";
        const position = isListVertical ? e.clientY : e.clientX;
        const afterElement = getDragAfterElement(
          main,
          position,
          isListVertical
        );

        if (afterElement === null) {
          if (draggingItem) main.appendChild(draggingItem);
        } else {
          if (draggingItem) main.insertBefore(draggingItem, afterElement);
        }
      });
    }
  }, []);

  const scroll = (negativeScroll: boolean) => {
    const list = document.querySelector(".container");
    const listItem = document.querySelector(".list-item");
    const box = listItem?.getBoundingClientRect();
    let toScroll = isVertical ? box?.height || 30 : box?.width || 30;
    if (negativeScroll) toScroll = -toScroll;
    console.log(toScroll);
    if (list) {
      const options = isVertical
        ? { top: toScroll + 5 }
        : { left: toScroll + 5 };
      list.scrollBy(options); // 5px Margin
    }
  };

  const gotoSelectedElement = (elementNumber: number) => {
    if (elementNumber > data.length) elementNumber = data.length - 1;
    document.getElementById(`list-item-${elementNumber}`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  return (
    <div className="list" style={{ width, height }}>
      {showButtons && (
        <div className="actions">
          <button onClick={()=>scroll(false)}>
            {orientation === "vertical" ? "Scroll Up" : "Scroll Left"}
          </button>
        </div>
      )}

      <div className="list-main">
        <ul className={`container ${orientation}`} style={{ width, height }}>
          {data.map((value, index) => (
            <li
              draggable={isDragable}
              className={`list-item ${orientation}`}
              id={`list-item-${index}`}
            >
              {component ? component(value, index) : value}
            </li>
          ))}
        </ul>
      </div>
      {showButtons && (
        <div className="actions">
          <button onClick={()=>scroll(false)}>
            {orientation === "vertical" ? "Scroll Down" : "Scroll Right"}
          </button>
        </div>
      )}

      {showGotoElement && (
        <div className="actions">
          <input
            type="number"
            value={elementToScroll}
            onChange={(e) => setElementToScroll(parseInt(e.target.value))}
            placeholder="Enter Element number to scroll to"
          />
          <button onClick={() => gotoSelectedElement(elementToScroll)}>
            Go
          </button>
        </div>
      )}
    </div>
  );
};

export default List;
