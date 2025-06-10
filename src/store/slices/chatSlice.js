// Test 1:
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { sendMessageToChatbotApi } from "../../api/chatApi";

// // // Thunk to call chatbot API
// // export const sendMessageToChatbot = createAsyncThunk('chat/sendMessageToChatbot',
// //     async (userInput, { rejectWithValue }) => {
// //         try {
// //             const response = await sendMessageToChatbotApi(userInput);
// //             const botReply = response?.choices?.[0]?.message?.content || 'No reply';
// //             return botReply;
// //         }
// //         catch (error) {
// //             console.error(`Sending message failed: ${error}`);
// //             return rejectWithValue(error.response?.data || 'Error');
// //         }
// //     }
// // );

// // Thunk to call chatbot API
// export const sendMessageToChatbot = createAsyncThunk('chat/sendMessageToChatbot',
//     async (userInput) => {
//         const response = await sendMessageToChatbotApi(userInput);
//         return response;
//     }
// );

// const chatSlice = createSlice({
//     name: 'chat',
//     initialState: {
//         messages: [],
//         // status: 'idle',
//         // error: null,
//         loading: false,
//     },
//     reducers: {
//         // addUserMessage: (state, action) => {
//         //     state.messages.push({
//         //         sender: 'user',
//         //         text: action.payload,
//         //     });
//         // },
//         // clearChat: (state) => {
//         //     state.messages = [];
//         // },
//     },
//     extraReducers: (builder) => {
//         builder
//         .addCase(sendMessageToChatbot.pending, (state) => {
//             // state.status = 'loading';
//             state.loading = true;
//             // state.error = null;
//         })
//         .addCase(sendMessageToChatbot.fulfilled, (state, action) => {
//             // state.status = 'succeeded';
//             state.loading = false;
//             // const botReply = action.payload?.choices?.[0]?.message?.content || 'No response';
//             state.messages.push({
//                 sender: 'user',
//                 text: action.meta.arg,
//             });
//             const botMessage = action.payload?.choices?.[0]?.message?.content ?? '';
//             state.messages.push({
//                 sender: 'bot',
//                 text: botMessage,
//             });
//         })
//         .addCase(sendMessageToChatbot.rejected, (state) => {
//             // state.status = 'failed';
//             state.loading = false;
//             // state.error = action.payload;
//             state.messages.push({
//                 sender: 'bot',
//                 text: 'Sorry, something went wrong. Please try again.'
//             });
//         });
//     },
// });

// export const { addUserMessage, clearChat } = chatSlice.actions;

// export default chatSlice.reducer;



// Test 2:
// // src/redux/chatSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk to send message to chatbot API
// export const sendMessageToChatbot = createAsyncThunk(
//     'chat/sendMessageToChatbot',
//     async (userMessage, { rejectWithValue }) => {
//         try {
//             const response = await axios.post('http://127.0.0.1:8000/chatbot/', {
//                 message: userMessage,
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Bearer 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'
//                 },
//             });

//             return response.data;
//         } catch (error) {
//             console.error('Chatbot request failed', error);
//             return rejectWithValue(error.response?.data || error.message);
//         }
//     }
// );

// const chatSlice = createSlice({
//     name: 'chat',
//     initialState: {
//         messages: [], // Array of { role, content }
//         isLoading: false,
//         error: null,
//     },
//     reducers: {
//         addMessage: (state, action) => {
//             state.messages.push(action.payload);
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(sendMessageToChatbot.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(sendMessageToChatbot.fulfilled, (state) => {
//                 state.isLoading = false;
//                 state.error = null;
//             })
//             .addCase(sendMessageToChatbot.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload || 'Something went wrong';
//             });
//     },
// });

// export const { addMessage } = chatSlice.actions;
// export default chatSlice.reducer;





// Test 3:
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchChatHistoryApi, sendMessageToChatbotApi } from '../../api/chatApi';

const messageInitialState = {
    messages: [],
    status: 'idle',  // // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    activeConversationId: null,     // // Optional: if you want to support multiple conversations
};

// Thunk to call chatbot API
export const sendMessage = createAsyncThunk('chat/sendMessage',
    async (messageContent, { rejectWithValue, getState }) => {
        try {
            return await sendMessageToChatbotApi(messageContent);
        }
        catch (err) {
            return rejectWithValue(err?.response?.data || err.message);
        }
    }
);

// Thunk to call chat history
export const fetchChatHistory = createAsyncThunk('chat/fetchChatHistory',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchChatHistoryApi();
            const converted = data.flatMap(item => ([
                {
                    role: 'user',
                    content: item.user,
                    timestamp: Date.now(),
                },
                {
                    role: 'assistant',
                    content: item.response,
                    timestamp: Date.now(),
                },
            ]));
            return converted;
        }
        catch (err) {
            return rejectWithValue(err?.response?.data || err.message);
        }
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState: messageInitialState,
    reducers: {
        // For adding messages directly (useful for socket.io or local messages)
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        // For adding a user message before the API call (optimistic update)
        addUserMessage: (state, action) => {
            state.messages.push({
                role: 'user',
                content: action.payload,
                timestamp: Date.now(),
            });
            console.log(`User msg: ${action.payload}`);
        },
        // Reset the chat state
        resetChat: () => messageInitialState,
        // Prepend old messages
        prependMessages: (state, action) => {
            state.messages = [...action.payload, ...state.messages];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages.push({
                    ...action.payload,
                    timestamp: Date.now(),
                });
                // console.log(`AI response: ${action.payload.content}`);
                console.log('AI response: ', action.payload);
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                // You might want to mark the last user message as failed
                const lastUserMessageIndex = state.messages.findLastIndex(msg => msg.role === 'user');
            })
            .addCase(fetchChatHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchChatHistory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages = action.payload;
                console.log('Loaded chat history: ', action.payload);
            })
            .addCase(fetchChatHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
});

export const { addMessage, addUserMessage, resetChat, prependMessages } = chatSlice.actions;

// Selectors
export const selectAllMessages = state => state.chat.messages;
export const selectChatStatus = state => state.chat.status;
export const selectChatError = state => state.chat.error;

export default chatSlice.reducer;