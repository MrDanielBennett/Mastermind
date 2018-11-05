// Business Logic

function Mastermind() {
  // turnCount = 0;
  // This is going to count the number of turns a player makes.
  // playerGuess
  // This will store the player's guess that's input in the UI.
  this.masterConfig = masterConfig
}

Mastermind.prototype.checkForWin = function(){
  // Evaluate the player guess against the master config.
}

Mastermind.prototype.pegResult = function(){
  // Evaluate the player guess against master config and return # of matching colors and return # of matching color + position.
}

Mastermind.prototype.currentTurn = function(){
  // Read current Mastermind turn count and add 1.
}

function MasterConfiguration() {
  debugger
  var color = ["red", "green", "blue", "yellow", "purple", "orange"];
  var c;
  var masterConfig=[];
  for (c=1; c<=4; ++c)
  {
    var i = Math.floor((Math.random() * (4-c)));
    masterConfig.push(color[i]);
    color[i] = color[4-c];

  }
      return (masterConfig);
}


// User Interface Logic

$(document).ready(function(){
  $("#start-button").click(function(event){
    $("#start-screen").hide();
    $("#game-board").fadeIn();
  });

  $("#buttons").click(function(event){
    var input = [$("#buttons").val()];

    console.log (input)
  })









});
