const playBoard = document.querySelector(".play-board");
const ScoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i ");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBoddy = [];
let setIntervalId;
let score = 0;



let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;



const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30)+1;
    foodY = Math.floor(Math.random() * 30)+1;
}

const handleGamerOver = () =>{
    clearInterval(setIntervalId);
    alert("Buen intento, sigue jugando. . . ");
    location.reload();

}

//cambiar la velocidad

const changeDirecction = e => {
    if (e.key === "ArrowUp" && velocityY !== 1) {
      velocityX = 0;
      velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
      velocityX = 0;
      velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
      velocityX = -1;
      velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
      velocityX = 1;
      velocityY = 0;
    }
  };
  


//cambiar direccion 

controls.forEach(button => button.addEventListener("click", ()=>changeDirecction({
    key: button.dataset.key
})));

const initGame = () => {
    if(gameOver) return handleGamerOver();
    let html =`<div class="food" style="grid-area : ${foodY} / ${foodX}"></div>`;

    //cuando la serpiente come 

    if(snakeX ===foodX && snakeY === foodY){
        updateFoodPosition();
        snakeBoddy.push([foodY, foodX])
        score ++;
        highScore=score >= highScore ? score: highScore; // si el score > high score => high score = score

        localStorage.setItem("high-score", highScore);
        ScoreElement.innerText = `Score: ${score}`
        highScoreScoreElement.innerText =`High Score: ${highScore}`;
    }
    
    //update snake head

    snakeX += velocityX;
    snakeY += velocityY;

    for(let i=snakeBoddy.length - 1; i>0 ; i--){
    snakeBoddy[i] = snakeBoddy[i - 1];
    }

    snakeBoddy[0] = [snakeX,snakeY];

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 ) {
        return gameOver = true;
    }

    //add div for earch party oh snake baby
    for (let i = 0; i < snakeBoddy.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBoddy[i][1]} / ${snakeBoddy[i][0]}"></div>`;
        // check snake head hit body or no
        if (i !== 0 && snakeBoddy[0][1] === snakeBoddy[i][1] && snakeBoddy[0][0] === snakeBoddy[i][0]) {
          gameOver = true;
        }
      }
      

    playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId= setInterval(initGame,100);
document.addEventListener("keyup", changeDirecction);



