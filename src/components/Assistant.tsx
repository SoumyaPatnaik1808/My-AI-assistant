import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Header } from './Header';
import { MessageBubble } from './Message';
import type { Message } from '../types';
import { commandProcessors } from '../utils/commandProcessors';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [recognition, setRecognition] = useState<typeof SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (typeof SpeechRecognition !== 'undefined') {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript;
        setMessages(prev => [...prev, {
          text: command,
          sender: 'user',
          timestamp: new Date()
        }]);
        processCommand(command);
      };

      setRecognition(recognition);
    }
  }, []);

  const processCommand = useCallback((command: string) => {
    setIsThinking(true);
    let response = "I'm not sure how to help with that. Try asking me something else!";

    for (const processor of commandProcessors) {
      const matches = command.match(processor.pattern);
      if (matches) {
        response = processor.handler(matches);
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      }]);
      setIsThinking(false);
      
      if (!isMuted) {
        const speech = new SpeechSynthesisUtterance(response);
        window.speechSynthesis.speak(speech);
      }
    }, 1000);
  }, [isMuted]);

  const toggleListening = useCallback(() => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (error) {
        console.error('Speech recognition error:', error);
        recognition.stop();
      }
    }
  }, [recognition, isListening]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <Header isMuted={isMuted} onToggleMute={() => setIsMuted(!isMuted)} />

        <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <p>Try asking me:</p>
              <ul className="mt-2 space-y-1">
                <li>"What is the meaning of life?"</li>
                <li>"How does the internet work?"</li>
                <li>"Who was Albert Einstein?"</li>
                <li>"What's the best way to learn programming?"</li>
              </ul>
            </div>
          )}
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={toggleListening}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-white font-medium transition-colors ${
              isListening
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-5 h-5" />
                Listening...
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" />
                Press to Speak
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}