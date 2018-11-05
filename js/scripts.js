// // Business Logic
//
// function Mastermind() {
//   // turnCount = 0;
//   // This is going to count the number of turns a player makes.
//   // playerGuess
//   // This will store the player's guess that's input in the UI.
//   // call master configuration.
// }
//
// Mastermind.prototype.checkForWin() = function(){
//   // Evaluate the player guess against the master config.
// }
//
// Mastermind.prototype.pegResult() = function(){
//   // Evaluate the player guess against master config and return # of matching colors and return # of matching color + position.
// }
//
// Mastermind.prototype.currentTurn() = function(){
//   // Read current Mastermind turn count and add 1.
// }
//
// function MasterConfiguration() {
//   // masterConfig = the method to generate the random config.
// }
//
// MasterConfiguration.prototype.generateMaster() = function(){
//   // This will generate and return a random set of 4 colors (from a selection of 6 colors).
// }
//
// // User Interface Logic
// $(document).ready(function(){
//
// });

var guess = ['yellow', 'blue', 'green', 'purple'];
var masterConfig = ['yellow', 'blue', 'green', 'purple'];


var correctColors = 0;

var testArray = [];

function exactMatch(array1, array2)  {
  testArray = [];
  var exactMatch = 0;
  if(array1.length != array2.length) {
    console.log("Those arrays are different lengths");
  } else {
    for(var i = 0; i < array1.length; i++) {
      if(array1[i] === array2[i]) {
        console.log("Position " + i + " match");
        exactMatch += 1;
        testArray.push("match");
      } else {
        console.log("No match. Match broken at index " + i);
        testArray.push(array1[i]);
      }
    }
    console.log("You have " + exactMatch + " match perfectly.");
    console.log("Your test array reads: " + testArray);
  }
  return exactMatch;
}

function colorMatch(array1, array2) {
  var tempMatch = 0;

  array1.forEach(function(index) {

    for(var i = 0; i < array2.length; i++) {
      if(index === array2[i]) {
        tempMatch += 1;

        console.log("i = " + i);
        console.log(index);
      }
    }
  });
  console.log(tempMatch);
  console.log("Your test array reads: " + testArray);
  console.log("You match the colors of " + tempMatch + " tiles.");
};
