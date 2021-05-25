let initArray = [];
let frames = [];
let length = 100;
let swapped = false;
function setup() {
  createCanvas(1000, 800);
  frameRate(1000);
  for (let i = 1; i <= length; i++) {
    initArray.push((height * i) / length);
  }
  frames.push(initArray);
  slider = createSlider(10, 1000, 100, 1);
  slider.style('width', '1000px');
  slider.input(newLength);

  buttonRand = createButton('Randomize');
  buttonRand.mousePressed(() => {
    if (frames.length == 1) {
      randomize(frames[0]);
    }
  });
  buttonBubble = createButton('Bubble Sort');
  buttonBubble.mousePressed(() => {
    if (frames.length == 1) {
      bubble(frames[0]);
    }
  });
  buttonInsertion = createButton('Insertion Sort');
  buttonInsertion.mousePressed(() => {
    if (frames.length == 1) {
      insertion(frames[0]);
    }
  });
  buttonCocktail = createButton('Cocktail Sort');
  buttonCocktail.mousePressed(() => {
    if (frames.length == 1) {
      cocktail(frames[0]);
    }
  });
}
function getRandomInt(min, max) {
  min = ceil(min);
  max = floor(max);
  return floor(random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function swap(array, a, b) {
  let tempArray = [...array];
  let temp = tempArray[a];
  tempArray[a] = tempArray[b];
  tempArray[b] = temp;
  return tempArray;
}
function newLength() {
  length = slider.value();
  initArray = [];
  frames = [];
  for (let i = 1; i <= length; i++) {
    initArray.push((height * i) / length);
  }
  frames.push(initArray);
}
function bubble(array) {
  do {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      array[i].active = true;
      array[i + 1].active = true;
      if (array[i] > array[i + 1]) {
        array = swap(array, i, i + 1);

        frames.push([...array]);

        swapped = true;
      }
      array[i].active = false;
      array[i + 1].active = false;
    }
  } while (swapped);
}
function insertion(array) {
  for (let i = 1; i < array.length; i++) {
    let current = array[i];

    let j = i - 1;

    while (j > -1 && current < array[j]) {
      array[j + 1] = array[j];
      j--;
      frames.push([...array]);
    }

    array[j + 1] = current;
    frames.push([...array]);
  }
}
function cocktail(array) {
  let swapped = true;
  let start = 0;
  let end = array.length;

  while (swapped == true) {
    swapped = false;
    for (let i = start; i < end - 1; ++i) {
      if (array[i] > array[i + 1]) {
        array = swap(array, i, i + 1);
        swapped = true;
        frames.push([...array]);
      }
    }
    if (swapped == false) break;
    swapped = false;
    end = end - 1;
    for (let i = end - 1; i >= start; i--) {
      if (array[i] > array[i + 1]) {
        array = swap(array, i, i + 1);
        swapped = true;
        frames.push([...array]);
      }
    }
    start = start + 1;
  }
}
function randomize(array) {
  for (let i = 0; i < array.length; i++) {
    rand = getRandomInt(0, array.length);
    array[i].active = true;
    array[rand].active = true;

    array = swap(array, i, rand);
    frames.push([...array]); // Deep clone
    array[i].active = false;
    array[rand].active = false;
  }
}
function drawArray(array) {
  let h = height;
  let w = width;

  barWidth = width / array.length;
  for (let i = 0; i < array.length; i++) {
    strokeWeight(0.1);
    fill('grey');
    rect(barWidth * i, height, barWidth, -array[i]);
  }
}

function draw() {
  background(220);
  drawArray(frames[0]);
  if (frames.length != 1) {
    frames.shift();
  } else {
    frames[0].map((value) => {
      value.active = false;
    });
  }
}
