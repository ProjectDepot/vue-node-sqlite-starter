import Database from 'better-sqlite3';

let db: Database.Database | null = null;

export function getDb(): Database.Database {
	if (!db) {
		db = new Database('todos.db');

		// Create tables
		db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
	}
	return db;
}
