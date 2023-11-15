import { messageModel } from "../dao/models/messages.model.js";

export class MessagesRepository {

    async get() {
        return await messageModel.find().lean().exec();
    }

    async create(message) {
        return await messageModel.create(message);
    }

    async delete() {
        return await messageModel.deleteMany({});
    }

}