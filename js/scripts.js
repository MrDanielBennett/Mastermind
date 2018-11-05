// Business Logic
var mastermind = new Mastermind();

function Mastermind() {
  // turnCount = 0;
  // This is going to count the number of turns a player makes.
  this.playerGuess = ['red', 'blue', 'green', 'yellow'];
  this.tempPlayerGuess = [];
  this.masterConfig = ['red', 'yellow', 'green', 'blue'];
  // This will store the player's guess that's input in the UI.
  // call master configuration.
}

// Mastermind.prototype.checkForWin() = function(){
//   // Evaluate the player guess against the master config.
// }

Mastermind.prototype.pegResult = function(){
  console.log(exactMatch(this.playerGuess, this.masterConfig, this.tempPlayerGuess));
  console.log(colorMatch(this.tempPlayerGuess, this.masterConfig));
}

// Mastermind.prototype.currentTurn = function(){
//   // Read current Mastermind turn count and add 1.
// }
//
// function MasterConfiguration() {
//   // masterConfig = the method to generate the random config.
// }
//
// MasterConfiguration.prototype.generateMaster = function(){
//   // This will generate and return a random set of 4 colors (from a selection of 6 colors).
// }

function exactMatch(array1, array2, tempPlayerGuess)  {

  var exactMatch = 0;

  if(array1.length != array2.length) {
    console.log("Those arrays are different lengths");
  } else {
    for(var i = 0; i < array1.length; i++) {
      if(array1[i] === array2[i]) {
        exactMatch += 1;
        tempPlayerGuess.push("match");
      } else {
        tempPlayerGuess.push(array1[i]);
      }
    }
  }
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
   return colorMatch;
}

// User Interface Logic
$(document).ready(function(){

});
