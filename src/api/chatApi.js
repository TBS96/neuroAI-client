import API from './api';

export const sendMessageToChatbotApi = async (userInput) => {
    try {
        const response = await API.post('/chatbot/', {
            user_input: userInput,
            // user_from_storage: JSON.parse(localStorage.getItem('authData')),
            accessToken: JSON.parse(localStorage.getItem('authData'))?.accessToken || null,
            refreshToken: JSON.parse(localStorage.getItem('authData'))?.refreshToken || null,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (response.data?.choices?.[0]?.message) {
            return {
                role: response.data.choices[0].message.role,
                content: response.data.choices[0].message.content,
                messageId: response.data.id,
                timestamp: response.data.created,
            }
        }
        throw new Error('Invalid response structure from chatbot API');
    }
    catch (err) {
        console.error(`Chatbot request failed ${err}`);
        throw err;
    }
};