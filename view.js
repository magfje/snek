const gameOverText = [
  "9_5",
  "9_6",
  "9_7",
  "9_8",
  "9_11",
  "9_12",
  "9_15",
  "9_19",
  "9_21",
  "9_22",
  "9_23",
  "9_24",
  "10_5",
  "10_10",
  "10_13",
  "10_15",
  "10_16",
  "10_18",
  "10_19",
  "10_21",
  "11_5",
  "11_7",
  "11_8",
  "11_10",
  "11_11",
  "11_12",
  "11_13",
  "11_15",
  "11_17",
  "11_19",
  "11_21",
  "11_22",
  "11_23",
  "12_5",
  "12_8",
  "12_10",
  "12_13",
  "12_15",
  "12_19",
  "12_21",
  "13_5",
  "13_6",
  "13_7",
  "13_8",
  "13_10",
  "13_13",
  "13_15",
  "13_19",
  "13_21",
  "13_22",
  "13_23",
  "13_24",
  "15_7",
  "15_8",
  "15_11",
  "15_13",
  "15_15",
  "15_16",
  "15_17",
  "15_18",
  "15_20",
  "15_21",
  "15_22",
  "15_23",
  "16_6",
  "16_9",
  "16_11",
  "16_13",
  "16_15",
  "16_20",
  "16_23",
  "17_6",
  "17_9",
  "17_11",
  "17_13",
  "17_15",
  "17_16",
  "17_17",
  "17_20",
  "17_23",
  "18_6",
  "18_9",
  "18_11",
  "18_13",
  "18_15",
  "18_20",
  "18_22",
  "19_7",
  "19_8",
  "19_12",
  "19_15",
  "19_16",
  "19_17",
  "19_18",
  "19_20",
  "19_23",
];
const notStarted = [
  "7_2",
  "7_3",
  "7_4",
  "7_5",
  "7_7",
  "7_8",
  "7_9",
  "7_10",
  "7_11",
  "7_14",
  "7_15",
  "7_18",
  "7_19",
  "7_20",
  "7_21",
  "7_23",
  "7_24",
  "7_25",
  "7_26",
  "7_27",
  "8_2",
  "8_9",
  "8_13",
  "8_16",
  "8_18",
  "8_21",
  "8_25",
  "9_2",
  "9_3",
  "9_4",
  "9_5",
  "9_9",
  "9_13",
  "9_14",
  "9_15",
  "9_16",
  "9_18",
  "9_21",
  "9_25",
  "10_5",
  "10_9",
  "10_13",
  "10_16",
  "10_18",
  "10_20",
  "10_25",
  "11_2",
  "11_3",
  "11_4",
  "11_5",
  "11_9",
  "11_13",
  "11_16",
  "11_18",
  "11_21",
  "11_25",
];

const app = document.getElementById("app");
function updateView() {
  app.innerHTML = `
        <div class="grid-container"></div>
        <h2 id="score-container">Score: <span id="score"></span></h2>
    `;
}

updateView();
snekView();

function snekView() {
  let gridContainer = document.querySelector(".grid-container");
  let size = snekModel.size;

  gridContainer.innerHTML = "";
  gridContainer.style.setProperty(
    "grid-template-columns",
    "repeat(" + size + ", auto)"
  );
  gridContainer.style.setProperty(
    "grid-template-rows",
    "repeat(" + size + ", auto)"
  );
  document.getElementById("score").textContent = snekModel.tailLength;

  snekModel.rows.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      let gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");

      gridItem.id = `${col.y}_${col.x}`;

      if (col.isBody) gridItem.classList.add("grid-isBody");

      if (snekModel.gameState == "gameOver") {
        gameOverText.forEach((arrid) => {
          if (gridItem.id == arrid) {
            gridItem.classList.add("grid-isOverText");
          }
        });
      } else if (snekModel.gameState == "notStarted") {
        notStarted.forEach((arrid) => {
          if (gridItem.id == arrid) {
            gridItem.classList.add("grid-isStartText");
          }
        });
      } else if (snekModel.gameState == "running") {
        if (
          rowIndex == 0 ||
          rowIndex == snekModel.size - 1 ||
          colIndex == 0 ||
          colIndex == snekModel.size - 1
        ) {
          gridItem.classList.add("grid-isEdge");
        }

        if (rowIndex == snekModel.head.y && colIndex == snekModel.head.x)
          gridItem.classList.add("grid-isHead");

        if (rowIndex == snekModel.food.y && colIndex == snekModel.food.x)
          gridItem.classList.add("grid-isFood");

        snekModel.tail.forEach((tail) => {
          if (tail.y == rowIndex && tail.x == colIndex) {
            gridItem.classList.add("grid-isBody");
          }
        });
      }
      gridContainer.appendChild(gridItem);
    });
  });
  textButton();
}
