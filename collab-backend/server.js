const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

let sessions = [];

// REST: Create session
app.post('/sessions', (req, res) => {
  const session = { id: Date.now().toString(), ...req.body, participants: [] };
  sessions.push(session);
  res.json(session);
});

// REST: List sessions
app.get('/sessions', (req, res) => {
  res.json(sessions);
});

// REST: Join session
app.post('/sessions/:id/join', (req, res) => {
  const session = sessions.find(s => s.id === req.params.id);
  if (session) {
    session.participants.push(req.body.user);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
});

// WebSocket: Real-time events
io.on('connection', (socket) => {
  socket.on('join-session', ({ sessionId, user }) => {
    socket.join(sessionId);
    io.to(sessionId).emit('user-joined', user);
  });

  socket.on('chat-message', ({ sessionId, message }) => {
    io.to(sessionId).emit('chat-message', message);
  });

  socket.on('code-update', ({ sessionId, code }) => {
    socket.to(sessionId).emit('code-update', code);
  });

  socket.on('whiteboard-draw', ({ sessionId, data }) => {
    socket.to(sessionId).emit('whiteboard-draw', data);
  });

  socket.on('disconnect', () => {
    // handle user disconnect
  });
});

server.listen(4000, () => console.log('Collab backend running on port 4000')); 