setupGameKeys();

function setupDimensionsButtons() {
  $("#dimensions").html(dimensions);

  $("#dimensions-up").on("click", function() {
    dimensions += 1;
    $("#dimensions").html(dimensions);
    $(".maze-container").html(getMazeHTML());
    sizeSquares();
    generateDefaultMaze();
  });

  $("#dimensions-down").on("click", function() {
    dimensions -= 1;
    $("#dimensions").html(dimensions);
    $(".maze-container").html(getMazeHTML());
    sizeSquares();
    generateDefaultMaze();
  });
}

function setupGameKeys() {
  $(document).on("keydown", function(e) {
    if(e.key === "ArrowUp") {
      if(checkAdjacentBlock("up")) {
        curPlayerPos[0] -= 1;
        movePlayerTo(curPlayerPos[0], curPlayerPos[1]);
      }
      e.preventDefault()
    } else if(e.key === "ArrowDown") {
      if(checkAdjacentBlock("down")) {
        curPlayerPos[0] += 1;
        movePlayerTo(curPlayerPos[0], curPlayerPos[1]);
      }
      e.preventDefault()
    } else if(e.key === "ArrowLeft") {
      if(checkAdjacentBlock("left")) {
        curPlayerPos[1] -= 1;
        movePlayerTo(curPlayerPos[0], curPlayerPos[1]);
      }
      e.preventDefault()
    } else if(e.key === "ArrowRight") {
      if(checkAdjacentBlock("right")) {
        curPlayerPos[1] += 1;
        movePlayerTo(curPlayerPos[0], curPlayerPos[1]);
      }
      e.preventDefault()
    } else if(e.key == "c") {
      console.log("---");
      console.log("right " + checkAdjacentBlock("right"));
      console.log("up " + checkAdjacentBlock("up"));
      console.log("down " + checkAdjacentBlock("down"));
      console.log("left " + checkAdjacentBlock("left"));
    }
  });
}


//returns true if the block checked is clear (able to be moved on by the player)
function checkAdjacentBlock(dir) {
  if(dir === "up") {
    var rowToCheck = curPlayerPos[0] - 1;

    if(curPlayerPos[0] === 1) {
      return false;
    }

    if($(".row" + rowToCheck + " .maze-square").eq(curPlayerPos[1] - 1).hasClass("maze-wall")) {
      return false;
    }
  } else if(dir === "down") {
    var rowToCheck = curPlayerPos[0] + 1;

    if(curPlayerPos[0] === dimensions) {
      return false;
    }

    if($(".row" + rowToCheck + " .maze-square").eq(curPlayerPos[1] - 1).hasClass("maze-wall")) {
      return false;
    }
  } else if(dir === "left") {
    var colToCheck = curPlayerPos[1] - 1;

    if(curPlayerPos[1] === 1) {
      return false;
    }

    if($(".row" + curPlayerPos[0] + " .maze-square").eq(colToCheck - 1).hasClass("maze-wall")) {
      return false;
    }
  } else if(dir === "right") {
    var colToCheck = curPlayerPos[1] + 1;

    if(curPlayerPos[1] === dimensions) {
      return false;
    }

    if($(".row" + curPlayerPos[0] + " .maze-square").eq(colToCheck - 1).hasClass("maze-wall")) {
      return false;
    }
  }

  return true;
}
