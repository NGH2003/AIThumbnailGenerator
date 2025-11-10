

const root = document.getElementById('root');

// --- Template Data ---
// In a real application, this would likely come from a database or API.
const templates = [
    { id: 'gaming01', name: 'Pro Gamer Live Stream', category: 'Gaming', imageUrl: 'https://picsum.photos/seed/gaming1/1280/720' },
    { id: 'tech01', name: 'Latest Smartphone Review', category: 'Tech', imageUrl: 'https://picsum.photos/seed/tech1/1280/720' },
    { id: 'vlog01', name: 'My Trip to Tokyo', category: 'Vlog', imageUrl: 'https://picsum.photos/seed/vlog1/1280/720' },
    { id: 'tutorial01', name: 'Learn JavaScript in 1 Hour', category: 'Tutorials', imageUrl: 'https://picsum.photos/seed/tutorial1/1280/720' },
    { id: 'business01', name: 'Q4 Earnings Report', category: 'Business', imageUrl: 'https://picsum.photos/seed/business1/1280/720' },
    { id: 'gaming02', name: 'Fortnite Victory Royale', category: 'Gaming', imageUrl: 'https://picsum.photos/seed/gaming2/1280/720' },
    { id: 'tech02', name: 'Top 5 Laptops of the Year', category: 'Tech', imageUrl: 'https://picsum.photos/seed/tech2/1280/720' },
    { id: 'gaming03', name: 'Minecraft Survival Guide', category: 'Gaming', imageUrl: 'https://picsum.photos/seed/gaming3/1280/720' },
    { id: 'vlog02', name: 'A Day in My Life', category: 'Vlog', imageUrl: 'https://picsum.photos/seed/vlog2/1280/720' },
    { id: 'tutorial02', name: 'Photoshop for Beginners', category: 'Tutorials', imageUrl: 'https://picsum.photos/seed/tutorial2/1280/720' },
    { id: 'tech03', name: 'Unboxing the New AI Gadget', category: 'Tech', imageUrl: 'https://picsum.photos/seed/tech3/1280/720' },
    { id: 'business02', name: 'Marketing Strategy 101', category: 'Business', imageUrl: 'https://picsum.photos/seed/business2/1280/720' },
];

const renderPage = () => {
  if (root) {
    root.innerHTML = `
      <!-- Header -->
      <header class="container mx-auto px-6 py-4">
          <nav class="flex items-center justify-between">
              <a href="index.html" class="flex items-center space-x-2">
                  <svg class="h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h1 class="text-2xl font-bold text-white">Thumbnail PRO</h1>
              </a>
              <div class="hidden md:flex items-center space-x-8">
                  <a href="templates.html" class="text-white font-semibold border-b-2 border-blue-500">Templates</a>
                  <a href="index.html#features" class="text-gray-300 hover:text-white transition duration-300">Features</a>
                  <a href="index.html#gallery" class="text-gray-300 hover:text-white transition duration-300">Gallery</a>
              </div>
              <a href="dashboard.html" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                  Sign In
              </a>
          </nav>
      </header>

      <!-- Main Content -->
      <main class="container mx-auto px-6 py-12">
          <!-- Page Header -->
          <div class="text-center mb-12">
              <h2 class="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                  Kickstart Your Design
              </h2>
              <p class="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                  Choose a professionally designed template for any niche. Click to start editing instantly.
              </p>
          </div>

          <!-- Filter Navigation -->
          <div id="filter-container" class="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
              <button class="filter-btn active font-semibold py-2 px-5 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors" data-category="All">All</button>
              <button class="filter-btn font-semibold py-2 px-5 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors" data-category="Gaming">Gaming</button>
              <button class="filter-btn font-semibold py-2 px-5 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors" data-category="Tech">Tech</button>
              <button class="filter-btn font-semibold py-2 px-5 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors" data-category="Vlog">Vlog</button>
              <button class="filter-btn font-semibold py-2 px-5 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors" data-category="Tutorials">Tutorials</button>
              <button class="filter-btn font-semibold py-2 px-5 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors" data-category="Business">Business</button>
          </div>

          <!-- Templates Grid -->
          <div id="templates-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <!-- Templates will be injected here by JavaScript -->
          </div>
      </main>

      <!-- Footer -->
      <footer class="bg-gray-800/50 border-t border-gray-700 mt-20">
          <div class="container mx-auto px-6 py-8">
              <div class="flex flex-col md:flex-row justify-between items-center">
                  <div class="flex items-center space-x-2 mb-4 md:mb-0">
                       <svg class="h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <h1 class="text-xl font-bold text-white">Thumbnail PRO</h1>
                  </div>
                  <div class="flex space-x-6 text-gray-400">
                      <a href="templates.html" class="hover:text-white transition-colors">Templates</a>
                      <a href="editor.html" class="hover:text-white transition-colors">Editor</a>
                      <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
                      <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
                  </div>
              </div>
              <div class="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
                  &copy; 2024 AI Thumbnail Generator PRO. All rights reserved.
              </div>
          </div>
      </footer>
    `;
  }
};

const renderTemplates = (category = 'All') => {
  const grid = document.getElementById('templates-grid');
  if (!grid) return;

  const filteredTemplates = category === 'All'
    ? templates
    : templates.filter(template => template.category === category);

  if (filteredTemplates.length === 0) {
      grid.innerHTML = `<p class="text-gray-400 col-span-full text-center">No templates found in this category.</p>`;
      return;
  }

  grid.innerHTML = filteredTemplates.map(template => `
    <a href="editor.html?template=${template.id}" class="group block rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
        <div class="relative aspect-w-16 aspect-h-9">
            <img src="${template.imageUrl}" alt="${template.name}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span class="bg-blue-600 text-white font-bold py-2 px-5 rounded-full">Use Template</span>
            </div>
        </div>
        <div class="p-4 bg-gray-800">
            <h4 class="text-lg font-semibold text-white truncate">${template.name}</h4>
            <p class="text-sm text-gray-400">${template.category}</p>
        </div>
    </a>
  `).join('');
};


const setupEventListeners = () => {
    const filterContainer = document.getElementById('filter-container');
    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.matches('.filter-btn')) {
                // Update active button style
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                target.classList.add('active');
                
                // Render templates for the selected category
                const category = target.dataset.category;
                renderTemplates(category);
            }
        });
    }
};


// --- Initial Load ---
renderPage();
renderTemplates(); // Initial render with all templates
setupEventListeners();
// FIX: Add export {} to treat this file as a module and prevent global scope issues.
export {};
