
export function getCardAfterDraggingCard(list, yDraggingCard) {
  let listCards = [...list.querySelectorAll(".card:not(.dragging)")];

  return listCards.reduce(
    (closetCard, nextCard) => {
      let nextCardRect = nextCard.getBoundingClientRect();
      let offset = yDraggingCard - nextCardRect.top - nextCardRect.height / 2;
      if (offset < 0 && offset > closetCard.offset) {
        return { offset, element: nextCard };
      } else {
        return closetCard;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

export function registerEventsOnCard(card) {
  card.addEventListener("dragstart", (e) => {
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", (e) => {
    card.classList.remove("dragging");
  });
}
