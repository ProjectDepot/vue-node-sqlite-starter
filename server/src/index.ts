import express from 'express';
import cors from 'cors';
import path from 'path';
import { getDb } from './database.js';
import todoRoutes from './routes/todos.js';

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from client build (relative to /server/)
app.use(express.static(path.join(path.dirname('.'), '../dist/client')));

// Initialize database
getDb();

// API Routes
app.use('/api/todos', todoRoutes);
app.get('/api/health', (req, res) => {
	res.json({ status: 'OK', message: 'Server is running' });
});

// SPA fallback - serve index.html for non-API routes
app.get(/(.*)/, (req, res) => {
	if (!req.path.startsWith('/api')) {
		res.sendFile(path.join(__dirname, '../client/index.html'));
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
