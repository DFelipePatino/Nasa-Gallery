# 🚀 Cosmic Explorer - React NASA Gallery

**Cosmic Explorer** is a high-performance, interactive image gallery web application built with React. It leverages public NASA APIs to fetch and display stunning astronomy pictures, including the Astronomy Picture of the Day (APOD) and the extensive NASA Image and Video Library.

This project was built to showcase advanced React concepts, including complex state management, custom hooks, performant rendering of large datasets, and engaging UI animations.

---

## ✨ Features

- **Astronomy Picture of the Day (APOD) Integration**: Displays the latest breathtaking images from NASA's APOD endpoint out-of-the-box.
- **Advanced Search & Filtering**: 
  - Full-text search queries.
  - Date range filtering (Start Year to End Year).
  - Dynamic key-value filters (e.g., specific NASA centers or keywords).
- **Infinite Scrolling**: Scroll endlessly through the vast NASA library. New images are fetched automatically as you reach the bottom of the visible grid.
- **Virtualized Grid Rendering**: Efficiently renders large lists of images using `react-window` to maintain top-tier performance by only mounting items currently in the viewport.
- **Fluid Animations**: Smooth component mounting, layout transitions, and image hover effects powered by Framer Motion.
- **Dark & Light Mode**: A fully integrated global theme switch stored in your browser's local storage, applied through a custom `ThemeContext`.
- **Responsive Layout**: Adapts gracefully from mobile devices to ultrawide desktop monitors.
- **Glassmorphism UI**: A visually striking, modern design interface utilizing frosted-glass CSS aesthetics.

---

## 🛠️ Technologies Used

### Core Frameworks & Build Tools
- **[React 18](https://react.dev/)**: The core UI library used for component-based architecture.
- **[TypeScript](https://www.typescriptlang.org/)**: Ensures type safety across components, API responses, and global state.
- **[Vite](https://vitejs.dev/)**: A blazing-fast frontend build tool and development server.

### State & Lifecycle Management
- **Advanced Hooks**: Extensive use of `useState`, `useEffect`, `useReducer`, `useMemo`, and `useCallback` to manage filtering logic, pagination, and data ingestion.
- **Context API (`useContext`)**: Used to provide global accessibility to the application's visual Theme (Light/Dark).
- **Custom Hooks Strategy**: Decoupled UI logic from business logic entirely by abstracting fetch logic to `useNasaData` and search management to `useGalleryFilters`.

### Performance & UI Libraries
- **[react-window](https://github.com/bvaughn/react-window)**: Essential for rendering thousands of NASA images without crashing the browser DOM. Implemented via the `FixedSizeGrid` component, paired with native ResizeObserver logic to calculate grid dimensions dynamically.
- **[React.Suspense](https://react.dev/reference/react/Suspense)** & **`React.lazy`**: Modules like the search panel and grid are lazy-loaded to optimize the initial Time-To-Interactive (TTI).
- **[Framer Motion](https://www.framer.com/motion/)**: Handles entry animations, shared layout orchestrations, and interactive user feedback on cards.
- **[Lucide React](https://lucide.dev/)**: Scalable, clean SVG icons utilized throughout the interface.

---

## 🏗️ Getting Started (Local Development)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation

1. **Clone or download the repository:**
   Navigate to the project directory:
   ```bash
   cd nasa-gallery
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   To create an optimized production build:
   ```bash
   npm run build
   ```

---

## 📖 How to Use the App

### 1. Main Dashboard (Initial Load)
When you first load the Cosmic Explorer, the default behavior fetches a randomized batch of 20 high-quality images from the **APOD (Astronomy Picture of the Day)** endpoint, serving as a beautiful landing page.

### 2. General Search
- Start typing in the main "Search" input bar (e.g., "Mars Rover" or "Hubble").
- The text input is **debounced** behind the scenes. Once you stop typing for 500ms, the application automatically clears the APOD entries and searches the massive **NASA Image & Video Library**.

### 3. Date Filters
- You can restrict your search to specific historical eras by utilizing the start and end year numeric inputs next to the search bar. Both must be four-digit valid years.

### 4. Advanced Dynamic Filters
- Click the "+ Add" button in the Advanced Filters section to add specialized key-value restrictions.
- Example: 
  - Field: `center` | Value: `jpl` (Filters items exclusively published by the Jet Propulsion Laboratory).
  - Field: `photographer` | Value: `John Doe`

### 5. Infinite Scroll View
- Ensure you have a valid search that yields results. Keep scrolling down the page. As you reach the bottom, a loading spinner will briefly appear, and the next chunk of images will seamlessly load into the virtualized grid.

### 6. Theme Switching
- Click the moon/sun icon located on the top right-hand side of the header to permanently toggle your session between dark and light modes.

---

## 🧠 Architectural Highlights

If you're looking into the codebase, check out the `src/hooks` folder:

*   **`useNasaData.ts`**: The central data ingestion engine. It handles pagination states, error catching, and the complex logic of switching between APOD and the standard Image Library dynamically based on user query intent.
*   **`useGalleryFilters.ts`**: Utilizes a `useReducer` to manage complex, multi-field, dynamic filter states.
*   **`useElementSize.ts`**: A custom implementation using the browser's native `ResizeObserver` specifically built to feed reactive width/height calculations back into the `react-window` Grid components.
