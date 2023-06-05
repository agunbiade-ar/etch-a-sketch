let container = document.getElementsByClassName('container')[0];

function createDefault(n = 16, color = '#ffffff') {
  let slateToAddItemsTo = document.createDocumentFragment();

  for (let i = 0; i < n; i++) {
    let rowContainerDiv = document.createElement('div');
    for (let j = 0; j < n; j++) {
      let width = (40 * 16) / n;
      let height = (30 * 16) / n;
      let newDiv = document.createElement('div');

      newDiv.className = 'innerDivInRow';
      newDiv.style.width = `${width}px`;
      newDiv.style.height = `${height}px`;
      newDiv.style.backgroundColor = color;
      newDiv.id = i * j + (i + j + 1);

      rowContainerDiv.appendChild(newDiv);
    }
    slateToAddItemsTo.appendChild(rowContainerDiv);
  }
  container.appendChild(slateToAddItemsTo);
}

let blackButton = document.getElementsByClassName('black-mode')[0];
let rainbowButton = document.getElementsByClassName('rainbow-mode')[0];
let newGrid = document.getElementsByClassName('new-grid')[0];
let eraseBtn = document.getElementsByClassName('erase-btn')[0];
let clearSquares = document.getElementsByClassName('clear-squares')[0];

let color = '#ffffff';
let gridNumber = 16;
let mouseOverElementTracker = [];

function generateRandomColor() {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
}

newGrid.addEventListener('click', function () {
  gridNumber = prompt(
    'input a number of squares for the grid, with a max of 100'
  );

  if (Number(gridNumber) > 0 && Number(gridNumber) < 101) {
    gridNumber = Number(gridNumber);
  } else {
    gridNumber = 16;
  }

  removeChildElements(container);
  reset(gridNumber);
});

blackButton.addEventListener('click', function () {
  color = '#000000';
});

rainbowButton.addEventListener('click', function () {
  color = generateRandomColor();
});

eraseBtn.addEventListener('click', function () {
  color = '#fff';
});

clearSquares.addEventListener('click', function () {
  removeChildElements(container);
  reset(gridNumber);
});

container.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('innerDivInRow')) {
    let element = mouseOverElementTracker.filter(
      (el) => el.id === e.target.id
    )[0];

    if (Boolean(element)) {
      e.target.style.backgroundColor = color;
      changeColorOfAnElement(element, color);
    } else {
      element = setMouseOverElementTracker({
        id: e.target.id,
        color,
        count: 1,
      });
    }

    console.log(mouseOverElementTracker);
    if (!toggle()) {
      if (color === '#ffffff') e.target.style.backgroundColor = color;
      else {
        color = generateRandomColor();
      }
    }
    e.target.style.backgroundColor = color;
  }
});

function removeChildElements(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function reset(n, color) {
  createDefault(n, color);
}

function toggle() {
  return color === '#000000' ? true : false;
}

function setMouseOverElementTracker({ id, color, count }) {
  mouseOverElementTracker.push({ id, color, count });
  return { id, color, count };
}

function changeColorOfAnElement(element, color) {
  mouseOverElementTracker = mouseOverElementTracker.map((el) => {
    if (el.id === element.id) {
      el.color = color;
    }
    return el;
  });
}
createDefault(gridNumber);
