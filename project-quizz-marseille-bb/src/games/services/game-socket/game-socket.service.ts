import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { SocketService } from 'src/socket/socket.service';

@Injectable()
export class GameSocketService implements OnModuleInit {
  private io: Server;

  constructor(private socketService: SocketService) {}

  onModuleInit() {
    this.io = this.socketService.getIo();
    this.socketService.initializeSocket();
    this.setGameListeners();
  }

  private setGameListeners() {
    this.io.on('connection', (socket) => {
      console.log('User Game', socket.id);

      // Lorsqu'un utilisateur crée une nouvelle partie, request HTTP pour insert data dans la table games est recupere les questions du quiz
      socket.on('joinNewGame', (data) => {
        console.log('joinNewGame', data);
        socket.join(data.gameId);
        socket.broadcast.emit('newGameAvailable', { gameId: data.gameId });
        // Obtenir et afficher la liste des sockets dans la salle après qu'un utilisateur a rejoint
        this.getSocketsInRoom(data.gameId);
      });

      // Écouter l'événement pour rejoindre une salle existante
      socket.on('joinExistingGame', (data) => {
        console.log('joinExistingGame', data);
        socket.join(data.gameId);
        // Obtenir et afficher la liste des sockets dans la salle après qu'un utilisateur a rejoint
        // Faire request HTTP pour obtenir les données du jeu est ajouté dans la table playersActivities est recupere les questions du quiz
        this.getSocketsInRoom(data.gameId,);
      });

      socket.on('leaveGame', (data) => {
        console.log('leaveGame', data);
        socket.leave(data.gameId);
        // Obtenir et afficher la liste des sockets dans la salle après qu'un utilisateur a quitté
        this.getSocketsInRoom(data.gameId);
      });
    });
  }
  // Ajouter une fonction pour obtenir la liste des sockets dans une salle
  private getSocketsInRoom(gameId: string) {
    const socketsInRoom = this.io.sockets.adapter.rooms.get(gameId);
    if (socketsInRoom) {
      console.log(`Sockets in room ${gameId}:`, Array.from(socketsInRoom));
      this.io.to(gameId).emit('socketsInRoom', Array.from(socketsInRoom));
    } else {
      this.io.to(gameId).emit('socketsInRoom', []);
    }
  }
}
