let save = document.querySelector('.save');
let open = document.querySelector('.open');

save.addEventListener('click', function() {
  const data = JSON.stringify(sheetDB);
  //convert the data in json form
  const blob = new Blob([data], { type: 'application/json' });
  //create url of blob data
  const url = window.URL.createObjectURL(blob);
  //create anchor tag
  let a = document.createElement('a');
  //add download location to anchor tag
  a.download = 'file.json';
  //add the url from which to download
  a.href = url;
  //finally click on anchor tag
  a.click();
});

open.addEventListener('change', function() {
  //first get the opened files arr
  let filesArr = open.files;
  let fileObj = filesArr[0];
  // then read the file by passing it to file reader
  let fr = new FileReader(fileObj);
  fr.readAsText(fileObj);
  fr.onload = function() {
    console.log(fr.result);
  };
});
