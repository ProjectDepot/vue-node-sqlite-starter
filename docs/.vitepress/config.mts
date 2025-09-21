import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	// Update this value to match where you're hosting your docs.
	// below would work for e.g. https://username.github.io/vue-node-sqlite-starter/
	base: '/vue-node-sqlite-starter/',

	title: 'Vue Node SQLite Starter',
	description: 'A modern Vue 3 + Node.js starter with TypeScript and SQLite',
	ignoreDeadLinks: [/^https?:\/\/localhost/],
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
				link: 'https://github.com/ProjectDepot/vue-node-sqlite-starter',
			},
		],

		footer: {
			message:
				'Released under the <a href="https://github.com/ProjectDepot/vue-node-sqlite-starter/blob/main/LICENSE">MIT License</a>.',
			copyright: 'Copyright © 2025-present parsehex',
		},
	},
});
