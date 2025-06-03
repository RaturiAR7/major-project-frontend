import React, { useState, useRef, useEffect } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // This is where you'd make an API call to your GPT service
      // Replace this with your actual API integration
      const response = await fetch("http://127.0.0.1:5000/generate-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      // Extract the text or JSON from the response
      const data = await response.json(); // Use response.text() if the API returns plain text

      // Add bot response to chat
      setMessages((prev) => [...prev, { text: data.info, isBot: true }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble connecting right now. Please try again later.",
          isBot: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-[400px] w-full max-w-xs mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-lg'>
      {/* Chat header */}
      <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow'>
        <h2 className='text-xl font-bold text-white flex items-center'>
          <span className='h-3 w-3 bg-green-400 rounded-full mr-2 animate-pulse'></span>
          AI Assistant
        </h2>
      </div>

      {/* Messages container */}
      <div className='flex-1 p-4 overflow-y-auto bg-gray-800'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[80%] mb-4 p-3 rounded-lg ${
              message.isBot
                ? "bg-gray-700 text-white self-start rounded-bl-none"
                : "bg-blue-600 text-white self-end ml-auto rounded-br-none"
            }`}
          >
            {message.text}
          </div>
        ))}

        {isLoading && (
          <div className='flex items-center space-x-2 bg-gray-700 text-white p-3 rounded-lg max-w-[80%] self-start rounded-bl-none'>
            <div className='w-2 h-2 rounded-full bg-gray-400 animate-bounce'></div>
            <div
              className='w-2 h-2 rounded-full bg-gray-400 animate-bounce'
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className='w-2 h-2 rounded-full bg-gray-400 animate-bounce'
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className='bg-gray-700 p-4 flex'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='flex-1 bg-gray-600 text-white px-4 py-2 rounded-l-lg focus:outline-none'
          placeholder='Type your message...'
          disabled={isLoading}
        />
        <button
          type='submit'
          disabled={isLoading || !input.trim()}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg font-medium disabled:bg-blue-800 disabled:opacity-50 transition-colors'
        >
          {isLoading ? (
            <span className='flex items-center justify-center'>
              <svg
                className='animate-spin h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
            </span>
          ) : (
            <span>Send</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
