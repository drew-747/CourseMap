import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = 'http://localhost:4000';
let socket = null;

export const createSession = async (sessionData) => {
  const res = await axios.post(`${API_URL}/sessions`, sessionData);
  return res.data;
};

export const listSessions = async () => {
  const res = await axios.get(`${API_URL}/sessions`);
  return res.data;
};

export const joinSession = async (sessionId, user) => {
  const res = await axios.post(`${API_URL}/sessions/${sessionId}/join`, { user });
  return res.data;
};

export const connectSocket = () => {
  if (!socket) {
    socket = io(API_URL);
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}; 