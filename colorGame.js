var numOfSquares = 6;
var colors =[];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var h1 = document.querySelector("h1");
var modeButtons = document.querySelectorAll(".mode");


//main
init();


// F U N C T I O N S
function init(){
  setUpButtons();
  setUpSquares()
  reset();
}
//change squares and h1 to the picked color
function changeColors(color){
  //loop through all squares hange eace color to match given color
  for(var i = 0; i < colors.length; i++)
    squares[i].style.backgroundColor = color;
  //change h1 color  
  h1.style.backgroundColor = color;
}
//select 1 random color from the array
function pickRandColor(){
  //choose a random color from the colors array and return it
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
//create an array of x random colors
function generateRandColors(num){
  var arr = [];
  for(var i = 0; i < num; i++){
    //get random color and push into arr
    arr[i] = randomColor();
  }
  return arr;
}
//create single random color
function randomColor(){
  //pick a "red" from 0 -255
  var red = Math.floor(Math.random() * (255 + 1));
  //pick a "green" from 0 -255
  var blue = Math.floor(Math.random() * (255 + 1));
  //pick a "blue" from 0 -255
  var green = Math.floor(Math.random() * (255 + 1));
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function reset(){
  //generate new colors
  colors = generateRandColors(numOfSquares);
  //pick a new random color from array
  pickedColor = pickRandColor();
  //change colorDisplay to picked color
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "new colors";
  //set the colors of the squares
  for(var i = 0; i < squares.length; i++){
    if(colors[i]){
      squares[i].style.display = "block"; //if squares were hide on easy mode now we display them again
      squares[i].style.backgroundColor = colors[i];
    }
    else
      squares[i].style.display = "none";
  }
  //reset h1 color
  h1.style.backgroundColor = "steelblue";  
  messageDisplay.textContent = ""; 
}

//add event listner to reset ,easy and hard buttons
function setUpButtons(){
  //add event listener to reset button
  resetButton.addEventListener("click", function(){
    reset();
  })
  //add event listner to easy and hard buttons
  for(var i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click",function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6;
      reset();
        });
  }
}

function setUpSquares(){
  for(var i =0; i<squares.length; i++){
    squares[i].addEventListener("click", function(){
      //grab color of clicked sqaure
      var clickedColor = this.style.backgroundColor;
      //compare color to pickedColor
      if(clickedColor === pickedColor){
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        /*change squares and h1 colors to pickedColor*/
        changeColors(clickedColor);}
      else{
        this.style.background = "#232323";
        messageDisplay.textContent = "Try Again";}
    });
  }
}