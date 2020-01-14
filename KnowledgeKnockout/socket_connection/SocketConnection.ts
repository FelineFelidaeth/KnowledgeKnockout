import { Server } from 'http';
import * as socketio from 'socket.io';
import { Sessions } from '../user/Sessions';
import { User } from '../user/User';

export class SocketConnection {
    public static sockets: Map<string, socketio.Socket>; // Map<sessionID, socket>
    private static io: socketio.Server;
    public static initialize(server: Server): void {
        SocketConnection.io = socketio(server);
        SocketConnection.sockets = new Map();
        SocketConnection.io.on('connection', socket => {
            SocketConnection.sockets.set(SocketConnection.getSessionId(socket), socket);
            socket.on('disconnect', () => SocketConnection.sockets.delete(SocketConnection.getSessionId(socket)));

            socket.on('chatmessage', msg => {
                if (!(<User>Sessions.get(SocketConnection.getSessionId(socket)).user).isInMatch) {
                    for (const [sessionID, socket] of SocketConnection.sockets) {
                        const user = <User>Sessions.get(sessionID).user;
                        if (!user.isInMatch) socket.emit('chatmessage', { msg, user: user.name });
                    }
                }
            });
        });
    }
    public static get(sessionID: string): socketio.Socket {
        return <socketio.Socket>SocketConnection.sockets.get(sessionID);
    }
    public static getSessionId(socket: socketio.Socket): string {
        const match = socket.request.headers.cookie.match(new RegExp(`${process.env.SESSIONID}=s\%3A(.*)\\..*;`)); // session cookie example: s%3AjcEci1GnosCbRx-ovp6HjG33oA__H7Y1.E%2FtvkiJhQyDzUwqeeGX7jlAFmPt9Aa3YSfaibjuqL5g  // sid == jcEci1GnosCbRx-ovp6HjG33oA__H7Y1
        return match?.length > 0 ? match[1] : '';
    }
}