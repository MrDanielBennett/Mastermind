// Business Logic




var mastermind = new Mastermind();

function Mastermind() {
  this.currentTurn = 0;
  this.playerGuess = [];
  this.tempPlayerGuess = [];
  this.tempBlackPeg = 0;
  this.tempWhitePeg = 0;
  this.masterConfig = masterConfiguration();
  this.tempMasterConfig = []
}

Mastermind.prototype.winCheck = function(){

    if (this.tempBlackPeg === 4){
      $("#win-modal").show();
    }else if (this.currentTurn === 11) {
      $("#lose-modal").show();
      $("#game").hide();
    }
}

Mastermind.prototype.endTurn = function() {
  this.playerGuess = [];
  this.tempPlayerGuess = [];
  this.tempMasterConfig = [];
  this.tempBlackPeg = 0;
  this.tempWhitePeg = 0;
  this.currentTurn += 1
}

function masterConfiguration() {
  var color = ["red", "green", "blue", "yellow", "purple", "orange"];
  var c;
  var masterConfig=[];
  for (c=1; c<=4; ++c)
  {
    var i = Math.floor((Math.random() * 6));
    masterConfig.push(color[i]);
    color[i] = color[4-c];
  }
  return (masterConfig);
}

Mastermind.prototype.pegResult = function(){
  console.log(exactMatch(this.playerGuess, this.masterConfig, this.tempPlayerGuess, this.tempMasterConfig));
  console.log(colorMatch(this.tempPlayerGuess, this.tempMasterConfig));
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

// User Interface Logic
var gameArray = []

$(document).ready(function(){


  var seconds = 1;


  var gameTimer = setInterval(function() {
    seconds += .01;
    $("#playTimer").text(seconds.toFixed(2));

    if(seconds > 10) {
    $("#playTimer").css("color", "red");
    }

    if(seconds > 100) {
      clearInterval(gameTimer);
    }
  }, 10);

  function resetGame() {
    for ( var i= 0; i < 12; i++){
      for( var z=0; z < 4; z++) {
        $("#" + i + "-" + z).css("background-color", 'grey');
        $("#peg" + i + "-" + z).css("background-color", '#484848');
        $("#peg" + i + "-" + z).removeClass("whitePeg");
      }
    }
    mastermind.playerGuess = [];
    $("button.colors").prop("disabled",false);
    for (let i =0; i < 4; i ++){
      $("#stagingBoard-" + i).css("background-color", "gray");
    }
  }

  $("#resetGame").click(function(event){
    event.preventDefault();
    resetGame();
  });

  $("#cheatButton").click(function(event){
    event.preventDefault();
    $("#stagingBoard-" + mastermind.playerGuess.length).css("background-color", mastermind.masterConfig[(mastermind.playerGuess.length)]);
    if (mastermind.playerGuess.length >= 4) {
      $("button.colors").prop("disabled",true);
    }
    mastermind.playerGuess.push(mastermind.masterConfig[(mastermind.playerGuess.length)]);

  });

  $("#start-button").click(function(event){
    event.preventDefault();
    $("#start-screen").hide();
    $("#game").fadeIn();

  });


  $("form#buttons").on("click", "button", function(){
    console.log(this.value);
    $("#stagingBoard-" + mastermind.playerGuess.length).css("background-color", this.value);
    if (mastermind.playerGuess.length >= 3) {
      $("button.colors").prop("disabled",true);
    }
    mastermind.playerGuess.push(this.value);
  });

  $("#submit").click(function(){
    if (mastermind.playerGuess.length < 4){
    return alert("please Choose all four colors");
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
    console.log(mastermind.winCheck());
    for (var i = 0; i < mastermind.tempBlackPeg; i++){
      $("#peg" + mastermind.currentTurn + "-" + i).css("background-color", "#FFD700");
    }
    for (var i = mastermind.tempBlackPeg; i < mastermind.tempWhitePeg + mastermind.tempBlackPeg; i ++) {
      $("#peg" + mastermind.currentTurn + "-" + i).addClass("whitePeg");
    }
    mastermind.endTurn();
   }
 });



  $("#clear").click(function(){
    mastermind.playerGuess = [];
    $("button.colors").prop("disabled",false);
    for (let i =0; i < 4; i ++){
      $("#stagingBoard-" + i).css("background-color", "gray");
    }
  });
});
