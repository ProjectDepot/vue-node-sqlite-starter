<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { ApiResponse, TodoItem } from '~/types'

interface NewTodo {
	title: string
	description: string
}

const todos = ref<TodoItem[]>([])
const loading = ref(false)
const newTodo = ref<NewTodo>({ title: '', description: '' })

// Fetch todos from API
const fetchTodos = async () => {
	try {
		loading.value = true
		const response = await axios.get<ApiResponse<TodoItem[]>>('/api/todos')
		if (response.data.success) {
			todos.value = response.data.data || []
		}
	} catch (error) {
		console.error('Error fetching todos:', error)
	} finally {
		loading.value = false
	}
}

// Create new todo
const createTodo = async () => {
	if (!newTodo.value.title.trim()) return

	try {
		const response = await axios.post<ApiResponse<TodoItem>>('/api/todos', {
			title: newTodo.value.title.trim(),
			description: newTodo.value.description.trim() || undefined
		})

		if (response.data.success && response.data.data) {
			todos.value.unshift(response.data.data)
			newTodo.value = { title: '', description: '' }
		}
	} catch (error) {
		console.error('Error creating todo:', error)
	}
}

// Toggle todo completion
const toggleTodo = async (todo: TodoItem) => {
	try {
		const response = await axios.put<ApiResponse<TodoItem>>(`/api/todos/${todo.id}`, {
			completed: !todo.completed
		})

		if (response.data.success && response.data.data) {
			const index = todos.value.findIndex(t => t.id === todo.id)
			if (index !== -1) {
				todos.value[index] = response.data.data
			}
		}
	} catch (error) {
		console.error('Error updating todo:', error)
	}
}

// Delete todo
const deleteTodo = async (id: number) => {
	try {
		const response = await axios.delete<ApiResponse>(`/api/todos/${id}`)
		if (response.data.success) {
			todos.value = todos.value.filter(todo => todo.id !== id)
		}
	} catch (error) {
		console.error('Error deleting todo:', error)
	}
}

onMounted(() => {
	fetchTodos()
})
</script>
<template>
	<div class="max-w-4xl mx-auto">
		<div class="bg-white rounded-lg shadow-md p-6">
			<h2 class="text-2xl font-bold text-gray-900 mb-6">Todo List</h2>
			<!-- Create Todo Form -->
			<form @submit.prevent="createTodo" class="mb-8">
				<div class="flex gap-4">
					<div class="flex-1">
						<input v-model="newTodo.title" type="text" placeholder="Enter todo title..."
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							required />
					</div>
					<div class="flex-1">
						<input v-model="newTodo.description" type="text" placeholder="Enter description (optional)..."
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
					</div>
					<button type="submit"
						class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
						Add Todo </button>
				</div>
			</form>
			<!-- Loading State -->
			<div v-if="loading" class="text-center py-8">
				<div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
				<p class="mt-2 text-gray-600">Loading todos...</p>
			</div>
			<!-- Todo List -->
			<div v-else-if="todos.length === 0" class="text-center py-8">
				<p class="text-gray-500">No todos yet. Create your first todo!</p>
			</div>
			<div v-else class="space-y-4">
				<div v-for="todo in todos" :key="todo.id"
					class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-3">
							<input type="checkbox" :checked="todo.completed" @change="toggleTodo(todo)"
								class="h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
							<div>
								<h3 :class="{
									'text-lg font-medium': true,
									'line-through text-gray-500': todo.completed,
									'text-gray-900': !todo.completed
								}"> {{ todo.title }} </h3>
								<p v-if="todo.description" class="text-gray-600 text-sm"> {{ todo.description }} </p>
								<p class="text-xs text-gray-400 mt-1"> Created: {{ new Date(todo.createdAt).toLocaleDateString() }} </p>
							</div>
						</div>
						<button @click="deleteTodo(todo.id)" class="text-red-600 hover:text-red-800 p-1" title="Delete todo">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
								</path>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
