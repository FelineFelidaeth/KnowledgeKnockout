export class Question {
    public id: number;
    public blockId: number;
    public topicId: number;
    public content: string;
    public imgSrc: string;
    public secondsToSolve: number;
    public constructor(questionId: number = 0, blockId: number = 0, topicId: number = 0, content: string = '', imgSrc: string = '', secondsToSolve: number = 0) {
        this.id = questionId;
        this.blockId = blockId;
        this.topicId = topicId;
        this.content = content;
        this.imgSrc = imgSrc;
        this.secondsToSolve = secondsToSolve;
    }
}