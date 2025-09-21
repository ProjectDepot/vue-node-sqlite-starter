import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Vue Node Starter',
	description: 'A modern Vue 3 + Node.js starter with TypeScript and SQLite',
	ignoreDeadLinks: true,
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Installation', link: '/guide/installation' },
		],

		sidebar: [
			{
				text: 'Getting Started',
				items: [
					{ text: 'Quick Start', link: '/#quick-start' },
					{ text: 'Installation', link: '/guide/installation' },
				],
			},
		],

		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/parsehex/vue-node-starter',
			},
		],

		footer: {
			message:
				'Released under the <a href="https://github.com/parsehex/vue-node-starter/blob/main/LICENSE">MIT License</a>.',
			copyright: 'Copyright © 2025-present parsehex',
		},
	},
});
