# Pinia + Vue.js Assignment

A Vue 3 + Vite application demonstrating Pinia state management, built for
the "Research & Practice Assignment: Pinia with Vue.js."

It contains one app shell with a sidebar, and six screens:

| # | Screen | Store | File |
|---|--------|-------|------|
| 1 | Counter | `useCounterStore` | `src/stores/counter.js` |
| 2 | User Profile | `useUserStore` | `src/stores/user.js` |
| 3 | Todo List | `useTodoStore` | `src/stores/todo.js` |
| 4 | Shopping Cart | `useCartStore` | `src/stores/cart.js` |
| 5 | Theme Switcher | `useThemeStore` | `src/stores/theme.js` |
| Bonus | Library Management System | `useBooksStore`, `useMembersStore`, `useLoansStore` | `src/stores/bonus/` |

## 1. Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`). Open it in
your browser — this is the screen to screenshot for "Running application."

To build a production bundle:

```bash
npm run build
npm run preview
```

## 2. Project structure

```
pinia-vue-project/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js              # createApp + app.use(createPinia())
│   ├── App.vue               # sidebar shell, switches between screens
│   ├── style.css             # design tokens + shared component classes
│   ├── stores/
│   │   ├── counter.js         # Exercise 1
│   │   ├── user.js            # Exercise 2
│   │   ├── todo.js            # Exercise 3
│   │   ├── cart.js            # Exercise 4
│   │   ├── theme.js           # Exercise 5
│   │   └── bonus/
│   │       ├── books.js       # Bonus — Library System
│   │       ├── members.js     # Bonus — Library System
│   │       └── loans.js       # Bonus — Library System (uses books.js)
│   └── components/
│       ├── CounterView.vue
│       ├── UserView.vue
│       ├── TodoView.vue
│       ├── CartView.vue
│       ├── ThemeView.vue
│       └── bonus/
│           ├── LibraryApp.vue
│           ├── BookCatalog.vue
│           ├── MemberDirectory.vue
│           └── LoanDesk.vue
```

## 3. What each exercise demonstrates

- **Counter** — the smallest possible store: one state field, one getter
  (`doubleCount`), three actions (`increment`, `decrement`, `reset`).
- **User Profile** — multiple state fields, one action per field, and a
  getter (`summary`) that combines them. Includes a controlled form.
- **Todo List** — array state, `addTodo` / `deleteTodo` / `toggleTodo`
  actions, and three getters (`completedTodos`, `pendingTodos`,
  `totalTodos`) that derive statistics from the same array.
- **Shopping Cart** — two related state arrays (`products`, `cart`),
  actions that look items up by id across them, and getters
  (`totalItems`, `totalPrice`) for the cart summary.
- **Theme Switcher** — one boolean and one action, toggled from a
  component and read by `App.vue` to add a `dark-mode` class to
  `<html>`, proving the same store instance is shared everywhere.
- **Bonus: Library Management System** — three independent stores
  (`books`, `members`, `loans`) used by three different components.
  `loans.js` imports and calls actions directly on `useBooksStore()`
  from inside its own action (`borrowBook` / `returnBook`), which is a
  common real-world pattern of stores composing with each other.

## 4. Suggested screenshots to capture for the submission

1. **Installation in the terminal** — `npm install` then `npm run dev`,
   showing the dependency tree and the Vite "ready" message with the
   local URL.
2. **Project folder structure** — the `src/` tree open in VS Code (or
   `tree src` in a terminal).
3. **Running application** — each of the six screens in the browser
   (Counter, User, Todo, Cart, Theme — light and dark — and the
   Library System).

## 5. Demo video checklist (3–5 minutes)

A good walkthrough covers:

1. Quick intro — what Pinia is and why this project uses it.
2. `main.js` — show `createPinia()` being registered.
3. One simple store (`counter.js`) — state, getter, actions.
4. One store with array state and multiple getters (`todo.js`).
5. The cart or library demo — show two/three stores being used
   together and an action on one store affecting another
   (`loans.js` calling `useBooksStore().decrementAvailable()`).
6. Live demo in the browser of at least 3 screens, including toggling
   dark mode to show shared global state.
