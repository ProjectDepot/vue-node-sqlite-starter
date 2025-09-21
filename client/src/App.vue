<script setup lang="ts">
import TodoList from './components/TodoList.vue'
</script>
<template>
	<div class="min-h-screen bg-gray-50">
		<header class="bg-white shadow">
			<div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				<h1 class="text-3xl font-bold text-gray-900"> Vue Node Starter </h1>
				<p class="mt-2 text-gray-600"> A demo app with Vue 3, Node.js, TypeScript, and SQLite </p>
			</div>
		</header>
		<main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<TodoList />
		</main>
	</div>
</template>
