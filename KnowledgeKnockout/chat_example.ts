import { Socket } from 'socket.io';
import { SocketConnection } from './socket_connection/SocketConnection';

export class ChatExample {
    private static sockets: Map<string, Socket | undefined>;
    public static initialize() {
        ChatExample.sockets = new Map();
        setInterval(ChatExample.update, 100);
    }
    private static update() {
        for (const sessID of SocketConnection.sockets.keys()) {
            if (!ChatExample.sockets.get(sessID)) {
                ChatExample.sockets.set(sessID, SocketConnection.sockets.get(sessID));
                ChatExample.sockets.get(sessID)?.on('chat', msg => ChatExample.sockets.forEach(socket => socket?.emit('chat', JSON.stringify({ msg, username: sessID }))));
            }
        }

        for (const sessID of ChatExample.sockets.keys()) {
            if (!SocketConnection.sockets.get(sessID)) ChatExample.sockets.delete(sessID);
        }
    }
}