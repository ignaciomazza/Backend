import { MessagesRepository } from "../../repository/MessagesRepository.js"

const messagesRepository = new MessagesRepository()

export default class MessagesManager {

    getMessages = async () => {
        try {
            return await messagesRepository.get();
        } catch (error) {
            return error;
        }
    }

    createMessage = async (message) => {
        if (message.user.trim() === '' || message.message.trim() === '') {
            return null;
        }
        try {
            return await messagesRepository.create(message);
        } catch (error) {
            return error;
        }
    }

    deleteAllMessages = async () => {
        try {
            return await messagesRepository.delete();
        } catch (error) {
            return error;
        }
    }
    
}