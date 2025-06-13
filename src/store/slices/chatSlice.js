import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchChatHistoryApi, sendMessageToChatbotApi } from '../../api/chatApi'
import API from '../../api/api'

const messageInitialState = {
    messages: [],
    status: 'idle',
    error: null,
    activeConversationId: null,
};

// Thunk to send message to chatbot API
export const sendMessage = createAsyncThunk('chat/sendMessage',
    async (messageContent, { rejectWithValue }) => {
        try {
            const aiResponse = await sendMessageToChatbotApi(messageContent);

            const newHistoryItem = {
                user: messageContent,
                response: aiResponse.content,
            };

            await API.post('/chat-history/', [newHistoryItem]);

            // Return the full message objects for Redux state update
            return {
                userMessage: {
                    role: 'user',
                    content: messageContent,
                    timestamp: Date.now(),
                },
                botMessage: {
                    role: 'assistant',
                    content: aiResponse.content,
                    timestamp: Date.now(),
                    messageId: aiResponse.messageId,
                }
            };
        }
        catch (err) {
            console.error(`Chatbot request or history save failed: ${err.response?.data || err.message}`);
            return rejectWithValue(err.response?.data?.error || err.message || 'Failed to send message or save history.');
        }
    }
);

// Thunk to call chat history
export const fetchChatHistory = createAsyncThunk('chat/fetchChatHistory',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchChatHistoryApi(); // This gets the existing history
            // console.log(`Raw Data received from fetchChatHistoryApi: ${data}`);

            if (!Array.isArray(data)) {
                console.error('Chat history API did not return an array:', data);
                return rejectWithValue('Invalid chat history format from server.');
            }

            const converted = data.flatMap(item => {
                const messages = [];
                const itemTimestamp = item.timestamp || Date.now();

                if (item.user) {
                    messages.push({
                        role: 'user',
                        content: item.user,
                        timestamp: itemTimestamp,
                    });
                }
                if (item.response) {
                    messages.push({
                        role: 'assistant',
                        content: item.response,
                        timestamp: itemTimestamp,
                    });
                }
                return messages;
            });
            // console.log(`Converted chat history payload: ${converted}`);
            return converted;
        }
        catch (err) {
            console.error(`Error fetching chat history: ${err.response?.data || err.message}`);
            return rejectWithValue(err.response?.data?.error || err.message || 'Failed to load chat history.');
        }
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState: messageInitialState,
    reducers: {
        // Reducer to add a user message immediately to the state (optimistic update)
        addUserMessage: (state, action) => {
            state.messages.push({
                role: 'user',
                content: action.payload,
                timestamp: Date.now(),
            });
            // console.log(`User msg added to state: ${action.payload}`);
        },
        // Reset the chat state
        resetChat: () => messageInitialState,
        // Prepend old messages (for potential infinite scroll, not directly used in this flow)
        prependMessages: (state, action) => {
            state.messages = [...action.payload, ...state.messages];
        },
    },
    extraReducers: (builder) => {
        builder
            // Send message cases
            .addCase(sendMessage.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Add BOTH user and bot message to state after successful API and save
                // state.messages.push(action.payload.userMessage);     // root cause of glitch: userMessage rendered twice
                state.messages.push(action.payload.botMessage);
                // console.log(`User and AI response added to state: ${action.payload}`);
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.status = 'failed';
                // state.error = action.payload;
                state.error = `NeuroAI couldn't process your message. Please try again.`;
                state.messages.push({
                    role: 'assistant',
                    // content: `Error: ${action.payload}. Please try again.`,
                    content: `⚠️ NeuroAI couldn't process your request. Please try again.`,
                    timestamp: Date.now(),
                    isError: true
                });
                console.error(`Failed to send message or save history: ${action.payload}`);
            })

            // Fetch chat history cases
            .addCase(fetchChatHistory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchChatHistory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages = action.payload; // This overwrites existing messages with fetched history
                // console.log(`Final chat history loaded into Redux state: ${action.payload}`);
            })
            .addCase(fetchChatHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                console.error(`Failed to load chat history: ${action.payload}`);
            })
    }
});

export const { addUserMessage, resetChat, prependMessages } = chatSlice.actions;

// Selectors
export const selectAllMessages = state => state.chat.messages;
export const selectChatStatus = state => state.chat.status;
export const selectChatError = state => state.chat.error;

export default chatSlice.reducer;