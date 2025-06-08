// import React, { useEffect, useRef, useState } from 'react'
// import io from 'socket.io-client'
// import { Button, Input } from '../index';
// import { useDispatch, useSelector } from 'react-redux';
// import { Send } from 'lucide-react';
// import { addUserMessage, sendMessageToChatbot } from '../../store/slices/chatSlice';

// let socket;
// const CONNECTION_PORT = 'localhost:3001/';

// const ChatBot = () => {

//     const [loggedIn, setLoggedIn] = useState(false);
//     // const [userName, setUserName] = useState('');
//     const userName = useSelector(state => state.auth.userData.name);
//     const chatMessages = useSelector(state => state.chat.messages);
//     const dispatch = useDispatch();
//     const [room, setRoom] = useState('');

//     const [message, setMessage] = useState('');
//     const [messageList, setMessageList] = useState([]);

//     useEffect(() => {
//         socket = io(CONNECTION_PORT)
//     }, [CONNECTION_PORT]);

//     useEffect(() => {
//         socket.on('receive_message', (data) => {
//             setMessageList((prevList) => [...prevList, data]);
//         })
//     }, []);

//     const connectToRoom = () => {
//         setLoggedIn(true);
//         socket.emit('join_room', room);
//     };

//     const sendMessage = async () => {

//         if (message.trim() === '') {
//             document.getElementById('emptyInputAreaModal').showModal();
//             return;
//         }

//         // Add user message locally
//         // dispatch(addUserMessage(message));

//         // Send message to chatbot API
//         dispatch(sendMessageToChatbot(message));

//         let messageContent = {
//             room: room,
//             content: {
//                 author: userName,
//                 message: message,
//                 timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//             },
//         };

//         await socket.emit('send_message', messageContent);
//         setMessageList([...messageList, messageContent.content]);
//         setMessage('');
//     };

//     const chatContainerRef = useRef(null);

//     useEffect(() => {
//         if (chatContainerRef.current) {
//             chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//         }
//     }, [chatMessages]);

//     return (
//         <div className='grid place-items-center tab-content overflow-x-auto scroll-auto p-2' data-aos='fade-up' data-aos-duration='1000'>

//             <div className='h-[800px] border mx-auto w-full max-w-5xl md:max-w-6xl p-2 rounded-lg flex flex-col'>

//                 {/* messages */}
//                 <div ref={chatContainerRef} className='flex-[80%] w-full overflow-y-auto p-4 space-y-2'>
//                     {/* {chatMessages.map(({ author, message, timestamp }, key) => { */}
//                     {chatMessages.map((message, key) => {
//                         // const isCurrentUser = author === userName;
//                         if (!message || !message.sender || !message.text) return null;
//                         const isCurrentUser = message.sender === 'user';
//                         return (
//                             // messageContainer
//                             <div
//                                 key={key}
//                                 className={`chat ${isCurrentUser ? 'chat-end' : 'chat-start'} my-2`}
//                                 id={isCurrentUser ? 'You' : author}
//                             >
//                                 {' '}
//                                 <div className={`wrap-break-word max-w-xs p-3 rounded-lg chat-bubble  ${isCurrentUser ? 'chat-bubble-primary' : 'chat-bubble-success'}`}>
//                                     <span className='block font-semibold text-base-300 text-xs'>{isCurrentUser ? `You (${userName})` : 'Chatbot'}</span>
//                                     <div className='flex flex-col gap-1'>
//                                         <span>{message.text}</span> {" "}
//                                         <span className='text-xs text-base-100 self-end'>{timestamp}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         )
//                     })}
//                 </div>

//                 {/* messageInputs */}
//                 <div className='join'>
//                     <Input
//                         type='text'
//                         onChange={(e) => { setMessage(e.target.value) }}
//                         value={message}
//                         className='input join-item rounded-l-full'
//                         placeholder='Type a Message...'
//                         title='Type a Message...'
//                         onKeyDown={(e) => {
//                             if (e.key === 'Enter') sendMessage();
//                         }}
//                     />
//                     <Button
//                         onClick={sendMessage}
//                         title='Send'
//                         className='join-item rounded-r-full skeleton'
//                     >
//                         <Send size={20} />
//                     </Button>
//                 </div>

//                 {/* Modal */}
//                 <dialog id='emptyInputAreaModal' className='modal'>
//                     <div className='modal-box'>
//                         <h3 className='font-bold text-lg'>Warning!</h3>
//                         <p className='py-4'>Please enter a message before sending.</p>
//                     </div>
//                     <form method='dialog' className='modal-backdrop'>
//                         <button>Close</button>
//                     </form>
//                 </dialog>

//             </div>

//         </div>
//     )
// }

// export default ChatBot



// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import io from 'socket.io-client';
// import { sendMessageToChatbot } from '../../store/slices/chatSlice';
// import { addMessage } from '../../store/slices/chatSlice'; // make sure addMessage is exported

// const ChatBot = () => {
//     const dispatch = useDispatch();
//     const messages = useSelector((state) => state.chat.messages);
//     const isLoading = useSelector((state) => state.chat.isLoading);
//     const error = useSelector((state) => state.chat.error);

//     const [inputText, setInputText] = useState('');
//     const [socket, setSocket] = useState(null);

//     useEffect(() => {
//         const newSocket = io('http://localhost:3001');
//         setSocket(newSocket);

//         newSocket.on('connect', () => {
//             console.log('Connected to Socket.IO server');
//         });

//         newSocket.on('disconnect', () => {
//             console.log('Disconnected from Socket.IO server');
//         });

//         return () => {
//             newSocket.disconnect();
//         };
//     }, []);

//     const sendMessage = async () => {
//         if (!inputText.trim()) return;

//         // 1️⃣ Add user message first
//         dispatch(
//             addMessage({
//                 role: 'user',
//                 content: inputText,
//             })
//         );

//         // 2️⃣ Send message to chatbot API
//         try {
//             const resultAction = await dispatch(
//                 sendMessageToChatbot(inputText)
//             );

//             if (sendMessageToChatbot.fulfilled.match(resultAction)) {
//                 const botReply = resultAction.payload.choices[0].message;

//                 // 3️⃣ Add bot message dynamically
//                 dispatch(
//                     addMessage({
//                         role: botReply.role, // 'assistant'
//                         content: botReply.content,
//                     })
//                 );

//                 // Optional: emit message via socket
//                 if (socket) {
//                     socket.emit('chat message', {
//                         role: botReply.role,
//                         content: botReply.content,
//                     });
//                 }
//             } else {
//                 console.error('Chatbot request failed:', resultAction.error);
//             }
//         } catch (err) {
//             console.error('Sending message failed:', err);
//         }

//         setInputText('');
//     };

//     return (
//         <div className='chatbot-container p-4 border rounded shadow-md w-full max-w-md mx-auto'>
//             <h2 className='text-xl font-bold mb-4'>ChatBot</h2>

//             <div className='messages-container mb-4 max-h-80 overflow-y-auto'>
//                 {messages.map((message, index) => {
//                     const isBot = message.role === 'assistant';

//                     return (
//                         <div
//                             key={index}
//                             className={`mb-2 p-2 rounded ${
//                                 isBot
//                                     ? 'bg-blue-100 text-blue-800 text-left'
//                                     : 'bg-green-100 text-green-800 text-right'
//                             }`}
//                         >
//                             {message.content}
//                         </div>
//                     );
//                 })}
//             </div>

//             {isLoading && (
//                 <div className='text-center mb-2 text-gray-500'>Loading...</div>
//             )}

//             {error && (
//                 <div className='text-center mb-2 text-red-500'>
//                     Error: {error}
//                 </div>
//             )}

//             <div className='flex'>
//                 <input
//                     type='text'
//                     className='flex-1 p-2 border rounded-l'
//                     placeholder='Type your message...'
//                     value={inputText}
//                     onChange={(e) => setInputText(e.target.value)}
//                     onKeyDown={(e) => {
//                         if (e.key === 'Enter') {
//                             sendMessage();
//                         }
//                     }}
//                 />
//                 <button
//                     onClick={sendMessage}
//                     className='bg-blue-500 text-white px-4 py-2 rounded-r'
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ChatBot;



// Deepseek code:
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Send } from 'lucide-react';
import { Button, Input } from '../index';
import { addUserMessage, sendMessage, selectAllMessages, selectChatStatus } from '../../store/slices/chatSlice';

const ChatBot = () => {

    const dispatch = useDispatch();

    const messages = useSelector(selectAllMessages);
    const status = useSelector(selectChatStatus);

    // const [loggedIn, setLoggedIn] = useState(false);
    const userName = useSelector(state => state.auth.userData.name);
    const [message, setMessage] = useState('');
    // const [messageList, setMessageList] = useState([]);
    const chatContainerRef = useRef(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage) {
            document.getElementById('emptyInputAreaModal').showModal();
            return;
        }

        // Clear input immediately
        setMessage('');

        try {
            // Optimistically add user message
            dispatch(addUserMessage(trimmedMessage));

            // Send to API and wait for response
            await dispatch(sendMessage(trimmedMessage)).unwrap();
        } catch (error) {
            console.error('Failed to send message:', error);
            // Optionally show error to user
        }
    };

    // Handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className='grid place-items-center tab-content overflow-x-auto scroll-auto p-2' data-aos='fade-up' data-aos-duration='1000'>
            <div className='h-[800px] border mx-auto w-full max-w-5xl md:max-w-6xl p-2 rounded-lg flex flex-col'>
                {/* Messages area */}
                <div ref={chatContainerRef} className='flex-[80%] w-full overflow-y-auto p-4 space-y-2'>
                    {messages.map(({ role, timeStamp, messageId, content }, index) => {
                        const isCurrentUser = role === 'user';
                        const timestamp = new Date(timeStamp || Date.now()).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        });

                        return (
                            <div
                                key={messageId || index}
                                className={`chat ${isCurrentUser ? 'chat-end' : 'chat-start'} my-2`}
                            >
                                <div className={`wrap-break-word max-w-xs p-3 rounded-lg chat-bubble ${isCurrentUser ? 'chat-bubble-primary' : 'chat-bubble-success'}`}>
                                    <span className='block font-semibold text-base-300 text-xs' title={isCurrentUser ? userName : 'neuroAI'}>
                                        {isCurrentUser ? `You (${userName})` : 'neuroAI'}
                                    </span>
                                    <div className='flex flex-col gap-1'>
                                        <span title={content}>{content}</span>
                                        <span className='text-xs text-base-100 self-end' title={timestamp}>{timestamp}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Typing indicator with DaisyUI classes */}
                    {status === 'loading' && (
                        <div className='chat chat-start my-2'>
                            <div className='chat-bubble chat-bubble-success'>
                                <div className='flex space-x-2 items-center'>
                                    <span className="loading loading-dots loading-xs"></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input area */}
                <div className='join'>
                    <Input
                        type='text'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className='input join-item rounded-l-full'
                        placeholder='Type a message...'
                        onKeyDown={handleKeyDown}
                        disabled={status === 'loading'}
                    />
                    <Button
                        onClick={handleSendMessage}
                        className='join-item rounded-r-full'
                        disabled={status === 'loading' || !message.trim()}
                        aria-label="Send message"
                    >
                        <Send size={20} />
                    </Button>
                </div>

                {/* Empty message modal */}
                <dialog id='emptyInputAreaModal' className='modal'>
                    <div className='modal-box'>
                        <h3 className='font-bold text-lg'>Warning!</h3>
                        <p className='py-4'>Please enter a message before sending.</p>
                        <div className='modal-action'>
                            <form method='dialog'>
                                <button className='btn'>Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default ChatBot;










// TODO: To be added later if required:
// {!loggedIn ? (
//     <div className='min-h-screen w-full py-16 border-4 border-blue-600 rounded-lg flex justify-center items-center flex-col'>

//         <div className='flex justify-center items-center'>
//             <div className='space-y-5'>
//                 <Input
//                     label='Name:'
//                     placeholder='Name...'
//                     type='text'
//                     onChange={(e) => { setUserName(e.target.value) }}
//                     required
//                 />
//                 <Input
//                     label='Room:'
//                     placeholder='Room...'
//                     type='text'
//                     onChange={(e) => { setRoom(e.target.value) }}
//                     required
//                 />
//             </div>
//         </div>

//         <Button type='submit' onClick={connectToRoom} className='my-5'>Enter Chat</Button>

//     </div>
// ) : (
//     // chatContainer
//     <div className='w-[600px] h-[350px] border-4 border-blue-600 rounded-lg flex flex-col text-gray-300'>

//         {/* messages */}
//         <div className='flex-[80%] w-full overflow-y-auto p-4 space-y-2'>
//             {messageList.map((val, key) => {
//                 const isCurrentUSer = val.author === userName;
//                 return (
//                     // messageContainer
//                     <div key={key} className={`flex ${isCurrentUSer ? 'justify-end' : 'justify-start'} my-2`} id={isCurrentUSer ? 'You' : val.author}>
//                         {' '}
//                         <div className={`max-w-xs p-3 rounded-lg ${isCurrentUSer ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
//                             <span className='block font-semibold'>{isCurrentUSer ? 'You' : val.author}</span>
//                             <span>{val.message}</span>
//                         </div>
//                     </div>
//                 )
//             })}
//         </div>

//         {/* messageInputs */}
//         <div className='flex-[20%] flex flex-row'>
//             <input type="text" onChange={(e) => { setMessage(e.target.value) }} value={message} className='flex-[80%] h-[calc(100%-5px)] border-t-4 border-[#0091ff] bg-transparent focus:outline-none text-lg rounded-l-lg pl-2' placeholder='Type a Message...' />
//             <button onClick={sendMessage} className='flex-[20%] h-full bg-[#16c525] border-t-4 border-[#0091ff] text-white text-lg hover:bg-[#16c525cb] rounded-r-lg'>Send</button>
//         </div>

//     </div>
// )}