import { read, save } from './localStorage.js'
import { getCardAfterDraggingCard, registerEventsOnCard } from './dragdropApi.js'

let draggingContainer = document.querySelectorAll(".draggingContainer");
let addBtns = document.querySelectorAll('.addBox-button')

read().forEach(container => {  
  container.items.forEach(item => {
    let cardDiv = document.createElement('div')
    cardDiv.classList.add("card");
    cardDiv.setAttribute("draggable", true);

    let titleDiv = document.createElement('div')  
    titleDiv.classList.add("title");    
    titleDiv.textContent = item

    let deleteDiv = document.createElement('div')
    deleteDiv.classList.add("remove");
    deleteDiv.textContent = 'Del'

    cardDiv.appendChild(titleDiv)
    cardDiv.appendChild(deleteDiv)
      draggingContainer[container.id - 1].appendChild(cardDiv)
  })
  addDragFeature()
  removeEle ()
})


addBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {    
    if (btn.previousElementSibling.value) {
      let cardDiv = document.createElement('div')  
      cardDiv.classList.add("card");
      cardDiv.setAttribute("draggable", true);

      let titleDiv = document.createElement('div')  
      titleDiv.classList.add("title");
      titleDiv.textContent = btn.previousElementSibling.value

      let deleteDiv = document.createElement('div')
      deleteDiv.classList.add("remove");
      deleteDiv.textContent = 'Del'

      cardDiv.appendChild(titleDiv)
      cardDiv.appendChild(deleteDiv)
      draggingContainer[idx].appendChild(cardDiv)
      
      let data = getLists()      
      save(data)
      btn.previousElementSibling.value = ''
      addDragFeature()
    }    
    removeEle ()    
  })
})

function removeEle () {
  let delBtns = document.querySelectorAll('.remove')
  delBtns.forEach((delBtn, idx) => {
    let text = delBtn.previousElementSibling.textContent
    delBtn.addEventListener('click', (e) => {    
      e.target.parentNode.remove()
      let data = read()
      let newData = data.map(container => {
        if (container.items.includes(text)) {
          let newItems = container.items.filter(item => item !== text)
          return { id: container.id, items: newItems }
        } else {
          return container
        }
      })
      save(newData)
    })
  })
}

function addDragFeature() {
  let cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    registerEventsOnCard(card);
  });  
}

draggingContainer.forEach((container) => {
  container.addEventListener("dragover", (e) => {    
    e.preventDefault();
    let draggingCard = document.querySelector(".dragging");
    let cardAfterDraggingCard = getCardAfterDraggingCard(container, e.clientY);
    if (cardAfterDraggingCard) {
      cardAfterDraggingCard.parentNode.insertBefore(
        draggingCard,
        cardAfterDraggingCard
      );
      let data = getLists()
      save(data)
    } else {
      container.appendChild(draggingCard);
      let data = getLists()
      save(data)
    }
  });
  
});

function getLists() {
  const arr = []
  draggingContainer.forEach((container, idx) => {
    let obj = {}
    obj['id'] = idx + 1
    obj['items'] = []
    container.querySelectorAll('.card').forEach(card => {      
      let title = card.querySelector('.title')
      obj['items'].push(title.textContent)
    })
    arr.push(obj)
  })
  return arr
}
