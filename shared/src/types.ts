// Shared types between client and server

export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

export interface TodoItem {
	id: number;
	title: string;
	description?: string;
	completed: boolean;
	createdAt: string;
	updatedAt: string;
}
