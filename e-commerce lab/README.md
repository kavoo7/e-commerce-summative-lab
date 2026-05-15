# E-Commerce Project Showcase

A modern, responsive e-commerce web application built with **React**, **Vite**, and **Tailwind CSS**. This project serves as a functional frontend showcasing dynamic client-side routing, advanced React state management (using Custom and Standard Hooks), and local storage data persistence. 

Key features include:
- **Dynamic Routing:** Seamless navigation between the Home, Products, Product Details, and Admin pages using `react-router-dom`.
- **Advanced State Management:** Custom hooks (`useProducts`) gracefully handle complex states, utilizing `useState` and `useEffect`. 
- **Full CRUD Capabilities:** Manage inventory from the Admin dashboard with robust Create, Read, Update, and Delete operations.
- **Light/Dark Mode:** Dynamic theme toggling matching the user's system preferences.

---

## 🚀 Setup & Installation

Follow these steps to get the project running locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the Repository
Clone the project to your local machine:
```bash
git clone <your-repository-url>
cd e-commerce-summative-lab/e-commerce\ lab
```

### 2. Install Dependencies
It's highly recommended to use `npm ci` (Clean Install) rather than `npm install`. This ensures you install the *exact* dependency versions required for this project (like Tailwind CSS v3) and prevents version mismatch errors among teammates.
```bash
npm ci
```

### 3. Start the Development Server
Run the local Vite development server:
```bash
npm run dev
```
---

## 🧪 Testing & Linting

This project uses **Vitest** and **React Testing Library** for automated testing, alongside **ESLint** for code quality.

- **Run all tests:**
  ```bash
  npm run test
  ```

---

##  Git & Branch Management

**Check your current branch:**
```bash
git status
```

**See all available branches (local and remote):**
```bash
git branch -a
```

**Switch to an existing branch** (e.g., to review the `resolving-errors` branch):
```bash
git checkout branch-name
```

**Pull the latest updates from a branch:**
If a teammate pushed a fix, you need to pull it into your local environment to see the changes:
```bash
git pull origin branch-name
```

**Create a new branch for your feature:**
```bash
git checkout -b your-new-feature-name
```
