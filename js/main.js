const GAME_TIME = 10;
let time = GAME_TIME;
let score = 0;
let isplaying = false;
let timeInterval;
let words = [];
let checkInterval;
const wordInput = document.querySelector(".word-input");     // 입력값
const wordDisplay = document.querySelector(".word-display");     // 제시어
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector("button");
const inputForm = document.querySelector(".word-input-box");


init();

function init(){
    buttonChange("게임 로딩 중...");
    getWords();
    inputForm.addEventListener("submit", checkMatch);
}

// 게임실행
function run() {
    if(isplaying){
        return;
    }
    isplaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval=setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange("게임중");
}
function checkStatus(){
    if(!isplaying && time===0){
        buttonChange("게임시작");
        clearInterval(checkInterval);
    }
}


// 단어 불러오기
function getWords(){
    axios.get('https://random-word-api.herokuapp.com/all') //https://random-word-api.herokuapp.com/word?number=100
        .then(function (response) {
            response.data.forEach((word)=>{
                if(word.length < 10) {
                    words.push(word);
                }
            })
            buttonChange("게임시작");
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}


// 게임 플레이
function checkMatch(event) {    
    event.preventDefault();

    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = "";
        if(!isplaying) {
            return;
        }
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random()*words.length);
        wordDisplay.innerText = words[randomIndex];
    }
    else {
        wordInput.value="";
    }
}


// 남은 시간
function countDown() {
    ((time>0) ? time-- : (isplaying=false))
    if(!isplaying){
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;
}

function buttonChange(text) {
    button.innerText=text;
    (text === '게임시작' ? button.classList.remove('loading'): button.classList.add('loading'));
}

button.addEventListener("mouseover", ()=>{
    button.classList.add("on-mouse");
})
button.addEventListener("mouseleave", ()=>{
    button.classList.remove("on-mouse");
})