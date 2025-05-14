import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Code, FileText, X, Plus } from 'lucide-react';
import { listSessions, createSession, joinSession, connectSocket, disconnectSocket } from '../../services/collabService';
import MonacoEditor from '@monaco-editor/react';

const RealTimeCollaboration = () => {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [activeTab, setActiveTab] = useState('chat');
  const [code, setCode] = useState('// Start coding together!');
  const [drawing, setDrawing] = useState([]); // [{x, y, type}]
  const [user, setUser] = useState({ name: 'Guest' + Math.floor(Math.random()*1000) });
  const messagesEndRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);

  // Fetch sessions
  useEffect(() => {
    listSessions().then(setSessions);
    return () => disconnectSocket();
  }, []);

  // Join session and set up socket
  const handleJoinSession = async (session) => {
    setActiveSession(session);
    await joinSession(session.id, user);
    const socket = connectSocket();
    socketRef.current = socket;
    socket.emit('join-session', { sessionId: session.id, user });
    socket.on('user-joined', (u) => setParticipants((prev) => [...prev, u]));
    socket.on('chat-message', (msg) => setMessages((prev) => [...prev, msg]));
    socket.on('code-update', (newCode) => setCode(newCode));
    socket.on('whiteboard-draw', (data) => setDrawing((prev) => [...prev, data]));
  };

  // Send chat message
  const sendMessage = (content) => {
    if (!content.trim()) return;
    const msg = { sender: user.name, content, time: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, msg]);
    socketRef.current.emit('chat-message', { sessionId: activeSession.id, message: msg });
  };

  // Code editor sync
  const handleCodeChange = (value) => {
    setCode(value);
    socketRef.current.emit('code-update', { sessionId: activeSession.id, code: value });
  };

  // Whiteboard drawing sync
  const handleCanvasDraw = (e) => {
    if (!activeSession) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const data = { x, y, type: 'dot' };
    setDrawing((prev) => [...prev, data]);
    socketRef.current.emit('whiteboard-draw', { sessionId: activeSession.id, data });
  };

  // Draw on canvas
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 600, 400);
      drawing.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = '#7B1113';
        ctx.fill();
      });
    }
  }, [drawing]);

  // Scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Create session
  const handleCreateSession = async (e) => {
    e.preventDefault();
    const form = e.target;
    const session = await createSession({
      title: form.title.value,
      subject: form.subject.value,
      description: form.description.value,
    });
    setSessions((prev) => [...prev, session]);
    setIsCreating(false);
  };

  // UI Components
  const SessionList = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">CS Network: Real-Time Study Sessions</h2>
        <button onClick={() => setIsCreating(true)} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center"><Plus className="w-4 h-4 mr-2" />Create Session</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sessions.map((session) => (
          <motion.div key={session.id} className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft flex flex-col justify-between" whileHover={{ scale: 1.02 }}>
            <div>
              <div className="font-bold text-lg mb-1 text-primary">{session.title}</div>
              <div className="text-neutral-600 dark:text-neutral-400 mb-1">{session.subject}</div>
              <div className="text-neutral-500 dark:text-neutral-400 mb-3">{session.description}</div>
            </div>
            <button onClick={() => handleJoinSession(session)} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark mt-2">Join</button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const CreateSessionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-neutral-800 rounded-xl p-8 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Create Study Session</h2>
          <button onClick={() => setIsCreating(false)} className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <form className="space-y-4" onSubmit={handleCreateSession}>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Session Title</label>
            <input name="title" type="text" className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Subject</label>
            <input name="subject" type="text" className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Description</label>
            <textarea name="description" className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800" rows="3" required />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">Create Session</button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  const CollaborationTabs = () => (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 mb-4 shadow-soft flex flex-wrap gap-4">
      <button onClick={() => setActiveTab('chat')} className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'chat' ? 'bg-primary text-white' : 'text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary'}`}><MessageSquare className="w-5 h-5" /><span>Chat</span></button>
      <button onClick={() => setActiveTab('code')} className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'code' ? 'bg-primary text-white' : 'text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary'}`}><Code className="w-5 h-5" /><span>Code</span></button>
      <button onClick={() => setActiveTab('whiteboard')} className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'whiteboard' ? 'bg-primary text-white' : 'text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary'}`}><FileText className="w-5 h-5" /><span>Whiteboard</span></button>
    </div>
  );

  const ChatSection = () => {
    const [input, setInput] = useState('');
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-soft h-[400px] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div key={index} className="mb-4 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-700">
              <div className="flex items-center mb-2">
                <span className="font-semibold text-neutral-900 dark:text-white">{message.sender}</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 ml-2">{message.time}</span>
              </div>
              <p className="text-neutral-700 dark:text-neutral-300">{message.content}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex space-x-2">
          <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800" />
          <button onClick={() => { sendMessage(input); setInput(''); }} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">Send</button>
        </div>
      </div>
    );
  };

  const CodeSection = () => (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-soft h-[400px]">
      <MonacoEditor
        height="340px"
        defaultLanguage="javascript"
        value={code}
        onChange={handleCodeChange}
        theme="vs-dark"
        options={{ fontSize: 14, minimap: { enabled: false } }}
      />
    </div>
  );

  const WhiteboardSection = () => (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-soft h-[400px] flex flex-col items-center justify-center">
      <canvas ref={canvasRef} width={600} height={340} style={{ border: '1px solid #ccc', borderRadius: 8, background: '#fff', cursor: 'crosshair', maxWidth: '100%' }} onClick={handleCanvasDraw} />
      <div className="text-sm text-neutral-500 mt-2">Click to draw dots. (Demo)</div>
    </div>
  );

  if (!activeSession) {
    return (
      <div className="p-6">
        <SessionList />
        {isCreating && <CreateSessionModal />}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">CS Network: {activeSession.title}</h2>
        <button onClick={() => setActiveSession(null)} className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-white rounded-lg font-medium">Leave Session</button>
      </div>
      <CollaborationTabs />
      <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {activeTab === 'chat' && <ChatSection />}
        {activeTab === 'code' && <CodeSection />}
        {activeTab === 'whiteboard' && <WhiteboardSection />}
      </motion.div>
    </div>
  );
};

export default RealTimeCollaboration; 