// gh-pages

let score = 0;
let isplaying = false;
let timeInterval;
let words = [];
let loading = true;
let checkInterval;
const wordInput = document.querySelector(".word-input");     // 입력값
const wordDisplay = document.querySelector(".word-display");     // 제시어
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");
const inputForm = document.querySelector(".word-input-box");
const settingBtn = document.querySelector(".setting-btn");
const reSetting = document.querySelector(".re-setting");
const setting = document.querySelector(".setting");
const timeSet=document.querySelector("#set-time");
const lengthSet=document.querySelector("#set-length");


// 설정 적용
function setApply(){
    settingBtn.classList.add("hidden");
    button.classList.remove("hidden");
    setting.classList.add("hidden");
    getWords();
    buttonChange("게임 로딩 중...");
    inputForm.addEventListener("submit", checkMatch);
}

//설정창 나타내기
function set() {
    setting.classList.remove("hidden"); // 설정창, 설정적용 버튼 나타내기
    settingBtn.classList.remove("hidden");
    button.classList.add("hidden");    // 게임시작 버튼, 설정적용버튼 숨기기
    reSetting.classList.add("hidden");
}

//설정창 숨기기
function hiddenSet(){
    setting.classList.add("hidden");
    settingBtn.classList.add("hidden");
}

// 게임실행
function run() {
    if(isplaying){  // 게임중일 경우 버튼을 눌러도 동작하지 않음.
        return;
    }
    wordDisplay.innerText = words[Math.floor(Math.random()*words.length)];
    isplaying = true;
    time = timeSet.valueAsNumber;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval=setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange("게임중");
    reSetting.classList.add("hidden");
}
function checkStatus(){
    if(!isplaying && time===0){
        buttonChange("게임시작");
        clearInterval(checkInterval);
        wordDisplay.innerText=`${scoreDisplay.innerText}점`
    }
}


// 단어 불러오기
function getWords(){
    axios.get('https://random-word-api.herokuapp.com/all') //https://random-word-api.herokuapp.com/word?number=100
        .then(function (response) {
            response.data.forEach((word)=>{
                if(word.length <= lengthSet.value) {
                    words.push(word);
                }
            })
            buttonChange("게임시작");
            wordDisplay.innerText = "로딩 완료!";
            loading=false;
            reSetting.classList.remove("hidden");
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
        time = timeSet.valueAsNumber+1;
        const randomIndex = Math.floor(Math.random()*words.length);
        wordDisplay.innerText = words[randomIndex];
    }
    else {
        wordInput.value="";
    }
}


// 남은 시간
function countDown() {
    if(time>0) {
        time--;
    }
    else{
        isplaying=false;
        set();
    }
    
    if(!isplaying){
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;
}

function buttonChange(text) {
    button.innerText=text;
    (text === '게임시작' ? button.classList.remove('loading'): button.classList.add('loading'));
}


// 버튼 마우스 이벤트
button.addEventListener("mouseover", ()=>{
    button.classList.add("on-mouse");
})
button.addEventListener("mouseleave", ()=>{
    button.classList.remove("on-mouse");
})
settingBtn.addEventListener("mouseover", ()=>{
    settingBtn.classList.add("on-mouse");
})
settingBtn.addEventListener("mouseleave", ()=>{
    settingBtn.classList.remove("on-mouse");
})
reSetting.addEventListener("mouseover", ()=>{
    reSetting.classList.add("on-mouse");
})
reSetting.addEventListener("mouseleave", ()=>{
    reSetting.classList.remove("on-mouse");
})