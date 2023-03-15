initModel();
var snekModel;
function initModel() {
  snekModel = new Object();
  snekModel.size = 30;
  snekModel.head = genRandPos();
  snekModel.food = genRandPos();
  snekModel.tailLength = 0;
  snekModel.tail = [];
  snekModel.rows = [];
  /* snekModel.head.next = null; */
  snekModel.direction;
  snekModel.fps = 10;
  snekModel.gameState = "notStarted";
}

initGrid();
function initGrid() {
  snekModel.rows = [];

  for (let row = 0; row < snekModel.size; row++) {
    // rows
    let newRow = [];
    for (let column = 0; column < snekModel.size; column++) {
      // objects in rows
      let newColumn = new Object();
      newColumn.y = row;
      newColumn.x = column;

      newRow.push(newColumn);
    }
    snekModel.rows.push(newRow);
  }
}

function addTail() {
  let newTail = { x: snekModel.head.x, y: snekModel.head.y, next: null };
  snekModel.tail.push(newTail);

  /*   if (snekModel.tailLength == 0) {
    snekModel.head.next = newTail;
  } else {
    let curr = snekModel.head;
    while (curr.next !== null) {
      curr = curr.next;
    }
    curr.next = newTail;
  } */

  if (snekModel.tail.length > snekModel.tailLength + 1) {
    //snekModel.head.next = snekModel.head.next.next;
    snekModel.tail.shift();
  }
}

function addFood() {
  snekModel.food = genRandPos();
}

function checkHead() {
  //check outofbounds
  if (snekModel.head.x < 0) snekModel.head.x = snekModel.size - 1;
  if (snekModel.head.x > snekModel.size - 1) snekModel.head.x = 0;
  if (snekModel.head.y < 0) snekModel.head.y = snekModel.size - 1;
  if (snekModel.head.y > snekModel.size - 1) snekModel.head.y = 0;

  //checkFood
  if (
    snekModel.head.x == snekModel.food.x &&
    snekModel.head.y == snekModel.food.y
  ) {
    snekModel.tailLength++;
    snekModel.fps += 1;
    addFood();
  }

  //check collision with tail
  for (let i = 0; i < snekModel.tail.length; i++) {
    if (i > 1) {
      if (
        snekModel.head.x == snekModel.tail[i].x &&
        snekModel.head.y == snekModel.tail[i].y
      ) {
        gameOver();
      }
    }
  }
}
let gameTick;
function move() {
  if (snekModel.direction == "ArrowUp") {
    snekModel.head.y--;
  } else if (snekModel.direction == "ArrowDown") {
    snekModel.head.y++;
  } else if (snekModel.direction == "ArrowLeft") {
    snekModel.head.x -= 1;
  } else if (snekModel.direction == "ArrowRight") {
    snekModel.head.x++;
  }
  checkHead();
  addTail();
  snekView();

  gameTick = setTimeout(() => {
    requestAnimationFrame(move);
  }, 1000 / snekModel.fps);
}

function genRandPos() {
  return {
    x: Math.floor(Math.random() * snekModel.size),
    y: Math.floor(Math.random() * snekModel.size),
  };
}

document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft" && snekModel.direction !== "ArrowRight")
    snekModel.direction = "ArrowLeft";
  if (e.key == "ArrowRight" && snekModel.direction !== "ArrowLeft")
    snekModel.direction = "ArrowRight";
  if (e.key == "ArrowDown" && snekModel.direction !== "ArrowUp")
    snekModel.direction = "ArrowDown";
  if (e.key == "ArrowUp" && snekModel.direction !== "ArrowDown")
    snekModel.direction = "ArrowUp";
});

function textButton() {
  const textSelect = document.querySelectorAll(".grid-isStartText");

  for (let x = 0; x < textSelect.length; x++) {
    textSelect[x].addEventListener("click", function () {
      gameStart();
    });
  }
}

function gameOver() {
  clearTimeout(gameTick);
  cancelAnimationFrame(move);
  snekModel.gameState = "gameOver";
  setTimeout(() => {
    snekView();
    initModel();
    initGrid();
    console.log("gameOver");
  }, 2000);
  setTimeout(() => {
    snekView();
  }, 6000);
}

function gameStart() {
  snekModel.gameState = "running";
  snekView();
  move();
}
