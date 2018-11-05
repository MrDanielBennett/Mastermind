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
  for (c=1; c<=5; ++c)
  {
    var i = Math.floor((Math.random() * (5-c)) + 1);
    masterConfig.push(color[i]);
    color[i] = color[5-c];

  }
      return (masterConfig);
}




  // masterConfig = the method to generate the random config.

//
// MasterConfiguration.prototype.generateMaster = function(){
//   // var masterConfig = []
//
//
//   console.log(masterConfig);
// }

// User Interface Logic
$(document).ready(function(){

});
