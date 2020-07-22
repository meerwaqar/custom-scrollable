import React, { useEffect, useState, useRef } from "react";
import { getDragAfterElement } from "./helper";
import "./list.style.scss";

interface ListProps<T> {
  data?: Array<T>;
  showButtons?: boolean;
  showGotoElement?: boolean;
  orientation?: "vertical" | "horizontal";
  component?: (value: T, index: number) => JSX.Element;
  width?: number;
  height?: number;
  isDragable?: boolean;
}

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
  const listItemRefs = useRef(
    [...new Array(data.length)].map(() => React.createRef<HTMLLIElement>())
  );
  const listMainRef = useRef(React.createRef<HTMLUListElement>());

  useEffect(() => {
    if (isDragable) {
      const main = listMainRef.current;
      listItemRefs.current.forEach(({ current: item }) => {
        // adding class on element being dragged
        item?.addEventListener("dragstart", () => {
          item.classList.add("dragging");
        });

        item?.addEventListener("dragend", () => {
          item.classList.remove("dragging");
        });
      });

      if (main) {
        main.current?.addEventListener("dragover", (e: any) => {
          // TODO clientY does not exist on type Event
          e.preventDefault(); // to remove disable cursor while dragging
          const dragging = listItemRefs.current.filter((item) =>
            item.current?.classList.contains("dragging")
          );
          let draggingItem = dragging[0]?.current;
          const isListVertical = orientation === "vertical";
          const position = isListVertical ? e.clientY : e.clientX;
          if (main.current) {
            const afterElement = getDragAfterElement(
              main.current,
              position,
              isListVertical
            );
            if (draggingItem) {
              if (afterElement === null)
                main.current?.appendChild(draggingItem);
              else main.current?.insertBefore(draggingItem, afterElement);
            }
          }
        });
      }
    }
  }, [isDragable, listItemRefs]);

  const scroll = (negativeScroll: boolean) => {
    const list = listMainRef.current;
    const listItem = listItemRefs.current[0].current;
    if (!list || !listItem) return;

    const box = listItem?.getBoundingClientRect();
    let toScroll = isVertical ? box?.height || 30 : box?.width || 30;
    if (negativeScroll) toScroll = -toScroll;
    if (list) {
      const options = isVertical
        ? { top: toScroll + 5 }
        : { left: toScroll + 5 };
      list?.current?.scrollBy({ ...options, behavior: "smooth" }); // 5px Margin
    }
  };

  const gotoSelectedElement = (elementNumber: number) => {
    if (elementNumber >= data.length) elementNumber = data.length - 1;
    if (listItemRefs.current.length) {
      const toScrollElement = listItemRefs.current[elementNumber].current;
      toScrollElement?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  return (
    <div className="list" style={{ width }}>
      {showButtons && (
        <div className="actions">
          <button onClick={() => scroll(true)}>
            {orientation === "vertical" ? "Scroll Up" : "Scroll Left"}
          </button>
        </div>
      )}

      <div className="list-main">
        <ul
          ref={listMainRef.current}
          className={`container ${orientation}`}
          style={{ width, height: isVertical ? height : "auto" }}
        >
          {data.map((value, index) => (
            <li
              ref={listItemRefs.current[index]}
              draggable={isDragable}
              className={`list-item ${orientation}`}
              id={`list-item-${index}`}
              key={`list-item-${index}`}
            >
              {component ? component(value, index) : value}
            </li>
          ))}
        </ul>
      </div>
      {showButtons && (
        <div className="actions">
          <button onClick={() => scroll(false)}>
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
