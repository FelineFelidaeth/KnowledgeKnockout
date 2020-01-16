import { Socket } from 'socket.io';
import { Questions } from '../questions/Questions';
import { SocketConnection } from '../socket_connection/SocketConnection';
import { User } from '../user/User';

export class Player {
    public user: User;
    public socket: Socket;
    public answerIsCorrect: boolean = false;
    public answered: boolean = false;
    public score: number = 0;
    public constructor(user: User) {
        this.user = user;

        this.socket = <Socket>SocketConnection.get(this.user.sessionID);
        this.socket.on('testAnswer', this.TestAnswerEvent.bind(this));
    }
    private async TestAnswerEvent(message: any): Promise<void> {
        this.answered = true;
        this.answerIsCorrect = await Questions.test(message.answerId, message.questionId);
    }
}