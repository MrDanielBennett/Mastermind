// Business Logic

function Mastermind() {
  // turnCount = 0;
  // This is going to count the number of turns a player makes.
  // playerGuess
  // This will store the player's guess that's input in the UI.
  // call master configuration.
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
  var color = ["red", "green", "blue", "yellow", "purple", "orange"];
  var array=[];
  var c;
  for (c=0; c<=4; ++c)
  {
    var i = Math.floor((Math.random() * (6-c)) + 1);
    array.push(color[i]);
    color[i] = color[6-c];
  }



 // this.masterConfig = [Math.floor((Math.random(4) * 5))];
  // masterConfig = the method to generate the random config.
}
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
