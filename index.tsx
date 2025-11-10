

const root = document.getElementById('root');

if (root) {
  root.innerHTML = `
    <!-- Header -->
    <header class="container mx-auto px-6 py-4">
        <nav class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <svg class="h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h1 class="text-2xl font-bold text-white">Thumbnail PRO</h1>
            </div>
            <div class="hidden md:flex items-center space-x-8">
                <a href="templates.html" class="text-gray-300 hover:text-white transition duration-300">Templates</a>
                <a href="#features" class="text-gray-300 hover:text-white transition duration-300">Features</a>
                <a href="#gallery" class="text-gray-300 hover:text-white transition duration-300">Gallery</a>
            </div>
            <a href="dashboard.html" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                Sign In
            </a>
        </nav>
    </header>

    <!-- Main Content -->
    <main>
        <!-- Hero Section -->
        <section class="py-20 md:py-32">
            <div class="container mx-auto px-6 text-center">
                <h2 class="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                    Create Stunning Thumbnails
                    <span class="text-gradient bg-gradient-to-r from-blue-500 to-teal-400">in Minutes</span>
                </h2>
                <p class="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                    Our editor makes it effortless to design professional thumbnails with custom AI-generated graphics, attention-grabbing text, and one-click effects.
                </p>
                <a href="editor.html" class="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-lg py-4 px-10 rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
                    Start Creating for Free
                </a>
                <p class="text-gray-500 mt-4 text-sm">No sign-up required to start editing.</p>
            </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="py-20 bg-gray-800/50">
            <div class="container mx-auto px-6">
                <div class="text-center mb-12">
                    <h3 class="text-3xl md:text-4xl font-bold text-white">Powerful Features, Simple Interface</h3>
                    <p class="text-gray-400 mt-2">Everything you need to create click-worthy content.</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Feature Card 1 -->
                    <div class="bg-gray-800 p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600/20 text-blue-400 mb-6">
                            <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 16v-2m0-8v-2m0 16V4m6 8h2m-16 0h2m8 6h2m-16 0h2m14-6h-2m-8 0H4m12-6V4m-8 8H4" />
                            </svg>
                        </div>
                        <h4 class="text-xl font-bold text-white mb-2">AI Background Remover</h4>
                        <p class="text-gray-400">Instantly cut out subjects from any photo with a single click. Perfect for creating professional-looking overlays.</p>
                    </div>
                    <!-- Feature Card 2 -->
                    <div class="bg-gray-800 p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-teal-600/20 text-teal-400 mb-6">
                             <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                        </div>
                        <h4 class="text-xl font-bold text-white mb-2">Drag & Drop Editor</h4>
                        <p class="text-gray-400">An intuitive, layer-based canvas editor that feels powerful yet simple to use. No design experience needed.</p>
                    </div>
                    <!-- Feature Card 3 -->
                    <div class="bg-gray-800 p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600/20 text-indigo-400 mb-6">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
                        </div>
                        <h4 class="text-xl font-bold text-white mb-2">Pro Templates</h4>
                        <p class="text-gray-400">Kickstart your design with hundreds of professionally designed templates for gaming, vlogs, tech, tutorials, and more.</p>
                    </div>
                    <!-- Feature Card 4 -->
                    <div class="bg-gray-800 p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                        <div class="flex items-center justify-center h-16 w-16 rounded-full bg-pink-600/20 text-pink-400 mb-6">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 12l4.293 4.293a1 1 0 010 1.414L13 20m5-16l2.293 2.293a1 1 0 010 1.414L15 12l4.293 4.293a1 1 0 010 1.414L17 20"></path></svg>
                        </div>
                        <h4 class="text-xl font-bold text-white mb-2">AI Image Generator</h4>
                        <p class="text-gray-400">Describe any image you can imagine, and our AI will create it for you. Generate unique backgrounds, characters, and assets in seconds.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sample Thumbnails Gallery -->
        <section id="gallery" class="py-20">
            <div class="container mx-auto px-6">
                <div class="text-center mb-12">
                    <h3 class="text-3xl md:text-4xl font-bold text-white">Designs That Get Noticed</h3>
                    <p class="text-gray-400 mt-2">Explore what's possible with Thumbnail PRO.</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="group aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                        <img src="https://picsum.photos/seed/gaming/1280/720" alt="Sample gaming thumbnail" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="group aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                        <img src="https://picsum.photos/seed/tech/1280/720" alt="Sample tech review thumbnail" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="group aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                        <img src="https://picsum.photos/seed/vlog/1280/720" alt="Sample vlog thumbnail" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="group aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                        <img src="https://picsum.photos/seed/tutorial/1280/720" alt="Sample tutorial thumbnail" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="group aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                        <img src="https://picsum.photos/seed/business/1280/720" alt="Sample business thumbnail" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="group aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                        <img src="https://picsum.photos/seed/lifestyle/1280/720" alt="Sample lifestyle thumbnail" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800/50 border-t border-gray-700">
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
// FIX: Add export {} to treat this file as a module and prevent global scope issues.
export {};
