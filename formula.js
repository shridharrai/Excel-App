//update the 2-d array(DB) with the cell values also
for (let i = 0; i < allCells.length; ++i) {
  allCells[i].addEventListener('blur', function() {
    let data = allCells[i].innerText;
    let address = addressInput.value;
    let { rid, cid } = getRIDCIDfromAddress(address);
    let cellObj = sheetDB[rid][cid];
    /*If no value is changed in cell only user go and then come out of the cell in that case also the blur event is called for that cell but we have to not removeFormula in that case because the value of cell is not manually changed */
    if (cellObj.value == data) {
      return;
    } else {
      //But if value is changed then removeFormula
      removeFormula(cellObj, address);
      formulaBar.value = '';
    }

    cellObj.value = data;
    //update the children cells when the value of parent cell is updated
    updateChidrens(cellObj);
  });
}

//When user enters the formula then first evaluate the formula entered and then set the evaluated value to the given cell and also to 2-d arr(Db)
formulaBar.addEventListener('keydown', function(e) {
  if (e.key == 'Enter' && formulaBar.value != '') {
    let currFormula = formulaBar.value;
    let address = addressInput.value;
    let { rid, cid } = getRIDCIDfromAddress(address);
    let cellObj = sheetDB[rid][cid];
    //If the formula for a cell is changed in formulabar then remove the cell from parents children arr
    if (cellObj.formula != currFormula) {
      removeFormula(cellObj, address);
    }
    let value = evaluateFormula(currFormula);
    setCellAndDB(value, currFormula);
    //set the parents array with children on which formula is applied
    setChildernArr(currFormula, address);
    updateChidrens(cellObj);
  }
});

/*evaluate the formula entered by first spliting the formula based on spaces as our assumption is that the formula will be entered with spaces and then check the ascii value of first char if it is b/w A to Z then it means it is a address, so get the value of the cell corresponding to this address and replace the address in array with the corresponding value and then finally join the splitted array based on spaces and pass it to eval function for final result */
function evaluateFormula(formula) {
  let formulaTokens = formula.split(' ');
  for (let i = 0; i < formulaTokens.length; ++i) {
    let asciiValue = formulaTokens[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 100) {
      let { rid, cid } = getRIDCIDfromAddress(formulaTokens[i]);
      let value = sheetDB[rid][cid].value;
      if (value == '') {
        value = 0;
      }
      formulaTokens[i] = value;
    }
  }

  let evaluatedFormula = formulaTokens.join(' ');
  return eval(evaluatedFormula);
}

//update the cell and DB with the value and formula
function setCellAndDB(value, formula) {
  let cellEle = findCellEle();
  cellEle.innerText = value;
  let address = addressInput.value;
  let { rid, cid } = getRIDCIDfromAddress(address);
  sheetDB[rid][cid].value = value;
  sheetDB[rid][cid].formula = formula;
}

//first get parents from formula gentered and then inside parentobj children arr push the given children on which the formula is applied
function setChildernArr(formula, childAddress) {
  let formulaTokens = formula.split(' ');
  for (let i = 0; i < formulaTokens.length; ++i) {
    let asciiValue = formulaTokens[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 100) {
      let { rid, cid } = getRIDCIDfromAddress(formulaTokens[i]);
      let parentObj = sheetDB[rid][cid];
      parentObj.children.push(childAddress);
    }
  }
}

/*update the childrens(dependent cells) with the new values due to the corresponding change in parent cell. So, for this first we get the childrens arr from parentobj and then reevalute the formula for childrens cell so that now it gives the new evaluated value of formula based on updated values of parent and finally set the updated value to the children cells and also to its DB representation and then continue this process recursive for grand childrens and so on*/
function updateChidrens(parentObj) {
  let childArr = parentObj.children;
  for (let i = 0; i < childArr.length; ++i) {
    let childAddress = childArr[i];
    let { rid, cid } = getRIDCIDfromAddress(childAddress);
    let childObj = sheetDB[rid][cid];
    let childFormula = childObj.formula;
    let newVal = evaluateFormula(childFormula);
    setChildCellAndDB(newVal, childFormula, rid, cid);
    updateChidrens(childObj);
  }
}

//set the chidren cells with the corresponding rid and cid with new values
function setChildCellAndDB(value, formula, rid, cid) {
  let cellEle = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  cellEle.innerText = value;
  sheetDB[rid][cid].value = value;
  sheetDB[rid][cid].formula = formula;
}

//remove the children from parents chidren arr when value of children cell is manually changed
function removeFormula(cellObj, myAddress) {
  let formula = cellObj.formula;
  let formulaTokens = formula.split(' ');
  for (let i = 0; i < formulaTokens.length; ++i) {
    let asciiValue = formulaTokens[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 100) {
      let { rid, cid } = getRIDCIDfromAddress(formulaTokens[i]);
      let parentObj = sheetDB[rid][cid];
      let idx = parentObj.children.indexOf(myAddress);
      parentObj.children.splice(idx, 1);
    }
  }
  cellObj.formula = '';
}
