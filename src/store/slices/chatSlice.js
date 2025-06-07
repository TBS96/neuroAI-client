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




// src/redux/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to send message to chatbot API
export const sendMessageToChatbot = createAsyncThunk(
    'chat/sendMessageToChatbot',
    async (userMessage, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/chatbot/', {
                message: userMessage,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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'
                },
            });

            return response.data;
        } catch (error) {
            console.error('Chatbot request failed', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [], // Array of { role, content }
        isLoading: false,
        error: null,
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessageToChatbot.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendMessageToChatbot.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(sendMessageToChatbot.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
