var dimensions = 20;
var playerHTML = "<img class=\"player-tile\" src=\"assets/img/player.png\">";
var curPlayerPos = [18, 1];


initMaze();
generateDefaultMaze();

function initMaze() {
  makeMazeBox();

  $(window).resize(function() {
    makeMazeBox();
  });

  $(".maze-container").html(getMazeHTML());
  sizeSquares();
}

function makeMazeBox() {
  var w = $(".maze-container").width();
  w = w + "px";
  $(".maze-container").css("height", w);
}

function sizeSquares() {
  var percent = 100 / dimensions;

  percent = percent + "%";

  $(".maze-row").css("height", percent);
  $(".maze-square").css("width", percent);
}

function getMazeHTML() {
  var maze = "";

  for(var i = 1; i <= dimensions; i++) {
    maze += getMazeRowHTML(i);
  }

  return maze;
}

function getMazeRowHTML(row) {
  var row = "<div class=\"maze-row row" + row + "\">";

  for(var i = 0; i < dimensions; i++) {
    row  = row + "<div class=\"maze-square\"></div>";
  }

  row += "</div>";

  return row;
}

//Sets tile based on x and y coordinate, first square is (1, 1)
function setTileByClass(row, col, tile) {
  var rowStr = ".row" + row;
  $(rowStr + " .maze-square").eq(col - 1).addClass(tile);
}

//x represents a wall, b represents the beginning tile, e represents the finishing tile, space represents empty tile
function setTileByText(row, col, tile) {
  var rowStr = ".row" + row;
  var newTile;

  $(rowStr + " .maze-square").eq(col - 1).removeClass("maze-wall");
  $(rowStr + " .maze-square").eq(col - 1).removeClass("maze-begin");
  $(rowStr + " .maze-square").eq(col - 1).removeClass("maze-end");

  if(tile === "x") {
    newTile = "maze-wall";
  } else if(tile === "b") {
    newTile = "maze-begin";
  } else if(tile === "e") {
    newTile = "maze-end";
  }

  if(tile === "p") {
    $(rowStr + " .maze-square").eq(col - 1).html(playerHTML);
  } else if(tile !== " ") {
    $(rowStr + " .maze-square").eq(col - 1).addClass(newTile);
  }
}

//rowStr is a string of 10 characters that represents a row of the maze
function setRowByText(row, rowStr) {
  for(var i = 1; i <= rowStr.length; i++) {
    setTileByText(row, i, rowStr[i - 1]);
  }
}

//mazeStr is an array of 10 rowStr
function setMazeByText(mazeStr) {
    for(var i = 1; i <= mazeStr.length; i++) {
      setRowByText(i, mazeStr[i - 1]);
    }
}

function generateDefaultMaze() {
  var maze = [
    "x          xxx    xx",
    "x xxxxxxxxxx   xx  e",
    "  xx xxxx    xxx xxx",
    " xxx      xxxxxx xx ",
    "     x xxxx         ",
    " xxxxx x xx xxxxxxxx",
    "  xx x x xx xx     x",
    "x xx xxx  x    xxx x",
    "x      xx xx xxxxxxx",
    "xxxxxx             x",
    "   x   xxxxxxxxx x x",
    " xxxxxxxxxxxxx x x x",
    " x             x x x",
    " x xxxx xxxxxxxx x x",
    " x x  x xxxx     x x",
    "     xx   xxxxxxxx x",
    "xxxxxxxxx x        x",
    "b       x xxxx xxx x",
    "xxx xxxxx      x   x",
    "xxx       xxxxxxxxxx"
  ];

  setMazeByText(maze);
  setPlayerStartingLocation();
}

function removePlayer() {
  $(".row1 .maze-square").eq(0).html("");
}

function movePlayerTo(row, col) {
  var rowPercent = (row - 1)  * 100;
  var colPercent = (col - 1) * 100;

  $(".player-tile").css("top", rowPercent + "%");
  $(".player-tile").css("left", colPercent + "%");
}

function setPlayerStartingLocation() {
  setTileByText(1, 1, "p");

  for(var row = 1; row <= dimensions; row++) {
    for(var col = 1; col <= dimensions; col++) {
      if($(".row" + row + " .maze-square").eq(col - 1).hasClass("maze-begin")) {
        curPlayerPos[0] = row;
        curPlayerPos[1] = col;
      }
    }
  }

  movePlayerTo(curPlayerPos[0], curPlayerPos[1]);
}
