// Game constants and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("eating-sound-effect.mp3");
const moveSound = new Audio("Dir.mp3");
const gameOverSound = new Audio("gameOver.mp3");
const musicSound = new Audio("music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7 };

//Main Function
function main(ctime) {
  window.requestAnimationFrame(main);
//   console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

//Collide function
function isCollide(snake) {
//   If you bump into yourself
  for (let i = 1; i<snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
    { 
         return true;
    }
  }

   //if you bump on to the wall
  if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
    return true;
  }

  return false;
}

//Game Engine
function gameEngine() {
  //Updating the snake array & food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = {x: 0, y: 0};
    alert("Game Over. Press any Key To Play Again!");
    snakeArr = [{x: 13, y: 15}];
    musicSound.play();
    score = 0;
    scoreBox.innerHTML="Score: "+score;
  }

  //If you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    console.log(hiscoreval)
    if(score>hiscoreval){
        hiscoreval=score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        hiscoreBox.innerHTML="Hiscore: "+hiscoreval;
    }
    scoreBox.innerHTML="Score: "+score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Main logic start here
musicSound.play();
let hiscoreval;
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval=0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
let buttons=document.querySelectorAll('.btn');
Array.from(buttons).forEach((button)=>{
    button.addEventListener('click', (e)=>{
        let str=e.target.innerHTML;
        console.log(str);

        switch (str) {
            case "Up":
              console.log("ArrowUp");
              moveSound.play();
              inputDir.x = 0;
              inputDir.y = -1;
              break;
        
            case "Down":
              console.log("ArrowDown");
              moveSound.play();
              inputDir.x = 0;
              inputDir.y = 1;
              break;
        
            case "Left":
              console.log("ArrowLeft");
              moveSound.play();
              inputDir.x = -1;
              inputDir.y = 0;
              break;
        
            case "Right":
              console.log("ArrowRight");
              moveSound.play();
              inputDir.x = 1;
              inputDir.y = 0;
              break;
            default:
                break;
          }
    })
})