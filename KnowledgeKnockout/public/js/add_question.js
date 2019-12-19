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

form.onsubmit = async e => {
    e.preventDefault();

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

    try {
        const response = JSON.parse(await Ajax.post('/add-question', JSON.stringify(data), { 'Content-Type': 'application/json' }));

        if (response.success === true) {
            let reset = confirm('Hat geklappt! Formular resetten?');

            if (reset === true) {
                textArea.value = '';
                wrongAnswer01.value = '';
                wrongAnswer02.value = '';
                wrongAnswer03.value = '';
                correctAnswer.value = '';
                secondsInput.value = '';
            } 
        } else {
            throw response.error;
        }
    } catch (error) {
        alert(`Ein Fehler ist aufgetreten: ${error}`);
    }

    
};