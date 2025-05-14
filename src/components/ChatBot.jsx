import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, ChevronDown, Bot, User } from 'lucide-react';

const FAQ_DATA = {
  greetings: [
    "Hello, Isko/Iska! 👋",
    "Kumusta? I'm your CS buddy! 💻",
    "Mabuhay! How can I help you today? 🌟"
  ],
  responses: {
    "what courses should i take first": "For your first year, I recommend starting with:\n• CMSC 11: Introduction to Computer Science\n• Math 21: Fundamental Mathematical Concepts\n• Math 22: Mathematics in the Modern World\nThese will give you a strong foundation! 📚",
    
    "how do i prepare for cmsc": "Here are some tips to prepare for CMSC courses:\n1. Practice programming basics\n2. Join study groups\n3. Utilize online resources like CS50\n4. Don't hesitate to ask your profs questions\n5. Balance theory and practical coding 💪",
    
    "what programming languages": "In UP Diliman CS, you'll mainly use:\n• Python (CMSC 11)\n• Java (CMSC 22)\n• C/C++ (CMSC 21)\n• Various others depending on electives 🚀",
    
    "career opportunities": "CS grads have many opportunities:\n• Software Developer\n• Data Scientist\n• AI/ML Engineer\n• System Administrator\n• Tech Consultant\nAnd many more! The field is always growing! 💼",
    
    "org recommendations": "Check out these orgs:\n• UP CSI (Computer Science Interest)\n• UPCC (Computer Club)\n• Google DSC\nGreat for networking and learning! 🤝",
    
    "study tips": "Here are some Isko/Iska-approved study tips:\n1. Practice coding daily\n2. Join study groups in Melchor Hall\n3. Use the CS library resources\n4. Balance acads and rest\n5. Don't cram your projects! 📝",
    
    "prerequisites": "Most CMSC courses have prerequisites. Check the curriculum flowchart on our website. Generally:\n• CMSC 11 → CMSC 21/22\n• Math 21 → Math 22\nPlan ahead! 📋",
    
    "thesis tips": "For your CS thesis:\n1. Start early\n2. Choose a topic you're passionate about\n3. Find a compatible adviser\n4. Document everything\n5. Use version control\nYou got this! 💪",
    
    "internship advice": "For internships:\n1. Build your portfolio early\n2. Join UP Job Fairs\n3. Network with alumni\n4. Practice technical interviews\n5. Consider both startups and big tech 🎯",
    
    "help": "I can help with:\n• Course recommendations\n• Study tips\n• Programming advice\n• Career guidance\n• Org recommendations\n• General CS questions\nJust ask! 😊"
  }
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const randomGreeting = FAQ_DATA.greetings[Math.floor(Math.random() * FAQ_DATA.greetings.length)];
      setTimeout(() => {
        setMessages([{ text: randomGreeting, isBot: true }]);
      }, 500);
    }
  }, [isOpen]);

  const findBestMatch = (input) => {
    const userInput = input.toLowerCase();
    const responses = FAQ_DATA.responses;
    let bestMatch = null;
    let highestScore = 0;

    for (const key in responses) {
      const score = calculateSimilarity(userInput, key);
      if (score > highestScore && score > 0.3) {
        highestScore = score;
        bestMatch = key;
      }
    }

    return bestMatch ? responses[bestMatch] : "I'm not sure about that. Try asking about courses, programming, careers, or type 'help' for more options! 🤔";
  };

  const calculateSimilarity = (str1, str2) => {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = findBestMatch(input);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-4 right-4 bg-[#4D9FFF] text-white p-4 rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-[#4D9FFF] p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white">
                <Bot size={24} />
                <div>
                  <h3 className="font-bold">CS Buddy</h3>
                  <p className="text-sm opacity-90">Your friendly Isko/Iska assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`flex gap-2 max-w-[80%] ${msg.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.isBot ? 'bg-[#4D9FFF]' : 'bg-[#FF4D8D]'
                      }`}>
                        {msg.isBot ? <Bot size={16} className="text-white" /> : <User size={16} className="text-white" />}
                      </div>
                      <div className={`p-3 rounded-2xl ${
                        msg.isBot 
                          ? 'bg-white text-gray-800 shadow-sm' 
                          : 'bg-[#FF4D8D] text-white'
                      }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2"
                  >
                    <div className="bg-gray-200 rounded-full p-3">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-gray-500 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-gray-500 rounded-full"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-gray-500 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about CS in UP..."
                  className="flex-1 p-2 border rounded-xl focus:outline-none focus:border-[#4D9FFF]"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#4D9FFF] text-white p-2 rounded-xl"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot; 