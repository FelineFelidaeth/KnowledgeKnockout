import { asyncTimeout, asyncTimeoutWithCondition } from '../helpers';
import { Questions } from '../questions/Questions';
import { SocketConnection } from '../socket_connection/SocketConnection';
import { User } from '../user/User';
import { Player } from './Player';

export class Fight {
    public players: Player[] = [];
    public constructor(users: User[]) {
        for (const user of users) {
            user.isInMatch = true;
        }

        const interval = setInterval(() => {
            if (users.every(user => !!SocketConnection.get(user.sessionID))) {
                for (const user of users) {
                    this.players.push(new Player(user));
                }

                for (const player of this.players) {
                    player.socket.on('chatmessage', msg => {
                        for (const player_ of this.players) {
                            player_.socket.emit('chatmessage', { msg, user: player.user.name });
                        }
                    });
                }

                this.Start();

                clearInterval(interval);
            }
        }, 500);
    }
    private async Start(): Promise<void> {
        console.log('match start');
        for (const player of this.players) {
            player.socket.emit('avatarInfo', this.players.map(player_ => ({ isThisPlayer: player.socket.id === player_.socket.id, avatars: player_.user.avatars.map(avatar => ({ topicId: avatar.topicId, level: avatar.level })) })));
        }

        for (let i = 1; i < this.players[0].user.avatars.length + 1; i++) {
            const question = await Questions.getRandomQuestion(i);

            for (const player of this.players) {
                player.answered = player.answerIsCorrect = false;
                player.socket.emit('question', { id: question.id, content: question.content, answers: (await Questions.getAnswers(question.id)).map(answer => ({ content: answer.content, id: answer.id })), time: question.secondsToSolve });
            }

            await asyncTimeoutWithCondition(question.secondsToSolve * 1000, this.players.map(player => ({ reference: player, propertyName: 'answered', value: true })));

            if (this.players.every(player => player.answerIsCorrect)) {
                for (const player of this.players) {
                    player.score += player.user.getAvatar(i).level;
                }
            } else if (!this.players.every(player => player.answerIsCorrect) && this.players.some(player => player.answerIsCorrect)) {
                for (let j = 0; j < this.players.length; j++) {
                    const player = this.players[j];

                    if (player.answerIsCorrect) {
                        player.score += player.user.getAvatar(i).level;
                    } else {
                        player.score += Math.max(0, player.user.getAvatar(i).level - this.players[(j + 1) % this.players.length].user.getAvatar(i).level);
                    }
                }
            }

            for (const player of this.players) {
                player.socket.emit('roundResult', this.players.map(player_ => ({ isThisPlayer: player.socket.id === player_.socket.id, correct: player_.answerIsCorrect, score: player_.score })));
            }

            await asyncTimeout(5000);
        }

        for (let j = 0; j < this.players.length; j++) {
            const player = this.players[j];

            player.user.progress += player.score;
            player.socket.emit('matchend', this.players.map(player_ => ({ isThisPlayer: player.socket.id === player_.socket.id, score: player_.score, won: player.score > this.players[j + 1].score, progress: player.user.progress })));
        }

        await asyncTimeout(15000);

        for (const player of this.players) {
            player.user.isInMatch = false;
        }
    }
}