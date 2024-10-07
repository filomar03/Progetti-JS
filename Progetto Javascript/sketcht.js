let board = [
  ["", "", ""], 
  ["", "", ""], 
  ["", "", ""]
];

let players = ["X", "O"];

let col;
let row;

let col_center;
let row_center;

let col_offset;
let row_offset;

let player_turn = true;

let winner = null;

let winner_score = {
  X: -1,
  O: 1,
  none: 0
};

let win_path = {
  x1: 0,
  x2: 0, 
  y1: 0,
  y2: 0
};

let output_label = document.querySelector("h1");

let first_player = "player";

let buttons = document.querySelectorAll("input[type=button]");
let change_player_button = buttons[0];
let restart_button = buttons[1];

let restart_callback = function () {
  output_label.innerHTML = "";
  board = [
    ["", "", ""], 
    ["", "", ""], 
    ["", "", ""]
  ];
  winner = null;
  first_player = change_player_button.value;
  if (first_player == "player") {
    player_turn = true;
  } else {
    player_turn = false;
    cpuMove();
  }
}

let change_player_callback = function () {
  if (change_player_button.value == "player") {
    change_player_button.value = "cpu";
  } else {
    change_player_button.value = "player";
  }
  restart_callback();
}

change_player_button.removeEventListener("click", change_player_callback);
change_player_button.addEventListener("click", change_player_callback);

restart_button.removeEventListener("click", restart_callback);
restart_button.addEventListener("click", restart_callback);

function setup() {
  createCanvas(400, 400);
  frameRate(30);
  
  col = width / 3;
  row = height / 3;
  
  col_center = col / 2;
  row_center = row / 2;
  
  col_offset = col / 5;
  row_offset = row / 5;

  strokeWeight(3);
  noFill();
}

function draw() {
  background(255);
  stroke(0);
  drawGrid();
  drawBoardValues();
  drawVictoryPath(winner);
}

function minimax(is_cpu) {
  if (isGameOver()) {
    return winner_score[winner];
  }

  if (is_cpu) {
    let best_score = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = players[1];
          let score = minimax(false);
          board[i][j] = "";
          if (score > best_score) {
            best_score = score;
          }
        }
      }
    }
    return best_score;
  } else {
    let best_score = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = players[0];
          let score = minimax(true);
          board[i][j] = "";
          if (score < best_score) {
            best_score = score;
          }
        }
      }
    }
    return best_score;
  }
}

function bestMove() {
  let best_score = -Infinity;
  let move = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        board[i][j] = players[1];
        let score = minimax(false);
        board[i][j] = "";
        if (score > best_score) {
          best_score = score;
          move = [i, j];
        }
      }
    }
  }
  board[move[0]][move[1]] = players[1];
}

function cpuMove() { 
  if (player_turn) { return; }

  bestMove(); //provare a unire bestmove e minimax

  if (isGameOver()) {
    output_label.innerHTML = "winner: " + winner;
    return;
  }
  
  player_turn = true;
  return;
}
  
function drawVictoryPath() {
  if (winner === players[0] || winner === players[1]) {
    stroke(255, 0, 0);
    line(win_path.x1, win_path.y1, win_path.x2, win_path.y2);
  }
}
  
function isGameOver() {
  //horizontal check
  for (let i = 0; i < 3; i ++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
      win_path.x1 = col_offset;
      win_path.y1 = row * i + row_center;
      win_path.x2 = width - col_offset
      win_path.y2 = row * i + row_center
      winner = board[i][0];
      return true;
    }
  }
  
  //vertical check
  for (let j = 0; j < 3; j ++) {
    if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== "") {
      win_path.x1 = col * j + col_center;
      win_path.y1 = row_offset;
      win_path.x2 = col * j + col_center;
      win_path.y2 = height - row_offset;
      winner = board[0][j];
      return true;
    }
  }
  
  //diagonal
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1] !== "") {
    win_path.x1 = col_offset;
    win_path.y1 = row_offset;
    win_path.x2 = width - col_offset;
    win_path.y2 = height - row_offset;
    line(col_offset, row_offset, width - col_offset, height - row_offset);
    winner = board[1][1];
    return true;
  }
  
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[1][1] !== "") {
    win_path.x1 = width - col_offset;
    win_path.y1 = row_offset;
    win_path.x2 = col_offset;
    win_path.y2 = height - row_offset;
    winner = board[1][1];
    return true;
  }
  
  let free_tiles = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        free_tiles++;
      }
    }
  }
  if (free_tiles == 0) { 
    winner = "none"; 
    return true;
  }
  
  winner = null;
  return false;
}

function mouseClicked() {
  if (mouseButton !== LEFT || !player_turn || winner !== null) { return; }
  
  let mouse_x = mouseX;
  let mouse_y = mouseY;
  let i = floor(mouse_y / row);
  let j = floor(mouse_x / col);
  
  if (mouse_x <= width && mouse_y <= height) {
    if (board[i][j] === "") {
      board[i][j] = players[0];

      if (isGameOver()) {
        output_label.innerHTML = "winner: " + winner;
        return 
      }

      player_turn = false;
      cpuMove();
    }
  }
}
  
function drawCircle(row_iter, col_iter) {
  circle(col * col_iter + col_center, row * row_iter + row_center, col / 3 * 2);
}
  
function drawCross(row_iter, col_iter) {
  line(col * col_iter + col_offset, row * row_iter + row_offset, col * (col_iter + 1) - col_offset, row * (row_iter + 1) - row_offset);
  line(col * (col_iter + 1) - col_offset, row * row_iter + row_offset, col * col_iter + col_offset, row * (row_iter + 1) - row_offset);
}
  
function drawBoardValues() {
  for (let i = 0; i < 3; i ++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == players[0]) {
        drawCross(i, j);
      } else if(board[i][j] == players[1]) {
        drawCircle(i, j);
      }
    }
  }
}
  
function drawGrid() {
  for (let i = 1; i < 3; i++) {
    line(col * i, 0, col * i, height);
    line(0, row * i, width, row * i);
  }
}