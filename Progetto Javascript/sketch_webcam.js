let shape_classfier;
let canvas;
let inputImage;
let output;

function setup() {
  canvas = createCanvas(640, 360);
  video = createCapture(VIDEO);
  video.hide();
  output = document.getElementById("output");

  output.innerHTML = 'loading model...';
  console.log('loading model...');

  let model_options = {
    inputs: [64, 64, 4],
    task: 'imageClassification'
  };
  shape_classfier = ml5.neuralNetwork(model_options);

  const modelDetails = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
  };
  shape_classfier.load(modelDetails, modelLoaded);

  background(255);
  input_image = createGraphics(64, 64);
}

function modelLoaded() {
  output.innerHTML = 'model loaded!';
  console.log('model loaded!');
  classifyImage();
}

function classifyImage() {
  input_image.copy(canvas, 0, 0, width, height, 0, 0, 64, 64);
  shape_classfier.classify({ image: input_image }, gotResults);
}

function gotResults(err, results) {
  if (err) {
    output.innerHTML = "error!";
    console.error(err);
    return;
  }

  let label = results[0].label;
  let confidence = nfc(100 * results[0].confidence, 0);

  output.innerHTML = `${label} ${confidence}%`;

  classifyImage();
}

function draw() {
  image(video, 0, 0, width, height);
}