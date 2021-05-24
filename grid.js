let leftCol = document.querySelector('.left-col');
let topRow = document.querySelector('.top-row');
let grid = document.querySelector('.grid');
let rows = 100;
let cols = 26;

//making left-col from 1 to 100
for (let i = 0; i < rows; ++i) {
  let colBox = document.createElement('div');
  colBox.innerText = i + 1;
  colBox.setAttribute('class', 'box');
  leftCol.appendChild(colBox);
}

//making top-row from A to Z
for (let i = 0; i < cols; ++i) {
  let cell = document.createElement('div');
  cell.innerText = String.fromCharCode(65 + i);
  cell.setAttribute('class', 'cell');
  topRow.appendChild(cell);
}

for (let i = 0; i < rows; ++i) {
  let row = document.createElement('div');
  row.setAttribute('class', 'row');
  for (let j = 0; j < cols; ++j) {
    let cell = document.createElement('div');
    cell.setAttribute('class', 'cell');
    cell.innerText = `${String.fromCharCode(65 + j)} ${i + 1}`;
    row.appendChild(cell);
  }
  grid.appendChild(row);
}
