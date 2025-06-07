import API from './api';

export const sendMessageToChatbotApi = async (userInput) => {
    try {
        const response = await API.post('/chatbot', {
            user_input: userInput,
        });
        return response.data;
    }
    catch (err) {
        console.error(`Chatbot request failed ${err}`);
        throw err;
    }
};