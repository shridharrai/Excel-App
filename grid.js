let leftCol = document.querySelector('.left-col');
let topRow = document.querySelector('.top-row');
let grid = document.querySelector('.grid');
let addressInput = document.querySelector('.address-input');
let boldBtn = document.querySelector('.bold');
let underlineBtn = document.querySelector('.underline');
let italicBtn = document.querySelector('.italic');
let fontSizeEle = document.querySelector('.font-size');
let fontFamilyEle = document.querySelector('.font-family');
let textAlignEle = document.querySelector('.align-container');
let textColorEle = document.querySelector('#color');
let bgColorEle = document.querySelector('#bg-color');
let formulaBar = document.querySelector('.formula-input');
let btnContainer = document.querySelector('.add-sheet-btn-container');
let sheetList = document.querySelector('.sheet-list');
let firstSheet = document.querySelector('.sheet');
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

let sheetArr = [];
let sheetDB;
firstSheet.addEventListener('click', makeMeActive);
firstSheet.click();

function makeMeActive(e) {
  //first remove the active class from all other sheets and then set to the curr sheet
  let sheet = e.currentTarget;
  let allSheets = document.querySelectorAll('.sheet');
  for (let i = 0; i < allSheets.length; ++i) {
    allSheets[i].classList.remove('active');
  }
  sheet.classList.add('active');

  /*then check that whether the 2-D representation of sheet(sheetDB) is present in 3-d arr(sheetArr) or not. If not present then it means it is the first sheet so create a new sheet in DB and then point the sheetDB to the curr sheet and also set the UI to the curr sheet */
  let idx = sheet.getAttribute('idx');
  // console.log(idx);
  if (!sheetArr[idx]) {
    createSheetInDB();
  }
  sheetDB = sheetArr[idx];
  /*To reset the UI acc to the curr sheet from DB, it means the UI is same always only we are changing on the same UI based on sheet representation from DB */
  setUIToCurrSheet();
  let allCells = document.querySelectorAll('.grid .cell');
  allCells[0].click();
}

btnContainer.addEventListener('click', function() {
  //create new sheet and attach the idx attribute by getting the lastidx
  let allSheets = document.querySelectorAll('.sheet');
  let lastSheet = allSheets[allSheets.length - 1];
  let lastIdx = lastSheet.getAttribute('idx');
  lastIdx = Number(lastIdx);
  let newSheet = document.createElement('div');
  newSheet.setAttribute('class', 'sheet');
  newSheet.setAttribute('idx', `${lastIdx + 1}`);
  newSheet.innerText = `Sheet ${lastIdx + 2}`;
  sheetList.appendChild(newSheet);

  //first remove active class from all other sheets and then attach it to newsheet
  for (let i = 0; i < allSheets.length; ++i) {
    allSheets[i].classList.remove('active');
  }
  newSheet.classList.add('active');

  //create a representation of the sheet in DB also
  createSheetInDB();
  sheetDB = sheetArr[lastIdx + 1];
  setUIToCurrSheet();

  //add active class whenever in future user clicks on it
  newSheet.addEventListener('click', makeMeActive);
  let allCells = document.querySelectorAll('.grid .cell');
  allCells[0].click();
});

//Making two-d array which represent the cells of one sheet and having a cellobj which holds the status of formatting properties for each cell and then put this two-d arr in a one-d array for the n no. of sheets
function createSheetInDB() {
  let newDB = [];
  for (let i = 0; i < rows; ++i) {
    let row = [];
    for (let j = 0; j < cols; ++j) {
      let cell = {
        bold: 'normal',
        italic: 'normal',
        underline: 'none',
        textAlign: 'center',
        fontFamily: 'sans-sarif',
        fontSize: '16px',
        textColor: 'black',
        bgColor: 'white',
        value: '',
        formula: '',
        children: []
      };
      let ele = document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
      ele.innerText = '';
      row.push(cell);
    }
    newDB.push(row);
  }
  //push the 2-d arr formed to the 3-d arr
  sheetArr.push(newDB);
}

//set the UI to the curr sheet from DB
function setUIToCurrSheet() {
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      let ele = document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
      let cell = sheetDB[i][j];
      ele.innerText = cell.value;
      ele.style.fontWeight = cell.bold;
      ele.style.textDecoration = cell.underline;
      ele.style.fontStyle = cell.italic;
      ele.style.fontSize = cell.fontSize;
      ele.style.fontFamily = cell.fontFamily;
      ele.style.textAlign = cell.textAlign;
      ele.style.color = cell.textColor;
      ele.style.backgroundColor = cell.bgColor;
    }
  }
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
      boldBtn.classList.add('active-style');
    } else {
      boldBtn.classList.remove('active-style');
    }
    if (cellObj.italic == 'italic') {
      italicBtn.classList.add('active-style');
    } else {
      italicBtn.classList.remove('active-style');
    }
    if (cellObj.underline == 'underline') {
      underlineBtn.classList.add('active-style');
    } else {
      underlineBtn.classList.remove('active-style');
    }
    if (cellObj.fontSize) {
      // console.log(cellObj.fontSize);
      fontSizeEle.value = cellObj.fontSize;
    }
    if (cellObj.fontFamily) {
      fontFamilyEle.value = cellObj.fontFamily;
    }
    if (cellObj.textAlign) {
      textAlignEle.value = cellObj.textAlign;
    }
    if (cellObj.textColor) {
      textColorEle.value = cellObj.textColor;
    }
    if (cellObj.bgColor) {
      bgColorEle.value = cellObj.bgColor;
    }
    if (cellObj.formula) {
      formulaBar.value = cellObj.formula;
    } else {
      formulaBar.value = '';
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
    boldBtn.classList.add('active-style');
    cellObj.bold = 'bold';
  } else {
    cellEle.style.fontWeight = 'normal';
    boldBtn.classList.remove('active-style');
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
    underlineBtn.classList.add('active-style');
    cellObj.underline = 'underline';
  } else {
    cellEle.style.textDecoration = 'none';
    underlineBtn.classList.remove('active-style');
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
    italicBtn.classList.add('active-style');
    cellObj.italic = 'italic';
  } else {
    cellEle.style.fontStyle = 'normal';
    italicBtn.classList.remove('active-style');
    cellObj.italic = 'normal';
  }
});

//font-size
fontSizeEle.addEventListener('change', function() {
  let fontSize = fontSizeEle.value;
  let cellEle = findCellEle();
  let rid = cellEle.getAttribute('rid');
  let cid = cellEle.getAttribute('cid');
  let cellObj = sheetDB[rid][cid];
  cellEle.style.fontSize = fontSize;
  cellObj.fontSize = fontSize;
});

//font-family
fontFamilyEle.addEventListener('change', function() {
  let fontFamily = fontFamilyEle.value;
  let cellEle = findCellEle();
  let rid = cellEle.getAttribute('rid');
  let cid = cellEle.getAttribute('cid');
  let cellObj = sheetDB[rid][cid];
  cellEle.style.fontFamily = fontFamily;
  cellObj.fontFamily = fontFamily;
});

//allignments
textAlignEle.addEventListener('change', function() {
  let textAlign = textAlignEle.value;
  let cellEle = findCellEle();
  let rid = cellEle.getAttribute('rid');
  let cid = cellEle.getAttribute('cid');
  let cellObj = sheetDB[rid][cid];
  cellEle.style.textAlign = textAlign;
  cellObj.textAlign = textAlign;
});

//Text-color
textColorEle.addEventListener('change', function(e) {
  let textColor = e.target.value;
  let cellEle = findCellEle();
  let rid = cellEle.getAttribute('rid');
  let cid = cellEle.getAttribute('cid');
  let cellObj = sheetDB[rid][cid];
  cellEle.style.color = textColor;
  cellObj.textColor = textColor;
});

//bg-color
bgColorEle.addEventListener('change', function(e) {
  let bgColor = e.target.value;
  let cellEle = findCellEle();
  let rid = cellEle.getAttribute('rid');
  let cid = cellEle.getAttribute('cid');
  let cellObj = sheetDB[rid][cid];
  cellEle.style.backgroundColor = bgColor;
  cellObj.bgColor = bgColor;
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
