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
    return "win";
  } else if (this.currentTurn === 11) {
    return "lose"
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

function exactMatch(array1, array2, tempPlayerGuess, tempMasterConfig)  {
  var exactMatch = 0;

  if(array1.length != array2.length) {
    console.log("Those arrays are different lengths");
  } else {
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
  }
  mastermind.tempBlackPeg = exactMatch;
  return exactMatch;
}

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

  $("#start-button").click(function(event){
    event.preventDefault();
    $("#start-screen").hide();
    $("#game").fadeIn();

  });

  $("form#buttons").on("click", "button", function(){
    console.log(this.value);
    $("#stagingBoard-" + mastermind.playerGuess.length).css("background-color", this.value);
    if (mastermind.playerGuess.length >= 4) {
      $("button.colors").prop("disabled",true);
    }
    mastermind.playerGuess.push(this.value);
});

  $("#submit").click(function(){
    if (mastermind.playerGuess.length < 4){
    return alert("please Choose all four colors");
    }else {
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
  })


  $("#clear").click(function(){
    mastermind.playerGuess = [];
    $("button.colors").prop("disabled",false);
    for (let i =0; i < 4; i ++){
      $("#stagingBoard-" + i).css("background-color", "gray");
    }
  });
});
