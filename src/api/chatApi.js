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

export const fetchChatHistoryApi = async (page = 1, pageSize=  20) => {
    const allMessages = [
        { user: 'hi', response: 'hi, sayan how are you' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
        { user: 'what is AI?', response: 'AI stands for Artificial Intelligence...' },
    ];

    return allMessages;

    // const start = allMessages.length - page * pageSize;
    // const end = allMessages.length - (page - 1) * pageSize;

    // // clamp start >= 0
    // const sliced = allMessages.slice(Math.max(0, start), end);

    // // simulate network delay
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // // return in correct format for reducer
    // return sliced.map(item => [
    //     {
    //         role: 'user',
    //         content: item.user,
    //         timestamp: Date.now() - 100000,
    //     },
    //     {
    //         role: 'assistant',
    //         content: item.response,
    //         timestamp: Date.now() - 99999,
    //     },
    // ]).flat();
};

// Later, replace this with await API.get('/chat-history')