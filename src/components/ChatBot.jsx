import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

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

        if (message.trim() !== '') {
            let messageContent = {
                room: room,
                content: {
                    author: userName,
                    message: message
                },
            };

            await socket.emit('send_message', messageContent);
            setMessageList([...messageList, messageContent.content]);
            setMessage('');
        }
    };

    return (
        <div className='grid place-items-center h-screen bg-[#2a2730]'>
            {!loggedIn ? (
                <div className='w-[600px] h-[350px] border-4 border-blue-600 rounded-lg flex justify-center items-center flex-col'>

                    <div className='text-gray-200'>
                        <input type="text" placeholder='Name...' onChange={(e) => { setUserName(e.target.value) }} className='m-10 w-52 h-10 border-2 border-[#0091ff] bg-transparent focus:outline-none pl-2 text-lg rounded-lg' />
                        <input type="text" placeholder='Room...' onChange={(e) => { setRoom(e.target.value) }} className='m-10 w-52 h-10 border-2 border-[#0091ff] bg-transparent focus:outline-none pl-2 text-lg rounded-lg' />
                    </div>

                    <button onClick={connectToRoom} className='w-52 h-12 bg-[#0091ff] text-white text-lg mt-11 hover:bg-[#037edc] rounded-lg'>Enter Chat</button>

                </div>
            ) : (
                // chatContainer
                <div className='w-[600px] h-[350px] border-4 border-blue-600 rounded-lg flex flex-col text-gray-300'>

                    {/* messages */}
                    <div className='flex-[80%] w-full overflow-y-auto p-4 space-y-2'>
                        {messageList.map((val, key) => {
                            const isCurrentUSer = val.author === userName;
                            return (
                                // messageContainer
                                <div key={key} className={`flex ${isCurrentUSer ? 'justify-end' : 'justify-start'} my-2`} id={isCurrentUSer ? 'You' : val.author}>
                                    {' '}
                                    <div className={`max-w-xs p-3 rounded-lg ${isCurrentUSer ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
                                        <span className='block font-semibold'>{isCurrentUSer ? 'You' : val.author}</span>
                                        <span>{val.message}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* messageInputs */}
                    <div className='flex-[20%] flex flex-row'>
                        <input type="text" onChange={(e) => { setMessage(e.target.value) }} value={message} className='flex-[80%] h-[calc(100%-5px)] border-t-4 border-[#0091ff] bg-transparent focus:outline-none text-lg rounded-l-lg pl-2' placeholder='Type a Message...' />
                        <button onClick={sendMessage} className='flex-[20%] h-full bg-[#16c525] border-t-4 border-[#0091ff] text-white text-lg hover:bg-[#16c525cb] rounded-r-lg'>Send</button>
                    </div>

                </div>
            )}
        </div>
    )
}

export default ChatBot