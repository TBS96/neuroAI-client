import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Send } from 'lucide-react';
import { Button, Input } from '../index'
import { addUserMessage, sendMessage, selectAllMessages, selectChatStatus, selectChatError, fetchChatHistory, prependMessages } from '../../store/slices/chatSlice'
import ReactMarkdown from 'react-markdown'
import { useFooterVisibility } from '../../context/FooterVisibilityContext.jsx'

const ChatBot = () => {

    const { hideFooter, showFooterFn } = useFooterVisibility();

    const dispatch = useDispatch();

    const messages = useSelector(selectAllMessages);

    const status = useSelector(selectChatStatus);

    const chatError = useSelector(selectChatError);

    const userName = useSelector(state => state.auth.userData?.name || 'Guest');

    const [message, setMessage] = useState('');

    const chatContainerRef = useRef(null);

    const [chatApiError, setChatApiError] = useState({});

    const [loadingOlderMessages, setLoadingOlderMessages] = useState(false);

    useEffect(() => {
        hideFooter();
        return () => showFooterFn();
    }, [hideFooter, showFooterFn]);

    const handleLoadOlderMessages = async () => {
        if (loadingOlderMessages) return;
        setLoadingOlderMessages(true);
    };

    const handleScrollToTop = (e) => {
        const { scrollTop } = e.target;
        if (scrollTop === 0) handleLoadOlderMessages();
    };

    useEffect(() => {
        if (chatError) {
            const errorModal = document.getElementById('errorModal');
            if (errorModal) errorModal.showModal();
        }
    }, [chatError]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        dispatch(fetchChatHistory())
    }, [dispatch]);

    const handleSendMessage = async () => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage) {
            document.getElementById('emptyInputAreaModal').showModal();
            return;
        }

        setMessage('');
        setChatApiError(chatError);

        try {
            // Optimistically add user message
            dispatch(addUserMessage(trimmedMessage));

            // Send to API and wait for response
            await dispatch(sendMessage(trimmedMessage)).unwrap();
        }
        catch (error) {
            console.error('Failed to send message:', error);
            // setChatApiError(error);
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
        <div className='fixed inset-0 bg-base-200 flex justify-center items-center z-0 pt-16' data-aos='fade-up' data-aos-duration='1000'>
            <div className='flex flex-col w-full max-w-5xl md:max-w-6xl h-full overflow-hidden p-2'>

                {/* Messages area */}
                <div
                    ref={chatContainerRef}
                    className='flex-1 overflow-y-auto p-4 space-y-2 min-h-0'
                    onScroll={handleScrollToTop}
                >
                    {messages.map(({ role, timeStamp, messageId, content, isError }, index) => {
                        const isCurrentUser = role === 'user';
                        const timestamp = new Date(timeStamp || Date.now()).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        });

                        return (
                            <div
                                key={messageId || index}
                                className={`chat ${isCurrentUser ? 'chat-end' : 'chat-start'} my-2`}
                            >
                                <div
                                    className={`wrap-break-word max-w-xs p-3 rounded-lg chat-bubble ${isCurrentUser
                                        ? 'chat-bubble-primary'
                                        : isError
                                            ? 'chat-bubble-error'
                                            : 'chat-bubble-info'
                                        }`}
                                >
                                    <span className='block font-semibold text-base-300 text-xs' title={isCurrentUser ? `You (${userName})` : 'neuroAI'}>
                                        {isCurrentUser ? `You (${userName})` : 'neuroAI'}
                                    </span>
                                    <div className='flex flex-col gap-1'>
                                        <div title={content}>
                                            <ReactMarkdown>
                                                {content}
                                            </ReactMarkdown>
                                        </div>

                                        <span className='text-xs prose text-base-100 self-end' title={timestamp}>{timestamp}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Typing indicator */}
                    {status === 'loading' && (
                        <div className='chat chat-start my-2'>
                            <div className='chat-bubble chat-bubble-success'>
                                <div className='flex space-x-2 items-center'>
                                    <span className='loading loading-dots loading-xs'></span>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Input area */}
                <div className='bg-base-100 p-2 border-t'>
                    <div className='join w-full'>
                        <Input
                            type='text'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='input join-item w-full rounded-l-full'
                            placeholder='Type a message...'
                            onKeyDown={handleKeyDown}
                            disabled={status === 'loading'}
                            title='Type a message...'
                        />
                        <Button
                            onClick={handleSendMessage}
                            className='join-item rounded-r-full'
                            disabled={status === 'loading'}
                            aria-label='Send Message'
                            title='Send Message'
                        >
                            <Send size={20} />
                        </Button>
                    </div>
                </div>

            </div>

            {/* Error modal */}
            <dialog id='errorModal' className='modal'>
                <div className='modal-box'>
                    <h3 className='font-bold text-lg text-error'>Error!</h3>
                    <p className='py-4'>{chatError}</p>
                    <div className='modal-action'>
                        <form method='dialog'>
                            <button className='btn'>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* Empty input modal */}
            <dialog id='emptyInputAreaModal' className='modal'>
                <div className='modal-box'>
                    <h3 className='font-bold text-lg text-warning'>Warning!</h3>
                    <p className='py-4'>Please enter a message before sending.</p>
                    <div className='modal-action'>
                        <form method='dialog'>
                            <button className='btn'>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ChatBot