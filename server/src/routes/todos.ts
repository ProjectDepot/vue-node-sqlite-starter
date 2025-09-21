import { Router, Request, Response } from 'express';
import { getDb } from '../database.js';
import { ApiResponse, TodoItem } from '~/types';

const db = getDb();

function getAllTodos(req: Request, res: Response<ApiResponse<TodoItem[]>>) {
	try {
		const todos = db
			.prepare('SELECT * FROM todos ORDER BY created_at DESC')
			.all() as TodoItem[];
		res.json({
			success: true,
			data: todos,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Failed to fetch todos: ' + error,
		});
	}
}

function getTodoById(
	req: Request<{ id: string }>,
	res: Response<ApiResponse<TodoItem>>
) {
	try {
		const id = parseInt(req.params.id);
		const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id) as
			| TodoItem
			| undefined;

		if (!todo) {
			return res.status(404).json({
				success: false,
				error: 'Todo not found',
			});
		}

		res.json({
			success: true,
			data: todo,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Failed to fetch todo: ' + error,
		});
	}
}

function createTodo(
	req: Request<{}, {}, { title: string; description?: string }>,
	res: Response<ApiResponse<TodoItem>>
) {
	try {
		const { title, description } = req.body;

		if (!title) {
			return res.status(400).json({
				success: false,
				error: 'Title is required',
			});
		}

		const stmt = db.prepare(`
      INSERT INTO todos (title, description, completed, created_at, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

		const result = stmt.run(title, description || '', 0);
		const todo = db
			.prepare('SELECT * FROM todos WHERE id = ?')
			.get(result.lastInsertRowid) as TodoItem;

		res.status(201).json({
			success: true,
			data: todo,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			error: 'Failed to create todo: ' + error,
		});
	}
}

function updateTodo(
	req: Request<
		{ id: string },
		{},
		{ title?: string; description?: string; completed?: boolean }
	>,
	res: Response<ApiResponse<TodoItem>>
) {
	try {
		const id = parseInt(req.params.id);
		const { title, description, completed } = req.body;

		// Check if todo exists
		const existingTodo = db
			.prepare('SELECT * FROM todos WHERE id = ?')
			.get(id) as TodoItem | undefined;
		if (!existingTodo) {
			return res.status(404).json({
				success: false,
				error: 'Todo not found',
			});
		}

		// Build update query dynamically
		const updates: string[] = [];
		const values: any[] = [];

		if (title !== undefined) {
			updates.push('title = ?');
			values.push(title);
		}
		if (description !== undefined) {
			updates.push('description = ?');
			values.push(description);
		}
		if (completed !== undefined) {
			updates.push('completed = ?');
			values.push(completed);
		}

		if (updates.length > 0) {
			updates.push('updated_at = CURRENT_TIMESTAMP');
			values.push(id);

			const stmt = db.prepare(
				`UPDATE todos SET ${updates.join(', ')} WHERE id = ?`
			);
			stmt.run(...values);
		}

		const updatedTodo = db
			.prepare('SELECT * FROM todos WHERE id = ?')
			.get(id) as TodoItem;

		res.json({
			success: true,
			data: updatedTodo,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Failed to update todo: ' + error,
		});
	}
}

function deleteTodo(req: Request<{ id: string }>, res: Response<ApiResponse>) {
	try {
		const id = parseInt(req.params.id);

		const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
		const result = stmt.run(id);

		if (result.changes === 0) {
			return res.status(404).json({
				success: false,
				error: 'Todo not found',
			});
		}

		res.json({
			success: true,
			message: 'Todo deleted successfully',
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Failed to delete todo: ' + error,
		});
	}
}

// /api/todos
const router = Router();

router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
