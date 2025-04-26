import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { Button, Input } from './index';

let socket;
const CONNECTION_PORT = 'localhost:3001/';

const ChatBot = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('');

    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket = io(CONNECTION_PORT)
    }, [CONNECTION_PORT]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList((prevList) => [...prevList, data]);
        })
    }, []);

    const connectToRoom = () => {
        setLoggedIn(true);
        socket.emit('join_room', room);
    };

    const sendMessage = async () => {

        if (message.trim() === '') {
            document.getElementById('emptyInputAreaModal').showModal();
            return;
        }

        let messageContent = {
            room: room,
            content: {
                author: userName,
                message: message,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            },
        };

        await socket.emit('send_message', messageContent);
        setMessageList([...messageList, messageContent.content]);
        setMessage('');
    };

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messageList]);

    return (
        <div className='grid place-items-center min-h-screen tab-content overflow-x-auto scroll-auto'>

            <div className='h-96 border mx-auto w-full max-w-6xl p-2 rounded-lg flex flex-col'>

                {/* messages */}
                <div ref={chatContainerRef} data-aos='fade-up' className='flex-[80%] w-full overflow-y-auto p-4 space-y-2'>
                    {messageList.map((val, key) => {
                        const isCurrentUser = val.author === userName;
                        return (
                            // messageContainer
                            <div key={key} className={`chat ${isCurrentUser ? 'chat-end' : 'chat-start'} my-2`} id={isCurrentUser ? 'You' : val.author}>
                                {' '}
                                <div className={`max-w-xs p-3 rounded-lg chat-bubble  ${isCurrentUser ? 'chat-bubble-primary' : 'chat-bubble-success'}`}>
                                    <span className='block font-semibold text-base-300'>{isCurrentUser ? 'You' : val.author}</span>
                                    <div className='flex flex-col gap-1'>
                                        <span>{val.message}</span> {" "}
                                        <span className='text-xs text-base-100 self-end'>{val.timestamp}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* messageInputs */}
                <div className='join'>
                    <Input
                        type='text'
                        onChange={(e) => { setMessage(e.target.value) }}
                        value={message}
                        className='input join-item'
                        placeholder='Type a Message...'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') sendMessage();
                        }}
                    />
                    <Button
                        onClick={sendMessage}
                        className='join-item rounded-r-full skeleton'
                    >
                        Send
                    </Button>
                </div>

                {/* Modal */}
                <dialog id='emptyInputAreaModal' className='modal'>
                    <div className='modal-box'>
                        <h3 className='font-bold text-lg'>Warning!</h3>
                        <p className='py-4'>Please enter a message before sending.</p>
                    </div>
                    <form method='dialog' className='modal-backdrop'>
                        <button>Close</button>
                    </form>
                </dialog>

            </div>

        </div>
    )
}

export default ChatBot













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