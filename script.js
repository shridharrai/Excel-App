let btnContainer = document.querySelector('.add-sheet-btn-container');
let sheetList = document.querySelector('.sheet-list');

//add active class for firstsheet whenever in future user clicks on it
let firstSheet = document.querySelector('.sheet');
firstSheet.addEventListener('click', makeMeActive);

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

  //add active class whenever in future user clicks on it
  newSheet.addEventListener('click', makeMeActive);
});

function makeMeActive(e) {
  let sheet = e.currentTarget;
  let allSheets = document.querySelectorAll('.sheet');
  for (let i = 0; i < allSheets.length; ++i) {
    allSheets[i].classList.remove('active');
  }
  sheet.classList.add('active');
}
