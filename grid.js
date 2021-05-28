let leftCol = document.querySelector('.left-col');
let topRow = document.querySelector('.top-row');
let grid = document.querySelector('.grid');
let addressInput = document.querySelector('.address-input');
let boldBtn = document.querySelector('.bold');
let underlineBtn = document.querySelector('.underline');
let italicBtn = document.querySelector('.italic');
let alignBtns = document.querySelectorAll('.align-container>*');
let fontSizeEle = document.querySelector('.font-size');
let formulaBar = document.querySelector('.formula-input');
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

//making 2-D grid
for (let i = 0; i < rows; ++i) {
  let row = document.createElement('div');
  row.setAttribute('class', 'row');
  for (let j = 0; j < cols; ++j) {
    let cell = document.createElement('div');
    cell.setAttribute('class', 'cell');
    // cell.innerText = `${String.fromCharCode(65 + j)} ${i + 1}`;
    cell.setAttribute('rid', i);
    cell.setAttribute('cid', j);
    cell.setAttribute('contenteditable', 'true');
    row.appendChild(cell);
  }
  grid.appendChild(row);
}

//Making two-d array which represent the cells of one sheet and having a cellobj which holds the status of formatting properties for each cell
let sheetDB = [];
for (let i = 0; i < rows; ++i) {
  let row = [];
  for (let j = 0; j < cols; ++j) {
    let cell = {
      bold: 'normal',
      italic: 'normal',
      underline: 'none',
      textAlign: 'center',
      fontFamily: 'sans-sarif',
      fontSize: '16',
      color: 'black',
      bgColor: 'none',
      value: '',
      formula: '',
      children: []
    };
    row.push(cell);
  }
  sheetDB.push(row);
}

//To iterate over all the cells and add event listener of click to display the cell position in address input box
let allCells = document.querySelectorAll('.grid .cell');
for (let i = 0; i < allCells.length; ++i) {
  allCells[i].addEventListener('click', function() {
    let cid = allCells[i].getAttribute('cid');
    let rid = allCells[i].getAttribute('rid');
    cid = Number(cid);
    rid = Number(rid);
    let address = `${String.fromCharCode(65 + cid)}${rid + 1}`;
    addressInput.value = address;
    //changing the status of bold btn based on cells
    let cellObj = sheetDB[rid][cid];
    if (cellObj.bold == 'bold') {
      boldBtn.classList.add('active-btn');
    } else {
      boldBtn.classList.remove('active-btn');
    }
    if (cellObj.italic == 'italic') {
      italicBtn.classList.add('active-btn');
    } else {
      italicBtn.classList.remove('active-btn');
    }
    if (cellObj.underline == 'underline') {
      underlineBtn.classList.add('active-btn');
    } else {
      underlineBtn.classList.remove('active-btn');
    }
    if(cellObj.formula) {
      formulaBar.value = cellObj.formula;
    } else {
      formulaBar.value = "";
    }
  });
}
//by default show the first cell in address i/p box so click on the first cell by default
allCells[0].click();

//On click on bold button bold the test of selected cell by getting the cell address from address box and toggle it also when clicking again for a particular cell
boldBtn.addEventListener('click', function() {
  let cellEle = findCellEle();
  let rid = cellEle.getAttribute('rid');
  let cid = cellEle.getAttribute('cid');
  let cellObj = sheetDB[rid][cid];
  if (cellObj.bold == 'normal') {
    cellEle.style.fontWeight = 'bold';
    boldBtn.classList.add('active-btn');
    cellObj.bold = 'bold';
  } else {
    cellEle.style.fontWeight = 'normal';
    boldBtn.classList.remove('active-btn');
    cellObj.bold = 'normal';
  }
});

underlineBtn.addEventListener('click', function() {
  let cellEle = findCellEle();
  let rid = cellEle.getAttribute('rid');
  let cid = cellEle.getAttribute('cid');
  let cellObj = sheetDB[rid][cid];
  if (cellObj.underline == 'none') {
    cellEle.style.textDecoration = 'underline';
    underlineBtn.classList.add('active-btn');
    cellObj.underline = 'underline';
  } else {
    cellEle.style.textDecoration = 'none';
    underlineBtn.classList.remove('active-btn');
    cellObj.underline = 'none';
  }
});

italicBtn.addEventListener('click', function() {
  let cellEle = findCellEle();
  let rid = cellEle.getAttribute('rid');
  let cid = cellEle.getAttribute('cid');
  let cellObj = sheetDB[rid][cid];
  if (cellObj.italic == 'normal') {
    cellEle.style.fontStyle = 'italic';
    italicBtn.classList.add('active-btn');
    cellObj.italic = 'italic';
  } else {
    cellEle.style.fontStyle = 'normal';
    italicBtn.classList.remove('active-btn');
    cellObj.italic = 'normal';
  }
});

//allignments
for (let i = 0; i < alignBtns.length; ++i) {
  alignBtns[i].addEventListener('click', function() {
    let allignment = alignBtns[i].getAttribute('class');
    let cellEle = findCellEle();
    cellEle.style.textAlign = allignment;
  });
}

//font-size
fontSizeEle.addEventListener('change', function() {
  let fontSize = fontSizeEle.value;
  let cellEle = findCellEle();
  cellEle.style.fontSize = fontSize + 'px';
});

//gives the cell at a specific address
function findCellEle() {
  let address = addressInput.value;
  let { rid, cid } = getRIDCIDfromAddress(address);
  let cellEle = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  return cellEle;
}

//gives the rowid and cellid from address passed
function getRIDCIDfromAddress(address) {
  let cid = address.charCodeAt(0) - 65;
  let rid = Number(address.slice(1)) - 1;
  return { rid, cid };
}
