import {Injectable} from "@nestjs/common";
import {IGameEventsHandler} from "../interfaces/game-events.handler.interface";

@Injectable()
export class UseJokerHandler implements IGameEventsHandler {
    constructor() {
    }

    async handle(): Promise<void> {
    }
}