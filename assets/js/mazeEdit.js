var currentBlock = "maze-wall";
//Set up buttons
$("#mode-button").on("click", function() {
  if($(this).text() === "Edit Maze") {
    enterEditMode();
    $(this).text("Save Changes");
  } else if($(this).text() === "Save Changes") {
    exitEditMode();
    $(this).text("Edit Maze");
  }
});

$("#place-begin").on("click", function() {
  $(".maze-begin").removeClass("maze-begin");
  currentBlock = "maze-begin";
});

$("#place-end").on("click", function() {
  $(".maze-end").removeClass("maze-end");
  currentBlock = "maze-end";
});

$("#get-maze-code").on("click", function() {
  $("#maze-code-div textarea").text(getMazeCode());
});

$("#set-maze-code").on("click", function() {
  setMazeCode();
});

function enterEditMode() {
  removeGameKeys();
  removePlayer();

  $("#place-begin").removeClass("hidden");
  $("#place-end").removeClass("hidden");
  $("#maze-code-div").removeClass("hidden");
  $("#maze-code-div textarea").text("");
  $("#maze-code-div textarea").attr("rows", (dimensions + 1) + "");
  $("#maze-code-div textarea").attr("cols", (dimensions + 1) + "");

  $(".maze-square").on("click", function() {
    if(currentBlock === "maze-wall") {
      if(!$(this).hasClass("maze-begin") && !$(this).hasClass("maze-end")) {
        if($(this).hasClass("maze-wall")) {
          $(this).removeClass("maze-wall");
        } else {
          $(this).addClass("maze-wall");
        }
      }
    } else if(currentBlock === "maze-begin") {
      $(this).removeClass("maze-wall");
      $(this).addClass("maze-begin");
      currentBlock = "maze-wall";
    } else if(currentBlock === "maze-end") {
      $(this).removeClass("maze-wall");
      $(this).addClass("maze-end");
      currentBlock = "maze-wall";
    }
  });
}

function exitEditMode() {
  setupGameKeys();
  $(".maze-square").off();
  setPlayerStartingLocation();

  $("#place-begin").addClass("hidden");
  $("#place-end").addClass("hidden");
  $("#maze-code-div").addClass("hidden");
}

function removeGameKeys() {
  $(document).off();
}

function getMazeCode() {
  var mazeStr = ""

  for(var row = 1; row <= dimensions; row++) {
    for(var col = 1; col <= dimensions; col++) {
      if($(".row" + row + " .maze-square").eq(col - 1).hasClass("maze-wall")) {
        mazeStr += "x";
      } else if($(".row" + row + " .maze-square").eq(col - 1).hasClass("maze-begin")) {
        mazeStr += "b";
      } else if($(".row" + row + " .maze-square").eq(col - 1).hasClass("maze-end")) {
        mazeStr += "e";
      } else {
        mazeStr += " ";
      }
    }

    mazeStr += "\n";
  }

  return mazeStr;
}

function setMazeCode() {
  var mazeStr = $("#maze-code-div textarea").val();
  var mazeArr = [];
  var i = 0;

  for(var row = 0; row < dimensions; row++) {
    var curStr = "";

    while(mazeStr[i] !== "\n") {
      curStr += mazeStr[i];
      i++;
    }

    mazeArr[row] = curStr;
    i++;
  }

  setMazeByText(mazeArr);
}
