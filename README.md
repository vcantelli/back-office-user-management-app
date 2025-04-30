# Back Office User Management App

A React (Next.js) based user management dashboard built as part of a technical challenge.  
Focus was placed on **security**, **accessibility**, **performance**, and **modern architecture** over visual design.

🟢 **Live Demo**: https://back-office-user-management-app.vercel.app/

---

## 🚀 Features

- User authentication with mock API (Reqres)
- Secure session handling using cookies
- Dashboard with full CRUD, pagination and responsive layout
- Theme toggle (dark/light) with system preference and persistence
- Server Actions (Next.js App Router)
- Form validation with Zod
- Accessibility enhancements
- End-to-end tests with Cypress
- Production-ready Docker setup

---

## 🧪 Login Credentials

Since Reqres is a mock API, only specific credentials are accepted:

- **Login:**
  ```json
  {
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
  }
  ```

- **Register:** Must use the **same email and password** above

---

## ⚙️ Environment Variables

Create a `.env` file in the root and add:

```
REQRES_API_KEY=reqres-free-v1
```

---

## 🛠️ Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Set environment variable**

Create a `.env` file with the key above.

3. **Run in development**

```bash
npm run dev
```

4. **Build and run in production**

```bash
npm run build
npm run start
```

5. **Run Cypress tests**

```bash
npm run cy:open
```

6. **Run with Docker**

```bash
docker-compose build
docker-compose up
```

---

## 📦 Tech Stack

- React 19 + Next.js 15 (App Router)
- TypeScript
- Material UI
- Zod
- Cypress
- Docker

---

## 🧩 Development Process

I started the project by setting up ESLint, Prettier and absolute imports for a clean and maintainable codebase.

I prioritized:
- **Authentication flow** using Server Actions and cookies
- A reusable architecture (`actions/`, `lib/`, `types/`, `hooks/`)
- Centralized error handling and schema validation with Zod
- A11y support via proper labeling and focus management
- Performance enhancements (prefetching, skeletons, server redirects)
- Testability via `data-theme`, aria attributes and Cypress E2E coverage
- Docker support for easy deployment

The UI was intentionally kept simple — my focus was delivering a secure, accessible, and performant application under a realistic project structure.

---

## 💬 Feedback Welcome

I'm open to feedback, ideas for improvements, and discussions about potential enhancements or architectural changes.

Feel free to test the live version or review the code!

---
