const typing_ground = document.querySelector('#textarea');
const btn = document.querySelector('#btn');
const score = document.querySelector('#score');
const show_sentence = document.querySelector('#showSentence');

let startTime, endTime, totalTimeTaken,totalWords,displaySentence;


const sentences = ['The quick brown fox jumps over the lazy dog 1',
    'The quick brown fox jumps over the lazy dog 2',
    'The quick brown fox jumps over the lazy dog 3 ']


const calculateTypingSpeed = (time_taken) => {
    totalWords = typing_ground.value.trim();
    console.log(totalWords)
    let actualWords = totalWords === '' ? 0 : totalWords.split(" ").length;

    if(actualWords !== 0) {
        let typing_speed  =  (actualWords / time_taken) * 60;
        typing_speed = Math.round(typing_speed);
        score.innerHTML = `Your typing speed is ${typing_speed} words per minutes & you wrote ${actualWords} words & time taken ${time_taken} sec`;
    }else{
        score.innerHTML = `Your typing speed is 0 words per minutes & time taken ${time_taken} sec`;
    }
}

const evaluate = () => {
    if (totalWords && displaySentence) { // Check if both variables are defined and not empty
        const typedWords = totalWords.trim().split(" ");
        const displayedWords = displaySentence.trim().split(" ");
        let correctWordsCount = 0;
        const minLength = Math.min(typedWords.length, displayedWords.length);

        for (let i = 0; i < minLength; i++) {
            if (typedWords[i] === displayedWords[i]) {
             correctWordsCount++;
            }
        }

    // You can use correctWordsCount to determine accuracy or perform additional actions.
        console.log(`You typed ${correctWordsCount} out of ${displayedWords.length} words correctly.`);
        }
}
const endTypingTest = () => {
    btn.innerText = "Start";

    let date = new Date();
    endTime = date.getTime();

    totalTimeTaken = (endTime -startTime) / 1000;

    // console.log(totalTimeTaken);
    evaluate()
    calculateTypingSpeed(totalTimeTaken);

    show_sentence.innerHTML = "";
    typing_ground.value = "";
}


const startTyping = () => {
    let randomNumber = Math.floor(Math.random() * sentences.length);
    // console.log(randomNumber);
    displaySentence = sentences[randomNumber]
    show_sentence.innerHTML = displaySentence

    let date = new Date();
    startTime = date.getTime();

    btn.innerText = "Done";
}



btn.addEventListener('click', () => {
    switch (btn.innerText.toLowerCase()) {
        case "start":
            typing_ground.removeAttribute('disabled');
            startTyping();
            break;

        case "done":
            typing_ground.setAttribute('disabled' , 'true');
            endTypingTest();
            break;
    }
})
