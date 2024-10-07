let shape_classfier;
let canvas;
let input_image;
let output;


function setup() {
  canvas = createCanvas(512, 512);
  output = document.getElementById("output");

  clearButton = createButton('clear');
  clearButton.mousePressed(function() {
    background(255);
  });

  let model_options = {
    inputs: [64, 64, 4],
    task: 'imageClassification'
  };
  shape_classfier = ml5.neuralNetwork(model_options);

  input_image = createGraphics(64, 64);
  console.log('loading model...');
  output.innerHTML = 'loading model...';

  const model_details = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
  };
  shape_classfier.load(model_details, modelLoaded);
}

function modelLoaded() {
  console.log('model loaded!');
  output.innerHTML = 'model loaded!';
  classifyImage();
}

function classifyImage() {
  input_image.copy(canvas, 0, 0, width, height, 0, 0, 64, 64);
  shape_classfier.classify({ image: input_image }, gotResults);
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
    output.innerHTML = "error!";
    return;
  }

  let label = results[0].label;
  let confidence = nfc(100 * results[0].confidence, 0);

  output.innerHTML = label + ' ' + confidence + '%';

  classifyImage();
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(5);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}