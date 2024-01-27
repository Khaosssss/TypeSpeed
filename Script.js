const inputBox = document.querySelector('#textarea');
const btn = document.querySelector('#btn');
const score = document.querySelector('#score');
//const show_sentence = document.querySelector('#textarea').placeholder;
const accuracy = document.querySelector('#accurancy')

let startTime, endTime, totalTimeTaken,totalWords,displaySentence,accurancyPercentage;


const sentences = ['The sun sets behind the mountains, painting the sky in hues of orange and pink',
    'In a bustling city, the sounds of traffic create a constant symphony of movement',
    'The old oak tree stood tall, its branches reaching out like ancient storytellers']


const calculateTypingSpeed = (time_taken) => {
    totalWords = inputBox.value.trim();
    console.log(totalWords)
    let actualWords = totalWords === '' ? 0 : totalWords.split(" ").length;

    if(actualWords !== 0) {
        let typing_speed  =  (actualWords / time_taken) * 60;
        typing_speed = Math.round(typing_speed);
        score.innerHTML = `Your typing speed is ${typing_speed} words per minutes & you wrote ${actualWords} words & time taken ${time_taken} sec`;
    }
    else{
        score.innerHTML = `Your typing speed is 0 words per minutes & time taken ${time_taken} sec`;
    }
}

const evaluate = () => {
    if (!totalWords || !displaySentence) {
        console.log("Total words or display sentence is empty or undefined.");
        return;
    }

    const typedWords = totalWords.trim().split(" ");
    const displayedWords = displaySentence.trim().split(" ");
    const totalTypedWordsCount = typedWords.length; // Calculate total typed words count

    let correctWordsCount = 0;
    const minLength = Math.min(totalTypedWordsCount, displayedWords.length);

    for (let i = 0; i < minLength; i++) {
        if (typedWords[i] === displayedWords[i]) {
            correctWordsCount++;
        }
    }

    console.log(`You typed ${correctWordsCount} out of ${totalTypedWordsCount} words correctly.`);

    const accuracyPercentage = (correctWordsCount / totalTypedWordsCount) * 100;
    console.log(`Accuracy Percentage is ${accuracyPercentage.toFixed(2)}%`);
    accuracy.innerHTML = `Accuracy Percentage is ${accuracyPercentage.toFixed(2)}%`;
}
const endTypingTest = () => {
    btn.innerText = "Start";
    let date = new Date();
    endTime = date.getTime();

    totalTimeTaken = (endTime -startTime) / 1000;

    //console.log(totalTimeTaken);
    calculateTypingSpeed(totalTimeTaken);
    evaluate();

    inputBox.value = "";
    inputBox.placeholder = "";
}


const startTyping = () => {
    let randomNumber = Math.floor(Math.random() * sentences.length);
    // console.log(randomNumber);
    displaySentence = sentences[randomNumber]
    inputBox.placeholder = displaySentence

    let date = new Date();
    startTime = date.getTime();
    btn.innerText = "Done";
}



btn.addEventListener('click', () => {
    switch (btn.innerText.toLowerCase()) {
        case "start":
            inputBox.removeAttribute('disabled');
            startTyping();
            break;
        case "done":
            inputBox.setAttribute('disabled' , 'true');
            endTypingTest();
            break;
    }
})