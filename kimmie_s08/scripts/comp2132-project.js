/*
track the game
*/
//track score
let compCurrent = 0;
let compTotal = 0;
let userCurrent = 0;
let userTotal = 0;
const failFace = 1;

// track for pop up
let clickTime = 0;
let gameFinish = false;
let winner = false;

//to disable buttons 
let btnDisable = false;

//pop-up handler
let popupHandler;

/*
display the game
*/
// the game display screen
const game = document.getElementById('game');
const computer = document.getElementById('computer');
const user = document.getElementById('user');
// the dices
const dice01 = document.getElementById('dice01');
const dice02 = document.getElementById('dice02');
const dice03 = document.getElementById('dice03');
const dice04 = document.getElementById('dice04');
// button control action 
const btnNew = document.getElementById('btn-new');
const btnRoll = document.getElementById('btn-roll');
// scores
const computerSingleScore = document.getElementById('single-score-computer');
const computerTotalScore = document.getElementById('total-score-computer');
const userSingleScore = document.getElementById('single-score-user');
const userTotalScore = document.getElementById('total-score-user');
//profile img control
const compImg = document.getElementById('computer-image');
const userImg = document.getElementById('user-image');
/* 
pop-up control
*/
// button control action exit
const btnExit = document.getElementById('btn-exit');
// pop up container
const popUp = document.getElementById('pop-up');
//pop up picture
const popPic = document.getElementById('congrats');
const message = document.getElementById('message');

/*
---------------------------------------
DEFINE A Dice and User OBJECT
---------------------------------------
*/
class DiceFace {
    constructor(value) {
        this.value = value;
    }
    describeSelf() {
        const imageSrc = `images/wdice-0${this.value}.png`
        return imageSrc;
    }
}

function rollOneDice() {
    // random number from 1 to 6
    const randValue = Math.floor(Math.random() * 6) + 1;
    return randValue;
}

class User {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
}

// start a new game right away when open page
newGame();

//new game will run only when the btn is not disabled ( no pop-up)
btnNew.addEventListener('click', function () {
    if (!btnDisable) {
        newGame();
    }
})

//new round 
btnRoll.addEventListener('click', function () {
    clickTime += 1;

    if (!btnDisable && clickTime < 4) {

        newRoll();

        if (clickTime == 3) {
            // check if user are the winner
            checkWinner();

            window.setTimeout(function () {
                if (winner) {
                    popPic.innerHTML = `<img src='icons/bird-win.gif' alt='angry bird cheering'>`;
                    message.innerHTML = `Congratulation! You win!`;
                } else {
                    popPic.innerHTML = `<img src='icons/bird-lose.gif' alt='angry bird tongue out'>`;
                    message.innerHTML = `You lose! Try again!`;
                }
                popUp.removeAttribute('class', 'non-active');
                popUp.setAttribute('class', 'active');
                popUp.style.display = "block";
                btnDisable = true;
            }, 1000);
        }
    }
})

// close pop up when click exit button
btnExit.addEventListener('click', function () {
    popUp.style.display = "none";
    btnDisable = false; // to activate the start button again
    popUp.removeAttribute('class', 'active');
    popUp.setAttribute('class', 'non-active');
})

function checkWinner(){
    if (compTotal < userTotal){
        winner = true;
    }else{
        winner = false;
    }
}

/*
function new roll
roll + display img of dice
base on the rules, display this round scores + add scores in total
*/
function newRoll() {

    const d1 = rollOneDice();
    const d2 = rollOneDice();
    const d3 = rollOneDice();
    const d4 = rollOneDice();

    dice01.setAttribute('src', new DiceFace(d1).describeSelf());
    dice02.setAttribute('src', new DiceFace(d2).describeSelf());
    dice03.setAttribute('src', new DiceFace(d3).describeSelf());
    dice04.setAttribute('src', new DiceFace(d4).describeSelf());

    
    if (d1 == 1 || d2 == 1 ){// face 01 occurs
        compCurrent = 0;
    }else if(d1 == d2){ // pair occurs
        compCurrent = d1*4;
    }else{
        compCurrent = d1+d2; // different face and no face 01 
    }

    if (d3 == 1 || d4 == 1 ){// face 01 occurs
        userCurrent = 0;
    }else if(d3 == d4){// pair occurs
        userCurrent = d3*4;
    }else{
        userCurrent = d3+d4; // different face and no face 01 
    }

    compTotal += compCurrent;
    userTotal += userCurrent;

    computerSingleScore.innerHTML = `Score round ${clickTime}: ${compCurrent}`;
    computerTotalScore.innerHTML = `Total Score: ${compTotal}`;
    userSingleScore.innerHTML = `Score round ${clickTime}: ${userCurrent}`;
    userTotalScore.innerHTML = `Total Score: ${userTotal}`;
}

/*
function to set a new game
every sroce = 0;
dice's image = rolling dice
*/

function newGame() {
    compCurrent = 0;
    compTotal = 0;
    userCurrent = 0;
    userTotal = 0;
    clickTime = 0;

    dice01.setAttribute('src', "images/dice-roll.gif");
    dice02.setAttribute('src', "images/dice-roll.gif");
    dice03.setAttribute('src', "images/dice-roll.gif");
    dice04.setAttribute('src', "images/dice-roll.gif");

    computerSingleScore.innerHTML = `Score single round: ${compCurrent}`;
    computerTotalScore.innerHTML = `Total Score: ${compTotal}`;
    userSingleScore.innerHTML = `Score single round: ${userCurrent}`;
    userTotalScore.innerHTML = `Total Score: ${userTotal}`;
    clearTimeout(window);
}

//game rules toggle by clicking menu button
const menu = document.getElementById('btn-menu');
const gameRules = document.getElementById('game-rules');
menu.addEventListener('click',function(){
    if(gameRules.className=='non-active'){ 
        gameRules.removeAttribute('class', 'non-active');
        gameRules.setAttribute('class', 'active');
        btnDisable = true;
    }
    else{
        gameRules.removeAttribute('class', 'active');
        gameRules.setAttribute('class', 'non-active');
        btnDisable = false;
    } 
});

















