
// NOTE: We are using Firebase v9 modular SDK from a CDN.
// The import paths are URLs.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// --- Firebase Configuration ---
// IMPORTANT: Replace the placeholder values below with your actual Firebase project configuration.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// --- Initialize Firebase ---
let auth: any;
try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
} catch (e) {
    console.error("Firebase initialization error:", e);
    const root = document.getElementById('root');
    if (root) {
        root.innerHTML = `
            <div class="h-screen flex items-center justify-center text-center">
                <div>
                    <h1 class="text-2xl font-bold text-red-500 mb-4">Firebase Configuration Error</h1>
                    <p class="text-gray-400">Please replace the placeholder values in <strong>dashboard.tsx</strong> with your actual Firebase project configuration.</p>
                </div>
            </div>
        `;
    }
}


const root = document.getElementById('root');
const provider = new GoogleAuthProvider();

// --- Placeholder Data ---
const savedProjects = [
    { id: 'proj1', name: 'My Latest Gaming Thumbnail', imageUrl: 'https://picsum.photos/seed/project1/1280/720' },
    { id: 'proj2', name: 'Unboxing Video Thumbnail', imageUrl: 'https://picsum.photos/seed/project2/1280/720' },
    { id: 'proj3', name: 'React Tutorial Part 5', imageUrl: 'https://picsum.photos/seed/project3/1280/720' },
    { id: 'proj4', name: 'Travel Vlog - Japan Highlights', imageUrl: 'https://picsum.photos/seed/project4/1280/720' },
    { id: 'proj5', name: 'Top 5 AI Tools in 2024', imageUrl: 'https://picsum.photos/seed/project5/1280/720' },
    { id: 'proj6', name: 'My Morning Routine', imageUrl: 'https://picsum.photos/seed/project6/1280/720' },
];

// --- RENDER FUNCTIONS ---

const renderHeader = (user: User | null) => {
    const userActions = user
        ? `
            <div class="flex items-center space-x-4">
                <span class="text-gray-300">Welcome, ${user.displayName?.split(' ')[0]}</span>
                <img src="${user.photoURL}" alt="User Avatar" class="h-8 w-8 rounded-full">
                <button id="sign-out-btn" class="text-gray-300 hover:text-white transition duration-300">Sign Out</button>
            </div>
        `
        : `
            <a href="dashboard.html" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                Sign In
            </a>
        `;

    return `
      <header class="container mx-auto px-6 py-4">
          <nav class="flex items-center justify-between">
              <a href="index.html" class="flex items-center space-x-2">
                  <svg class="h-8 w-8 text-blue-500" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h1 class="text-2xl font-bold text-white">Thumbnail PRO</h1>
              </a>
              <div class="hidden md:flex items-center space-x-8">
                  <a href="templates.html" class="text-gray-300 hover:text-white transition duration-300">Templates</a>
                  <a href="index.html#features" class="text-gray-300 hover:text-white transition duration-300">Features</a>
              </div>
              ${userActions}
          </nav>
      </header>
    `;
};

const renderFooter = () => `
    <footer class="bg-gray-800/50 border-t border-gray-700">
        <div class="container mx-auto px-6 py-8">
            <div class="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
                &copy; 2024 AI Thumbnail Generator PRO. All rights reserved.
            </div>
        </div>
    </footer>
`;

const renderLoggedOutView = () => `
    <main class="flex-grow flex items-center justify-center text-center py-20 px-6">
        <div>
            <h2 class="text-4xl font-bold text-white mb-4">Welcome to Your Dashboard</h2>
            <p class="text-gray-400 text-lg mb-8">Sign in to save and manage your projects.</p>
            <button id="sign-in-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center mx-auto transition duration-300">
                <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                Sign In with Google
            </button>
        </div>
    </main>
`;

const renderLoggedInView = (user: User) => `
    <main class="container mx-auto px-6 py-12">
        <h2 class="text-3xl font-bold text-white mb-8">My Projects</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            ${savedProjects.map(project => `
                <div class="group bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                    <div class="relative aspect-w-16 aspect-h-9">
                        <img src="${project.imageUrl}" alt="${project.name}" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                    </div>
                    <div class="p-4 flex justify-between items-center">
                        <h4 class="text-lg font-semibold text-white truncate">${project.name}</h4>
                        <a href="editor.html?project=${project.id}" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                            Edit
                        </a>
                    </div>
                </div>
            `).join('')}
        </div>
    </main>
`;

const renderLoading = () => {
    if (root) {
        root.innerHTML = `<div class="h-screen flex items-center justify-center text-gray-500">Loading...</div>`;
    }
};

// --- Main Application Logic ---

const renderApp = (user: User | null) => {
    if (!root) return;
    
    const pageContent = user ? renderLoggedInView(user) : renderLoggedOutView();
    root.innerHTML = `
        <div class="flex flex-col min-h-screen">
            ${renderHeader(user)}
            ${pageContent}
            ${renderFooter()}
        </div>
    `;
    setupEventListeners(user);
};

const setupEventListeners = (user: User | null) => {
    if (user) {
        document.getElementById('sign-out-btn')?.addEventListener('click', () => {
            signOut(auth);
        });
    } else {
        document.getElementById('sign-in-btn')?.addEventListener('click', () => {
            signInWithPopup(auth, provider).catch(error => {
                console.error("Authentication Error:", error);
            });
        });
    }
};

// --- Entry Point ---
if (auth) {
    onAuthStateChanged(auth, (user) => {
        renderApp(user);
    });
    renderLoading();
}

export {};
