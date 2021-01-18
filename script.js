const field = document.getElementById('field');
let gameArray = [];
let gamePlay = true;
let clickNum = 0;
let rightGuess = 0;
let clickTotal = 0;
let previewNum = 0;
let rightGuessArr = ['0', 'field'];
let width, height, numberImg, imageDir, sec, min, target, target_1, tempCell, tempCell_1;
let timeSec = null;

imageLoad('kids/');
imageLoad('logos/');
imageLoad('faces/');


function resetGame() {
  height = 0;
  width = 0;
  numberImg = 0;
  rightGuess = 0;
  clickNum = 0;
  clickTotal = 0;
  sec = 1;
  min = 0;
  clickTotal = 0;
  previewNum = 0;
  rightGuessArr = ['0', 'field'];
  gameArray = [];
  gamePlay = true;
  document.getElementById('field').innerHTML = '';
  document.getElementById('mins').innerHTML = '00';
  document.getElementById('seconds').innerHTML = '00';
  document.getElementById('preview').style.color = 'black';
  field.style.backgroundImage = 'none';
  if (timeSec) window.clearInterval(timeSec);
}

function newGame() {
  resetGame();
  init();
 }

 function init() {
  const imageSet = document.getElementById('imageSet').value;
  if (imageSet == 'Brand logos') imageDir = "'logos/";
  if (imageSet == 'Kids theme') imageDir = "'kids/";
  if (imageSet == 'Faces') imageDir = "'faces/";
  const gameSize = document.getElementById('gameSize').value;
  if (gameSize == '6 X 10') {
    height = 6;
    width = 10;
    numberImg = 31;

  } else if (gameSize == '6 X 6') {
    height = 6;
    width = 6;
    numberImg = 19;
  } else if (gameSize == '6 X 8') {
    height = 6;
    width = 8;
    numberImg = 25;
  }

  for (let i = 0; i < height; ++i) {
    const gameRow = [];
    const row = document.createElement('div');
    row.className = 'row';
    row.setAttribute('id', '0');
    field.appendChild(row);
    for (let j = 0; j < width; ++j) {
      gameRow[j] = 0;
      const cell = document.createElement('div');
      cell.className = 'col cell';
      if (gameSize == '6 X 10') cell.style.paddingTop = '8%';
      row.appendChild(cell);
      cell.setAttribute('id', String(i) + String(j));
    }
    gameArray[i] = gameRow;
  }

  imagePut();
  imagePut();
}

function imagePut() {
  let imgCount = 1;
  while (imgCount < numberImg) {
    const temp = getRandomXY();
    if (gameArray[temp[0]][temp[1]] == 0) {
      gameArray[temp[0]][temp[1]] = imgCount;
      ++imgCount;
    }
  }
}

function getRandomXY() {
  const y = parseInt(Math.floor(Math.random() * width));
  const x = parseInt(Math.floor(Math.random() * height));
  return [x, y];
}

function gameClick() {
  if (gamePlay) {
    if (clickTotal == 0) timeSec = setInterval(timer, 1000);
    document.getElementById('preview').style.color = '#a7aaad';
    ++clickTotal;
    if (clickNum == 0) {
      target = event.target;
      if (rightGuessArr.includes(target.id)) {
        gamePlay = true;
        return;
      }
      const x = target.id[0];
      const y = target.id[1];
      tempCell = gameArray[x][y];
      target.style.backgroundColor = 'white';
      target.style.backgroundImage = "url(" + imageDir + tempCell + ".png')";
      ++clickNum;

    } else {
      gamePlay = false;
      target_1 = event.target;
      if (target == target_1 || rightGuessArr.includes(target_1.id)) {
        gamePlay = true;
        return;
      }
      var x = target_1.id[0];
      var y = target_1.id[1];
      tempCell_1 = gameArray[x][y];
      target_1.style.backgroundColor = 'white';
      target_1.style.backgroundImage = "url(" + imageDir + tempCell_1 + ".png')";
      if (tempCell !== tempCell_1) {
        setTimeout(function() {
          target.style.backgroundImage = 'none';
          target_1.style.backgroundImage = 'none';
          target.style.backgroundColor = '#b4ddf7';
          target_1.style.backgroundColor = '#b4ddf7';
          gamePlay = true;
        }, 1000);

      } else {
        setTimeout(function() {
          target.style.visibility = 'hidden';
          target_1.style.visibility = 'hidden';
          gamePlay = true;
        }, 1000);
        rightGuessArr.push(target.id, target_1.id);
        ++rightGuess;

      }
      clickNum = 0;
    }
  }
  if (rightGuess == numberImg - 1) {
    setTimeout(function() {
      field.style.backgroundImage = "url('image/victory.png')";
    }, 1200);
    window.clearInterval(timeSec);
  }
}

field.addEventListener('click', gameClick);
window.oncontextmenu = (e) => {
  e.preventDefault();
}

function timer() {
  const timerMins = document.getElementById('mins');
  const timerSec = document.getElementById('seconds');
  if (sec > 59) {
    ++min;
    sec = 0;
  }
  if (min < 10) {
    timerMins.innerHTML = '0' + min;
  } else if (min > 9) {
    timerMins.innerHTML = min;
  }

  if (sec < 10) {
    timerSec.innerHTML = '0' + sec;
  } else if (sec > 9 && sec < 60) {
    timerSec.innerHTML = sec;
  }
  ++sec;
}

function preview() {
  if (clickTotal == 0 && previewNum == 0) {
    for (let i = 0; i < height; ++i) {
      for (let j = 0; j < width; ++j) {
        const element = document.getElementById(String(i) + String(j));
        tempCell = gameArray[String(i)][String(j)];
        element.style.backgroundColor = 'white';
        element.style.backgroundImage = "url(" + imageDir + tempCell + ".png')";
      }
    }
    setTimeout(closePreview, 1300);
  }
  ++previewNum;
  document.getElementById('preview').style.color = '#a7aaad';
}

function closePreview() {
  for (let i = 0; i < height; ++i) {
    for (let j = 0; j < width; ++j) {
      const element = document.getElementById(String(i) + String(j));
      tempCell = gameArray[String(i)][String(j)];
      element.style.backgroundImage = 'none';
      element.style.backgroundColor = '#b4ddf7';
    }
  }
}

function imageLoad(folder) {
  const hiddenpics = document.getElementById('pics');
  for (let i = 1; i < 31; ++i) {
    const x = document.createElement('img');
    x.src = folder + i + '.png';
    hiddenpics.append(x);
   }
  if (folder === 'faces/') {
    document.getElementById('loader').className += ' hide-loader';
  }
}

$(function() {
  $('[data-toggle="tooltip"]').tooltip({
    trigger: 'hover'
  });
});
