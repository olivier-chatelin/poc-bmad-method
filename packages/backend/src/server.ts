import express, { Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { loadConfig, type Config } from './config/index.js';
import { createConfigRouter } from './routes/config.routes.js';

// Load and validate configuration (Story 1.5)
const config: Config = loadConfig();

const app = express();

// Create HTTP server from Express app (required for Socket.io)
const server = http.createServer(app);

// Initialize Socket.io with CORS matching Express CORS
const io = new SocketIOServer(server, {
  cors: {
    origin: config.frontendUrl,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
}));
app.use(express.json());

// Routes
// Health check endpoint (AC#4: returns { status: "ok" })
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Configuration status endpoint (Story 1.5)
app.use('/api/config', createConfigRouter(config));

// Socket.io: Observability namespace (placeholder for Story 3.1)
const observabilityNamespace = io.of('/observability');

observabilityNamespace.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected to /observability: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected from /observability: ${socket.id}`);
  });
});

// Configuration logging is now handled by loadConfig() in config/env.ts

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
server.listen(config.port, () => {
  console.log(`Backend server running on http://localhost:${config.port}`);
  console.log(`Health check: http://localhost:${config.port}/api/health`);
  console.log(`Socket.io: WebSocket server ready`);
});
