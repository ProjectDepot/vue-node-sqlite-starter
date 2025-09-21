---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: Vue Node Starter
titleTemplate: A Modern Vue 3 + Node.js Starter

hero:
  name: 'Vue Node Starter'
  text: 'A modern Vue 3 + Node.js starter with TypeScript and SQLite'
  tagline: Get started building full-stack applications with modern tooling
  actions:
    - theme: brand
      text: Quick Start
      link: /#quick-start
    - theme: alt
      text: View on GitHub
      link: https://github.com/parsehex/vue-node-starter

features:
  - title: Vue 3 + TypeScript
    details: Built with Vue 3 Composition API and full TypeScript support for type safety
  - title: Node.js Backend
    details: Express.js server with SQLite database for a complete full-stack solution
  - title: Modern Tooling
    details: Vite + esbuild for fast development
---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/parsehex/vue-node-starter.git
cd vue-node-starter

# Install dependencies
npm install

# Start development servers
npm run dev
```

The application will be available at:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000

## Project Structure

```
vue-node-starter/
├── client/          # Vue 3 frontend
├── server/          # Node.js backend
├── shared/          # Shared types and utilities
├── docs/            # Documentation (VitePress)
└── package.json     # Root workspace configuration
```

## What's Included

- **Frontend**: Vue 3 with Composition API, TypeScript, Vite
- **Backend**: Express.js, TypeScript, SQLite database
