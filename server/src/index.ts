import express from 'express';
import cors from 'cors';
import { getDb } from './database.js';
import todoRoutes from './routes/todos.js';

console.log('Routes loaded successfully');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
getDb();

// Routes
app.use('/api/todos', todoRoutes);

// Health check
app.get('/api/health', (req, res) => {
	res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
