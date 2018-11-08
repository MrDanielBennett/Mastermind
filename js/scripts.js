// Business Logic
var difficultySetting;
var mastermind = new Mastermind();
var gridSize;
var colorOptionNumber;
var seconds;


function gameTimer(time) {
  $("#timer").css("color", "#A9A9A9");
  seconds = time;
  var gametimer = setInterval(function() {
    seconds -= .01;
    $("#timer").text(seconds.toFixed(1));

    if(seconds < 60) {
      $("#timer").css("color", "red");
    }

    if(seconds <= 0 || mastermind.youWonStatus === true) {
      console.log("Your seconds reset didn't work, but this did.");
      clearInterval(gametimer);
      if (difficultySetting === "hard") {
        $("#lose-modal").show();
      }
    }
  }, 10);
}


function masterConfiguration() {
  switch (difficultySetting) {
    case "easy":
      gridSize = 11;
      colorOptionNumber = 4;
      var colorArray = ["red", "green", "blue", "yellow"];
      var masterConfigArray=[];
      var decreasingColorOptions = 4
      for (var i = 0; i < 4; i++) {
        var randomNum = Math.floor((Math.random() * decreasingColorOptions));
        masterConfigArray.push(colorArray[randomNum]);
        colorArray.splice(randomNum,1);
        decreasingColorOptions -= 1;
      }
      return (masterConfigArray);
      break;
    case "medium":
      gridSize = 11
      colorOptionNumber = 6;
      var colorArray = ["red", "green", "blue", "yellow", "purple", "orange"];
      var masterConfigArray=[];
      for (var i = 0; i < 4; i++) {
        var randomNum = Math.floor((Math.random() * 6));
        masterConfigArray.push(colorArray[randomNum]);
      }
      return (masterConfigArray);
      break;
    case "hard":
      gridSize = 7;
      colorOptionNumber = 6;
      var colorArray = ["red", "green", "blue", "yellow", "purple", "orange"];
      var masterConfigArray=[];
      for (var i = 0; i < 4; i++) {
        var randomNum = Math.floor((Math.random() * 6));
        masterConfigArray.push(colorArray[randomNum]);
      }
      return (masterConfigArray);
      break;
    default:
  }
}

// Checks user guess for exact match against master configuration. Returns number of exact matches.
function exactMatch(array1, array2, tempPlayerGuess, tempMasterConfig)  {
  var exactMatch = 0;
  for(var i = 0; i < array1.length; i++) {
    if(array1[i] === array2[i]) {
      exactMatch += 1;
      tempPlayerGuess.push("GuessMatch");
      tempMasterConfig.push("MasterMatch");
    } else {
      tempPlayerGuess.push(array1[i]);
      tempMasterConfig.push(array2[i]);
    }
  }
  mastermind.tempBlackPeg = exactMatch;
  return exactMatch;
}

// Checks user guess for color matches against master configuration. Returns number of color matches.
function colorMatch(array1, array2) {
  var colorMatch = 0;
  var tempMasterArray = array2.slice();
  array1.forEach(function(position) {
    if(tempMasterArray.indexOf(position) != -1) {
      var splicePoint = tempMasterArray.indexOf(position);
      colorMatch += 1;
      tempMasterArray.splice(splicePoint,1,'colormatch');
    }
  });
  mastermind.tempWhitePeg = colorMatch;
  return colorMatch;
}

function Mastermind() {
  this.gameDifficulty = "";
  this.playerGuess = [];
  this.tempPlayerGuess = [];
  this.tempMasterConfig = [];
  this.tempBlackPeg = 0;
  this.tempWhitePeg = 0;
  this.currentTurn = 0;
  this.youWonStatus = false;
  // this.masterConfig = masterConfiguration();
}

Mastermind.prototype.endTurn = function() {
  this.playerGuess = [];
  this.tempPlayerGuess = [];
  this.tempMasterConfig = [];
  this.tempBlackPeg = 0;
  this.tempWhitePeg = 0;
  this.currentTurn += 1;
}

Mastermind.prototype.winCheck = function(){
  if (this.tempBlackPeg === 4){
    $("#win-modal").show();
    mastermind.youWonStatus = true;
  } else {
    if (difficultySetting === "hard") {
      if (this.currentTurn === 7) {
        $("#lose-modal").show();
        mastermind.youWonStatus = true;
      }
    } else if (this.currentTurn === 11){
      $("#lose-modal").show();
    }
  }
}

Mastermind.prototype.pegResult = function(){
  exactMatch(this.playerGuess, this.masterConfig, this.tempPlayerGuess, this.tempMasterConfig);
  colorMatch(this.tempPlayerGuess, this.tempMasterConfig);
}


// User Interface Logic
$(document).ready(function(){

  function buildTheBoard() {
    var tempHTML = ""
    for(var i= gridSize; i >= 0; i--) {
      tempHTML += "<div class='row'><div class='col-md-1'><div class='rowNumber'>" + (i+1) + "</div></div><div id='" + i + "-0'class='emptyCircle'></div><div id='" + i + "-1'class='emptyCircle'></div><div id='" + i + "-2'class='emptyCircle'></div><div id='" + i + "-3'class='emptyCircle'></div><div id='pegResult' class='row'><div class='col-md-1'><div id='peg" + i + "-0'class='pegCircle'></div><div id='peg" + i + "-1'class='pegCircle'></div></div><div class='col-md-1'><div id='peg" + i + "-2' class='pegCircle'></div><div id='peg" + i + "-3' class='pegCircle'></div></div></div></div>"
    }
    return(tempHTML);
  }

  function buildTheColorButtons() {
    var tempHTML = "";
    var colorArray = ["red", "green", "blue", "yellow", "purple", "orange"];
    for(var i = 0; i < colorOptionNumber; i++) {
      tempHTML += "<button type='button' class='colors' id='" + colorArray[i] + "' value='" + colorArray[i] + "'></button>"
    }
    return("<form id='buttons'>" + tempHTML + "</form>");
  }


  function resetGame() {
    for ( var i= 0; i < 12; i++){
      for( var z=0; z < 4; z++) {
        $("#" + i + "-" + z).css("background-color", 'grey');
        $("#peg" + i + "-" + z).removeClass("whitePeg blackPeg");
      }
    }
    mastermind.youWonStatus = false;
    mastermind.playerGuess = [];
    mastermind.masterConfig = masterConfiguration();
    $("button.colors").prop("disabled",false);
    for (let i =0; i < 4; i ++){
      $("#stagingBoard-" + i).css("background-color", "gray");
    }
    mastermind.currentTurn = 0;
    $("#cheatButton").css("color", "white");
    gameTimer(120);
    $("#timer").show();
  }

// Listens to game difficutly buttons on landing screen. Passes value of difficulty button to variable and intializes new game based on passed parameters.
  $(".difficultyButtons").on("click", "button", function(){
    $(".difficultyButtons").hide();
    $("h1").removeClass("marginTop");
    difficultySetting = this.id;
    mastermind.masterConfig = masterConfiguration();
    $("#colorButtonChoiceBuilder").html(buildTheColorButtons());
    $("#buildTheBoard").html(buildTheBoard());
    $("#game").slideDown(1500);
    gameTimer(120);
    if (difficultySetting === "easy" || difficultySetting === "medium"){
      $("#timer").hide();
    }
  });


// Listens to player color buttons. When clicked, passes color value to lower guess builder row
  $("#colorButtonChoiceBuilder").on("click", "button", function(){
    console.log("COLOR BUTTON CLICK");
    $("#stagingBoard-" + mastermind.playerGuess.length).css("background-color", this.value);
    if (mastermind.playerGuess.length >= 3) {
      $("button.colors").prop("disabled",true);
    }
    mastermind.playerGuess.push(this.value);
  });

  // Listens to player clear button. When clicked, clears temporary player guess array and sets color guess row to gray values
  $("#clear").click(function(){
    mastermind.playerGuess = [];
    $("button.colors").prop("disabled",false);
    for (let i =0; i < 4; i ++){
      $("#stagingBoard-" + i).css("background-color", "gray");
    }
    $("#cheatButton").css("color", "white");
  });

  // Listens to SECRET player cheat button hidden in the "E" of game title. When clicked, passes the correct color value for the player guess color row position into their guess builder.
  $("#cheatButton").click(function(event){
    event.preventDefault();
    $("#stagingBoard-" + mastermind.playerGuess.length).css("background-color", mastermind.masterConfig[(mastermind.playerGuess.length)]);
    if (mastermind.playerGuess.length >= 4) {
      $("button.colors").prop("disabled",true);
    }
    mastermind.playerGuess.push(mastermind.masterConfig[(mastermind.playerGuess.length)]);
    $("#cheatButton").css("color", "#CBA72D");
  });

// Listens to player submit button. When clicked, checks for complete guess length (4). If ok, peforms comparison checks against master config, then clears guess builder row to gray values.
  $("#submit").click(function(){
    if (mastermind.playerGuess.length < 4){
    $("#alert-modal").show();
    } else {
    mastermind.pegResult();
    $("button.colors").prop("disabled",false);
    for ( var i= 0; i <mastermind.playerGuess.length; i++){
        $("#" + mastermind.currentTurn + "-" + i).css("background-color", mastermind.playerGuess[i]);
    }
    for (let i =0; i < 4; i ++){
      $("#stagingBoard-" + i).css("background-color", "gray");
    }
    mastermind.winCheck();
    for (var i = 0; i < mastermind.tempBlackPeg; i++){
      $("#peg" + mastermind.currentTurn + "-" + i).addClass("blackPeg");
    }
    for (var i = mastermind.tempBlackPeg; i < mastermind.tempWhitePeg + mastermind.tempBlackPeg; i ++) {
      $("#peg" + mastermind.currentTurn + "-" + i).addClass("whitePeg");
    }
    mastermind.endTurn();
   }
 });


 // $("#difficultyModal").on("click", "button", function(){
 //   resetGame();
 //   difficultySetting = this.value;
 //   mastermind.masterConfig = masterConfiguration();
 //   console.log("CLICKCLICKCLICK");
 //   console.log("here's the id of the thing you clicked on: " + this.value);
 //   console.log("your value of this button is " + difficultySetting);
 //   $("#colorButtonChoiceBuilder").html(buildTheColorButtons());
 //   $("#buildTheBoard").html(buildTheBoard());
 //   $("#settings-modal").hide();
 // });


// Listens to modal after end game scenario.

  $(".refresh-btn").click(function(){
    resetGame();
    $("#win-modal").hide();
    $("#lose-modal").hide();

    if (difficultySetting !== "hard"){
      $("#timer").hide();
    }
  });

  $(".close-modal").click(function(){
    $("#alert-modal").hide();
    $("#settings-modal").hide();
  });

  $("#info-icon").hover(function(){
    $("#info-modal").toggle();
  });

  $("#settings-icon").click(function(){
    $("#settings-modal").show();
  });


  $("#clear").click(function(){
    mastermind.playerGuess = [];
    $("button.colors").prop("disabled",false);
    for (let i =0; i < 4; i ++){
      $("#stagingBoard-" + i).css("background-color", "gray");
    }
    $("#cheatButton").css("color", "white");
  });


});
