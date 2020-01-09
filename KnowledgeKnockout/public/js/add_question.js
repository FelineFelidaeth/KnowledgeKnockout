import { Ajax } from './modules/ajax.js';

const form = document.getElementById('questionUploadForm');
const textArea = document.getElementById('questionContent');
const wrongAnswer01 = document.getElementById('answer_01');
const wrongAnswer02 = document.getElementById('answer_02');
const wrongAnswer03 = document.getElementById('answer_03');
const correctAnswer = document.getElementById('answer_04');
const topicBlockSelect = document.getElementById('topicBlock');
const topicSelect = document.getElementById('topic');
const secondsInput = document.getElementById('secondsToAnswer');
const resetForm = () => {
    textArea.value = '';
    wrongAnswer01.value = '';
    wrongAnswer02.value = '';
    wrongAnswer03.value = '';
    correctAnswer.value = '';
    secondsInput.value = '';
};

form.onsubmit = async e => {
    e.preventDefault();

    let errorString = '';

    let data = {
        content: textArea.value,
        wrongAnswer01: wrongAnswer01.value,
        wrongAnswer02: wrongAnswer02.value,
        wrongAnswer03: wrongAnswer03.value,
        correctAnswer: correctAnswer.value,
        topicBlockId: topicBlockSelect.options[topicBlockSelect.selectedIndex].value,
        topicId: topicSelect.options[topicSelect.selectedIndex].value,
        seconds: secondsInput.value
    };

    // validate input

    if (data.content === '') {
        errorString += "Bitte gib eine Frage ein!\n";
    }

    if (data.wrongAnswer01 === '') {
        errorString += "Bitte falsche Antwort 1 eingeben!\n";
    }

    if (data.wrongAnswer02 === '') {
        errorString += "Bitte falsche Antwort 2 eingeben!\n";
    }

    if (data.wrongAnswer03 === '') {
        errorString += "Bitte falsche Antwort 3 eingeben!\n";
    }

    if (data.correctAnswer === '') {
        errorString += "Bitte die korrekte Antwort eingeben!\n"
    }

    if (data.seconds === '') {
        errorString += "Bitte die maximale Antwortzeit eingeben!\n"
    }

    if (errorString.length !== 0) {
        return alert(errorString);
    }

    try {
        const response = JSON.parse(await Ajax.post('/add-question', JSON.stringify(data), { 'Content-Type': 'application/json' }));

        if (response.success === true) {

            if (confirm('Hat geklappt! Formular resetten?')) resetForm();

        } else {

            throw response.error;

        }
    } catch (error) {
        alert(`Ein Fehler ist aufgetreten: ${error}`);
    }

    
};