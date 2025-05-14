import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Code, FileText, UserCircle2, Video, Send } from 'lucide-react';
import { createSession, joinSession, connectSocket, disconnectSocket } from '../../services/collabService';
import MonacoEditor from '@monaco-editor/react';
import axios from 'axios';

const JUDGE0_API_KEY = '27777c8d98msh48bded3b8085ebcp19cdcfjsn479c03fedeaa';
const languageMap = {
  javascript: 63, // Node.js
  python: 71,
  java: 62,
  cpp: 54,
};

const RealTimeCollaboration = ({ studyBuddy }) => {
  // All hooks at the top, unconditionally
  const [activeSession, setActiveSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('chat');
  const [code, setCode] = useState('// Start coding together with your buddy!');
  const [drawing, setDrawing] = useState([]);
  const [user] = useState({ name: 'You' });
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const messagesEndRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);

  // Moved hook definitions above this conditional return
  useEffect(() => {
    if (!studyBuddy) return; // Now the condition is inside the hook

    const createAndJoin = async () => {
      try {
        console.log("Attempting to create session for:", studyBuddy.name);
        const sessionData = {
          title: `Session with ${studyBuddy.name}`,
          participants: [studyBuddy.id, /* yourUserId */], // Assuming studyBuddy has an id and you have a user id
          isPrivate: true, // Mark as a private session between two buddies
        };
        // We expect createSession to return the full session object including an ID
        const session = await createSession(sessionData);
        console.log("Session created:", session);

        if (session && session.id) {
          setActiveSession(session);
          await joinSession(session.id, user); // 'user' should ideally have an ID
          
          const socket = connectSocket();
          socketRef.current = socket;

          socket.emit('join-session', { sessionId: session.id, user });
          
          // Listen for other user joining (the study buddy)
          socket.on('user-joined', (joinedUser) => {
            console.log("User joined:", joinedUser);
            // setParticipants((prev) => [...prev, joinedUser]); // If we add a participant list
          });

          socket.on('chat-message', (msg) => {
            setMessages((prev) => [...prev, msg]);
          });
          socket.on('code-update', (newCode) => {
            setCode(newCode);
          });
          socket.on('whiteboard-draw', (data) => {
            setDrawing((prev) => [...prev, data]);
          });

        } else {
          console.error("Failed to create or retrieve session ID");
          // Handle error: show a message to the user
        }
      } catch (error) {
        console.error("Error in createAndJoin:", error);
        // Handle error: show a message to the user
      }
    };

    createAndJoin();

    return () => {
      if (socketRef.current) {
        disconnectSocket();
        socketRef.current = null;
      }
    };
  }, [studyBuddy, user]); // Added user to dependency array, ensure it's stable or memoized if it's an object passed from parent

  // Draw on canvas
  useEffect(() => {
    if (!studyBuddy) return; // Condition inside hook
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawing.forEach(({ x, y, color, size }) => { // Assuming color and size might be passed
        ctx.beginPath();
        ctx.arc(x, y, size || 2, 0, 2 * Math.PI);
        ctx.fillStyle = color || '#7B1113';
        ctx.fill();
      });
    }
  }, [drawing, studyBuddy]);

  // Scroll chat to bottom
  useEffect(() => {
    if (!studyBuddy) return; // Condition inside hook
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, studyBuddy]);
  
  // Only render if studyBuddy is provided. This check is now AFTER all hooks.
  if (!studyBuddy) {
    return null; 
  }

  // Send chat message
  const sendMessage = (content) => {
    if (!content.trim() || !activeSession) return;
    const msg = { sender: user.name, content, time: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, msg]);
    if (socketRef.current) {
      socketRef.current.emit('chat-message', { sessionId: activeSession.id, message: msg });
    }
  };

  // Code editor sync
  const handleCodeChange = (value) => {
    setCode(value);
    if (socketRef.current && activeSession) {
      socketRef.current.emit('code-update', { sessionId: activeSession.id, code: value });
    }
  };

  // Whiteboard drawing sync
  const handleCanvasDraw = (e) => {
    if (!activeSession || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const data = { x, y, type: 'dot' }; // type can be extended for lines, shapes etc.
    setDrawing((prev) => [...prev, data]);
    if (socketRef.current) {
      socketRef.current.emit('whiteboard-draw', { sessionId: activeSession.id, data });
    }
  };

  // Run code using Judge0
  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');
    try {
      const response = await axios.post(
        'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
        {
          source_code: code,
          language_id: languageMap[language],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': JUDGE0_API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          },
        }
      );
      setOutput(response.data.stdout || response.data.stderr || response.data.compile_output || 'No output');
    } catch (err) {
      console.error("Error running code:", err);
      setOutput('Error running code. Check console for details.');
    }
    setIsRunning(false);
  };

  // Google Meet handler
  const handleGoogleMeet = () => {
    window.open('https://meet.google.com/new', '_blank');
  };

  // UI Components (Removed SessionList and CreateSessionModal)
  const CollaborationTabs = () => (
    <div className="bg-white/50 dark:bg-neutral-800/40 backdrop-blur-sm rounded-2xl p-3 mb-5 shadow-md flex flex-wrap gap-2 border border-white/50 dark:border-neutral-700/50">
      <button 
        onClick={() => setActiveTab('chat')} 
        className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all transform ${
          activeTab === 'chat' 
            ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-md scale-105' 
            : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600'
        }`}
      >
        <MessageSquare className="w-5 h-5" />
        <span>Chat</span>
      </button>
      <button 
        onClick={() => setActiveTab('code')} 
        className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all transform ${
          activeTab === 'code' 
            ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-md scale-105' 
            : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600'
        }`}
      >
        <Code className="w-5 h-5" />
        <span>Code</span>
      </button>
      <button 
        onClick={() => setActiveTab('whiteboard')} 
        className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all transform ${
          activeTab === 'whiteboard' 
            ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-md scale-105' 
            : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600'
        }`}
      >
        <FileText className="w-5 h-5" />
        <span>Whiteboard</span>
      </button>
    </div>
  );

  const ChatSection = () => {
    const [input, setInput] = useState('');
    
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (input.trim()) {
          sendMessage(input);
          setInput('');
        }
      }
    };
    
    return (
      <div className="flex flex-col h-[400px]">
        <div className="flex-1 overflow-y-auto mb-4 px-2 py-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400 dark:text-neutral-500">
              <MessageSquare className="w-12 h-12 mb-3 opacity-50" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`mb-3 max-w-[80%] ${message.sender === user.name ? 'ml-auto' : 'mr-auto'}`}
              >
                <div className={`p-3 rounded-2xl ${
                  message.sender === user.name 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white dark:bg-neutral-700 rounded-tl-none'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                <div className={`flex items-center text-xs text-neutral-500 dark:text-neutral-400 mt-1 ${
                  message.sender === user.name ? 'justify-end' : 'justify-start'
                }`}>
                  <span>{message.sender}</span>
                  <span className="mx-1">•</span>
                  <span>{message.time}</span>
                </div>
              </motion.div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="relative">
          <textarea 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyDown={handleKeyDown}
            placeholder="Type your message..." 
            className="w-full px-4 py-3 pr-12 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary focus:outline-none resize-none"
            rows="2"
          />
          <button 
            onClick={() => { 
              if (input.trim()) {
                sendMessage(input); 
                setInput(''); 
              }
            }} 
            className="absolute right-3 bottom-3 p-2 text-white bg-primary hover:bg-primary-dark rounded-full transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const CodeSection = () => (
    <div className="h-[400px] flex flex-col">
      <div className="flex items-center mb-3 gap-2">
        <select 
          value={language} 
          onChange={e => setLanguage(e.target.value)} 
          className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        <button 
          onClick={handleRunCode} 
          disabled={isRunning} 
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          {isRunning ? 
            <>
              <span className="w-3 h-3 rounded-full bg-white animate-pulse inline-block"></span>
              Running...
            </> : 
            'Run Code'
          }
        </button>
      </div>
      
      <div className="rounded-xl overflow-hidden shadow-md flex-1">
        <MonacoEditor
          height="100%"
          language={language}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{ 
            fontSize: 14, 
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 10 }
          }}
        />
      </div>
      
      {output && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 bg-neutral-800 dark:bg-neutral-900 rounded-xl p-4 text-sm font-mono text-white overflow-auto max-h-32"
        >
          <div className="flex justify-between items-center mb-1">
            <strong className="text-neutral-400">Output</strong>
          </div>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </motion.div>
      )}
    </div>
  );

  const WhiteboardSection = () => (
    <div className="h-[400px] flex flex-col items-center justify-center">
      <div className="relative bg-white rounded-xl shadow-md overflow-hidden">
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={340} 
          style={{ cursor: 'crosshair', maxWidth: '100%' }} 
          onClick={handleCanvasDraw} 
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/10 backdrop-blur-sm p-2 text-center text-sm text-white">
          Click anywhere to draw • Collaborative whiteboard
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-5 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 min-h-screen rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-4 rounded-xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-full p-1 shadow-lg">
            <UserCircle2 className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">{studyBuddy.name}</h2>
            <div className="text-neutral-500 dark:text-neutral-400">{studyBuddy.specialization}</div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleMeet}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium shadow-md hover:from-green-600 hover:to-green-700 transition-all"
        >
          <Video className="w-5 h-5" /> Start Google Meet
        </motion.button>
      </div>
      
      <CollaborationTabs />
      
      <motion.div 
        key={activeTab} 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3 }}
        className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/30 dark:border-neutral-700/30"
      >
        {activeTab === 'chat' && <ChatSection />}
        {activeTab === 'code' && <CodeSection />}
        {activeTab === 'whiteboard' && <WhiteboardSection />}
      </motion.div>
    </div>
  );
};

export default RealTimeCollaboration;