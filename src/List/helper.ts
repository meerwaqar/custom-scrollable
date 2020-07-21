export function getDragAfterElement(
    container: HTMLUListElement,
    position: number,
    isVertical: boolean
  ) {
    const allElements = [
      ...container.querySelectorAll(".list-item:not(.dragging)"),
    ];
    return allElements.reduce(
      (closest: { offset: number; element: Element | null }, child) => {
        const box = child.getBoundingClientRect();
        const offset = isVertical
          ? position - box.top - box.height / 2
          : position - box.left - box.height / 2;
  
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY, element: null }
    ).element;
  }