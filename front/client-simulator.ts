
import io, {Socket} from 'socket.io-client';


class WebSocketClientSimulator {
    private socket: Socket;

    constructor(serverUrl: string) {
        this.socket = io(serverUrl, {
            transports: ['websocket'],
        });

        this.initializeListeners();
    }

    private initializeListeners(): void {
        this.socket.on('connect', () => {
            console.log('Connected to server');
            this.requestAllGameStatusOpen();
        });

        this.socket.on('allGameStatusOpen', (data: any) => {
            console.log('Received allGameStatusOpen:', data);
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        this.socket.on('error', (error: any) => {
            console.error('Error:', error);
        });
    }

    private requestAllGameStatusOpen(): void {
        console.log('Requesting allGameStatusOpen');
        this.socket.emit('allGameStatusOpen', { event: 'allGameStatusOpen', data: {} });
    }
}

const serverUrl = 'http://localhost:3000'; // Remplacez par l'URL de votre serveur WebSocket
new WebSocketClientSimulator(serverUrl);
