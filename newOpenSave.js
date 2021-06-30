let file = document.querySelector('.file');
let New = document.querySelector('.new');
let save = document.querySelector('.save');
// let open = document.querySelector('.openFile');
let fileInputBox = document.querySelector('.fileName');

/* When the user clicks on the File, 
toggle between hiding and showing the dropdown content */
file.addEventListener('click', function() {
  console.log('Inside');
  document.getElementById('myDropdown').classList.toggle('show');
});

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
  console.log('Inside click');
  if (!e.target.matches('.file')) {
    var openDropDown = document.querySelector('.dropdown-content');
    if (openDropDown.classList.contains('show')) {
      openDropDown.classList.remove('show');
    }
  }
};

New.addEventListener('click', function() {
  console.log('Inside new');
  location.reload();
  console.log('After reload');
});

save.addEventListener('click', function() {
  const data = JSON.stringify(sheetDB);
  //convert the data in json form
  const blob = new Blob([data], { type: 'application/json' });
  //create url of blob data
  const url = window.URL.createObjectURL(blob);
  //create anchor tag
  let a = document.createElement('a');
  let fileName = getFileName();
  if (fileName != undefined) {
    fileName = fileName + '.json';
    console.log(fileName);
    //add download location to anchor tag
    a.download = fileName;
    //add the url from which to download
    a.href = url;
    //finally click on anchor tag
    a.click();
  }
});

function getFileName() {
  if (fileInputBox.value == '') {
    alert('Plz Enter file name');
  } else {
    return fileInputBox.value;
  }
}

// open.addEventListener('click', async function() {
//   //first get the opened files arr
//   let filesArr = await open.files;
//   let fileObj = filesArr[0];
//   // then read the file by passing it to file reader
//   let fr = new FileReader(fileObj);
//   fr.readAsText(fileObj);
//   fr.onload = function() {
//     console.log(fr.result);
//   };
// });
