export class Answer {
    public id: number;
    public questionId: number;
    public content: string;
    public isCorrect: boolean;
    public imgSrc: string;
    public constructor(id: number = 0, questionId: number = 0, content: string = '', isCorrect: boolean | number = 0, imgSrc: string = '') {
        this.id = id;
        this.questionId = questionId;
        this.content = content;
        this.isCorrect = !!isCorrect;
        this.imgSrc = imgSrc;
    }
}