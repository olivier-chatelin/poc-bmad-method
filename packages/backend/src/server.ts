import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Create HTTP server from Express app (required for Socket.io)
const server = http.createServer(app);

// Initialize Socket.io with CORS matching Express CORS
const io = new SocketIOServer(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

// Health check endpoint (AC#4: returns { status: "ok" })
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Socket.io: Observability namespace (placeholder for Story 3.1)
const observabilityNamespace = io.of('/observability');

observabilityNamespace.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected to /observability: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected from /observability: ${socket.id}`);
  });
});

// Log configuration at startup (without secrets)
console.log('=== Backend Configuration ===');
console.log(`  PORT: ${PORT}`);
console.log(`  FRONTEND_URL: ${FRONTEND_URL}`);
console.log(`  OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? '***configured***' : 'NOT SET'}`);
console.log('=============================');

// Graceful shutdown handling (NFR17)
const gracefulShutdown = (signal: string) => {
  console.log(`\n${signal} received. Closing server gracefully...`);

  // Close Socket.io connections
  io.close(() => {
    console.log('Socket.io connections closed');
  });

  // Close HTTP server
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });

  // Force exit after 10s if graceful shutdown fails
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start server (use server.listen for Socket.io, not app.listen)
server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Socket.io: WebSocket server ready`);
});
