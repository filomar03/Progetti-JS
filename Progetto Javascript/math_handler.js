var button, canvas, ctx, sides, length, perimeter, area, angle;

var sides_allowed_charset = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var length_allowed_charset = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

var btn_callback = function (e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sides = parseInt(document.getElementById("sides").value);
    length = parseFloat(document.getElementById("length").value);
    if (isNaN(sides) || sides == "" || sides < 3 || isNaN(length) || length == "" || length <= 0) {
        alert("Parameters hasn't been inserted correctly");
        return;
    }

    draw();
    calculatePerimeter();
    calculateArea();
};

function init() {
    canvas = document.querySelector("canvas");
    button = document.querySelector("button");
    perimeter = document.getElementById("perimeter");
    area = document.getElementById("area");

    canvas.width = window.innerWidth / 100 * 45;
    canvas.height = canvas.width;
    ctx = canvas.getContext("2d");
    
    button.addEventListener("click", btn_callback);
}

function draw() {
    ctx.strokeStyle = "black";
    ctx.lineCap = "round"
    ctx.lineWidth = 3;

    var center = {x: canvas.width /  2, y: canvas.height / 2};
    var radius = canvas.height / 2 * 4 / 5;
    angle = 2 * Math.PI / sides;
    var next_point = {x: 0, y: 0};
    var previous_point = {x: center.x, y: center.y - radius};

    for (let i = 0; i < sides; i++) {
        previous_point.x = center.x - (radius * Math.cos(angle * (i) + Math.PI / 2));
        previous_point.y = center.y - (radius * Math.sin(angle * (i) + Math.PI / 2));
        next_point.x = center.x - (radius * Math.cos(angle * (i + 1) + Math.PI / 2));
        next_point.y = center.y - (radius * Math.sin(angle * (i + 1) + Math.PI / 2));
        ctx.beginPath();
        ctx.moveTo(previous_point.x, previous_point.y);
        ctx.lineTo(next_point.x, next_point.y);
        ctx.stroke();
    }
}

function calculatePerimeter() {
    let p = length * sides;
    perimeter.innerHTML = "Perimeter = " + p.toFixed(2) + " m";
}

function calculateArea() {
    let half_length = length / 2;
    let half_angle = angle / 2;
    let hypotenuse = half_length / Math.sin(half_angle);
    let height = hypotenuse * Math.cos(half_angle);
    let a = length * height / 2 * sides;
    area.innerHTML = "Area = " + a.toFixed(2) + " m²";
}