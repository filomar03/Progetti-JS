let myList = [];

let listLength = 75;

let indices = {i: 0, j: 0};

let currentIndex;
let currentIndex2;
let currentIndex3;

let finished = false;

let sort = true;

function setup() {
  createCanvas(1200, 750);
  populate(myList, listLength);
  shuffle(myList, true);
  frameRate(60);
}

function draw() {
  background(0);
  drawColomnus(myList);
  if (!sort) {
    populate(myList, listLength);
    shuffle(myList, true);
    indices.i = 0;
    indices.j = 0;
    currentIndex = null;
    currentIndex2 = null;
    currentIndex3 = null;
    finished = false;
    sort = true;
  }
  if (algoIndex == 0) {
    selectionSort(myList, indices);
  } else if (algoIndex == 1) {
    bubbleSort(myList, indices);
  }
}

function populate(list, length) {
  let min = height / 10;
  let max = height / 10 * 9;
  let delta = max - min;
  for (let i = 0; i < length; i++) {
    list[i] = round(i * delta / length + min);
  }
}

function drawColomnus(list) {
  let colomnusWidth = width / list.length;
  rectMode(CORNER);
  strokeWeight(colomnusWidth / 100 * 3);
  stroke(0);
  for (let i = 0; i < list.length; i++) { 
    if (finished) {
      fill('green');
    } else if (i == currentIndex) {
      fill('red');
    } else if (i == currentIndex2) {
      fill('orange');
    } else if (i == currentIndex3) {
      fill('yellow');
    } else {
      fill(255);
    }
    rect(colomnusWidth * i, height - list[i], colomnusWidth, list[i]);
  }
}

function swap(list, i0, i1) {
  let temp = list[i0]; 
  list[i0] = list[i1]; 
  list[i1] = temp;
}

function bubbleSort(list, indicesObj) {
  if (indicesObj.i >= list.length) {
    finished = true;
  } else {
    if (indicesObj.j >= list.length - indicesObj.i - 1) {
      indicesObj.j = 0;
      indicesObj.i++;
    } else {
      currentIndex = indicesObj.j;
      currentIndex2 = indicesObj.j + 1;
      currentIndex3 = list.length - indicesObj.i;
      if (list[indicesObj.j] > list[indicesObj.j + 1]) {
        swap(list, indicesObj.j, indicesObj.j + 1);
      }
      indicesObj.j++;
    }
  }
}

let min;
let updateMin = true;

function selectionSort(list, indicesObj) {
  if (indicesObj.i >= list.length) {
    finished = true;
  } else {
    if (indicesObj.i == indicesObj.j) {
      indicesObj.j++;
    }
    if (updateMin) {
    min = indicesObj.i;
      updateMin = false;
      currentIndex2 = min;
    }
    currentIndex3 = indicesObj.i;
    if (indicesObj.j >= list.length) {
      swap(list, indicesObj.i, min);
      indicesObj.j = indicesObj.i + 1;
      indicesObj.i++;
      updateMin = true;
    } else {
      currentIndex = indicesObj.j;
      if (list[indicesObj.j] < list[min]) {
        min = indicesObj.j;
        currentIndex2 = min;
      }
      indicesObj.j++;
    }
  }
}

let btn = document.querySelector("button");
let algoIndex = 0;
let algorithms = {
  0: "Selection sorting",
  1: "Bubble sorting"
};
btn.innerHTML = algorithms[algoIndex];

function ChangeAlgorithm() {
  algoIndex++;
  if (algoIndex >= Object.keys(algorithms).length) {
    algoIndex = 0;
  }
  btn.innerHTML = algorithms[algoIndex];
  sort = false;
}