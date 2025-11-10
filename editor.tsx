

// Since Konva is loaded from a CDN, we need to declare it to TypeScript
declare const Konva: any;

interface Layer {
    id: string;
    type: 'Text' | 'Image';
    konvaProps: any;
}

// --- STATE ---
let stage: any;
let konvaLayer: any;
let transformer: any;
let layers: Layer[] = [];
let selectedLayerId: string | null = null;

// --- INITIALIZATION ---

const initializeEditor = () => {
    renderEditorLayout();
    
    // Konva Setup
    const canvasContainer = document.getElementById('canvas-container');
    if (!canvasContainer) return;

    const containerWidth = canvasContainer.clientWidth;
    const containerHeight = canvasContainer.clientHeight;
    
    // YouTube thumbnail aspect ratio is 16:9
    const stageWidth = 1280;
    const stageHeight = 720;

    const scale = Math.min(containerWidth / stageWidth, containerHeight / stageHeight) * 0.9;

    stage = new Konva.Stage({
        container: 'konva-canvas',
        width: stageWidth,
        height: stageHeight,
        scaleX: scale,
        scaleY: scale,
    });
    
    // Adjust container to center the scaled stage
    const scaledWidth = stageWidth * scale;
    const scaledHeight = stageHeight * scale;
    const konvaEl = document.querySelector('.konvajs-content');
    if (konvaEl) {
        (konvaEl as HTMLElement).style.position = 'absolute';
        (konvaEl as HTMLElement).style.top = `${(containerHeight - scaledHeight) / 2}px`;
        (konvaEl as HTMLElement).style.left = `${(containerWidth - scaledWidth) / 2}px`;
    }


    konvaLayer = new Konva.Layer();
    stage.add(konvaLayer);

    // Add a background rectangle
    const background = new Konva.Rect({
        x: 0,
        y: 0,
        width: stage.width(),
        height: stage.height(),
        fill: '#1F2937',
        name: 'background',
    });
    konvaLayer.add(background);

    transformer = new Konva.Transformer({
        nodes: [],
        keepRatio: true,
        boundBoxFunc: (oldBox: any, newBox: any) => {
            if (newBox.width < 10 || newBox.height < 10) {
                return oldBox;
            }
            return newBox;
        },
    });
    konvaLayer.add(transformer);

    // Click on stage to deselect
    stage.on('click tap', (e: any) => {
        if (e.target === stage || e.target.name() === 'background') {
            setSelectedLayerId(null);
            rerenderPanels();
            return;
        }
    });

    rerenderAll();
    setupEventListeners();
};


// --- RENDER FUNCTIONS ---

const renderEditorLayout = () => {
    const root = document.getElementById('root');
    if (!root) return;
    root.innerHTML = `
        <div class="flex flex-col h-screen w-screen">
            <!-- Header -->
            <header class="bg-gray-900 border-b border-gray-700 px-4 py-2 flex items-center justify-between z-10 flex-shrink-0">
                <a href="index.html" class="flex items-center space-x-2">
                    <svg class="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h1 class="text-lg font-bold text-white">Thumbnail PRO</h1>
                </a>
                <div id="editor-actions" class="flex items-center space-x-4">
                    <a href="dashboard.html" class="text-gray-300 hover:text-white transition duration-300">
                        Sign In
                    </a>
                    <button id="export-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                        Export Thumbnail
                    </button>
                </div>
            </header>
            
            <!-- Main Editor Body -->
            <div class="flex flex-grow overflow-hidden">
                <!-- Left Panel (Tools & Layers) -->
                <aside class="w-72 bg-gray-900 flex-shrink-0 flex flex-col border-r border-gray-700">
                    <div class="p-4 border-b border-gray-700">
                        <h2 class="text-xl font-bold text-white mb-4">Tools</h2>
                        <div class="grid grid-cols-2 gap-2">
                            <button id="add-text-btn" class="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg flex flex-col items-center">
                                <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10m0 0h16M4 7h16M4 7a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v2a2 2 0 01-2 2m-6 4v6m-3-3h6"></path></svg>
                                <span>Text</span>
                            </button>
                            <label for="add-image-input" class="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg flex flex-col items-center cursor-pointer">
                                <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <span>Image</span>
                            </label>
                            <input type="file" id="add-image-input" class="hidden" accept="image/*">
                        </div>
                    </div>
                    <div class="flex-grow p-4 overflow-y-auto custom-scrollbar">
                        <h2 class="text-xl font-bold text-white mb-4">Layers</h2>
                        <div id="layers-panel"></div>
                    </div>
                </aside>

                <!-- Center Canvas -->
                <main id="canvas-container" class="flex-grow flex items-center justify-center bg-gray-800 relative">
                    <div id="konva-canvas"></div>
                </main>

                <!-- Right Panel (Properties) -->
                <aside class="w-80 bg-gray-900 flex-shrink-0 border-l border-gray-700 p-4 overflow-y-auto custom-scrollbar">
                    <h2 class="text-xl font-bold text-white mb-4">Properties</h2>
                    <div id="properties-panel"></div>
                </aside>
            </div>
        </div>
    `;
};

const renderLayersPanel = () => {
    const panel = document.getElementById('layers-panel');
    if (!panel) return;
    
    if (layers.length === 0) {
        panel.innerHTML = `<p class="text-gray-500 text-center">No layers yet.</p>`;
        return;
    }

    panel.innerHTML = [...layers].reverse().map((layer, index) => {
        const trueIndex = layers.length - 1 - index;
        const isSelected = layer.id === selectedLayerId;
        const content = layer.type === 'Text' ? layer.konvaProps.text : 'Image Layer';
        return `
            <div 
                class="layer-item flex items-center justify-between p-2 rounded-lg mb-2 cursor-pointer ${isSelected ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}"
                data-id="${layer.id}"
            >
                <span class="truncate flex-grow mr-2">${content}</span>
                <div class="flex items-center space-x-1">
                    <button class="move-layer-up-btn p-1 hover:bg-gray-500 rounded" data-index="${trueIndex}" ${trueIndex === layers.length - 1 ? 'disabled' : ''}>&uarr;</button>
                    <button class="move-layer-down-btn p-1 hover:bg-gray-500 rounded" data-index="${trueIndex}" ${trueIndex === 0 ? 'disabled' : ''}>&darr;</button>
                    <button class="delete-layer-btn p-1 text-red-400 hover:bg-red-500 hover:text-white rounded" data-id="${layer.id}">&times;</button>
                </div>
            </div>
        `;
    }).join('');
};


const renderPropertiesPanel = () => {
    const panel = document.getElementById('properties-panel');
    if (!panel) return;

    const layer = layers.find(l => l.id === selectedLayerId);

    if (!layer) {
        panel.innerHTML = `<p class="text-gray-500 text-center">Select a layer to edit its properties.</p>`;
        return;
    }

    const commonProps = `
        <div class="mb-2">
            <label class="block text-sm font-medium mb-1">Position (X, Y)</label>
            <div class="flex space-x-2">
                <input type="number" class="prop-input bg-gray-700 rounded p-1 w-full" data-prop="x" value="${Math.round(layer.konvaProps.x)}">
                <input type="number" class="prop-input bg-gray-700 rounded p-1 w-full" data-prop="y" value="${Math.round(layer.konvaProps.y)}">
            </div>
        </div>
        <div class="mb-2">
            <label class="block text-sm font-medium mb-1">Rotation</label>
            <input type="number" class="prop-input bg-gray-700 rounded p-1 w-full" data-prop="rotation" value="${Math.round(layer.konvaProps.rotation || 0)}">
        </div>
    `;

    let specificProps = '';
    if (layer.type === 'Text') {
        specificProps = `
            <div class="mb-2">
                <label class="block text-sm font-medium mb-1">Text Content</label>
                <textarea class="prop-input bg-gray-700 rounded p-1 w-full" data-prop="text" rows="3">${layer.konvaProps.text}</textarea>
            </div>
            <div class="mb-2">
                <label class="block text-sm font-medium mb-1">Font Size</label>
                <input type="number" class="prop-input bg-gray-700 rounded p-1 w-full" data-prop="fontSize" value="${layer.konvaProps.fontSize}">
            </div>
            <div class="mb-2">
                <label class="block text-sm font-medium mb-1">Fill Color</label>
                <input type="color" class="prop-input-color w-full h-8 p-0 border-none rounded cursor-pointer" data-prop="fill" value="${layer.konvaProps.fill}">
            </div>
        `;
    } else if (layer.type === 'Image') {
        specificProps = `
             <div class="mb-2">
                <label class="block text-sm font-medium mb-1">Opacity (0-1)</label>
                <input type="number" step="0.1" min="0" max="1" class="prop-input bg-gray-700 rounded p-1 w-full" data-prop="opacity" value="${layer.konvaProps.opacity ?? 1}">
            </div>
        `;
    }

    panel.innerHTML = commonProps + specificProps;
};

const renderCanvas = () => {
    if (!stage || !konvaLayer) return;
    
    // Clear everything except background
    konvaLayer.find(node => node.name() !== 'background').forEach((node:any) => node.destroy());
    
    // Re-add layers in order
    layers.forEach(layerData => {
        let node;
        if (layerData.type === 'Text') {
            node = new Konva.Text(layerData.konvaProps);
        } else if (layerData.type === 'Image') {
            const imageEl = new Image();
            imageEl.src = layerData.konvaProps.imageSrc; // Use a stored src
            imageEl.onload = () => {
                konvaLayer.batchDraw();
            };
            layerData.konvaProps.image = imageEl;
            node = new Konva.Image(layerData.konvaProps);
        }

        if (node) {
            node.id(layerData.id);
            konvaLayer.add(node);

            node.on('click tap', () => setSelectedLayerId(layerData.id));
            node.on('dragend', (e: any) => updateLayerProps(layerData.id, { x: e.target.x(), y: e.target.y() }));
            node.on('transformend', (e: any) => {
                updateLayerProps(layerData.id, {
                    x: e.target.x(),
                    y: e.target.y(),
                    scaleX: e.target.scaleX(),
                    scaleY: e.target.scaleY(),
                    rotation: e.target.rotation()
                });
            });
        }
    });

    updateTransformer();
    konvaLayer.batchDraw();
};

const rerenderPanels = () => {
    renderLayersPanel();
    renderPropertiesPanel();
}

const rerenderAll = () => {
    renderCanvas();
    rerenderPanels();
};

// --- STATE MUTATIONS & ACTIONS ---

const setSelectedLayerId = (id: string | null) => {
    selectedLayerId = id;
    updateTransformer();
    rerenderPanels();
};

const updateTransformer = () => {
    const selectedNode = stage.findOne(`#${selectedLayerId}`);
    if (selectedNode) {
        transformer.nodes([selectedNode]);
    } else {
        transformer.nodes([]);
    }
    konvaLayer.batchDraw();
};


const addLayer = (layer: Layer) => {
    layers.push(layer);
    setSelectedLayerId(layer.id);
    rerenderAll();
};

const updateLayerProps = (id: string, newProps: any) => {
    const layer = layers.find(l => l.id === id);
    if (layer) {
        layer.konvaProps = { ...layer.konvaProps, ...newProps };
        rerenderAll();
    }
};

const deleteLayer = (id: string) => {
    layers = layers.filter(l => l.id !== id);
    if (selectedLayerId === id) {
        setSelectedLayerId(null);
    }
    rerenderAll();
};

const moveLayer = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index + 1 : index - 1;
    if (newIndex < 0 || newIndex >= layers.length) return;
    
    [layers[index], layers[newIndex]] = [layers[newIndex], layers[index]]; // Swap
    rerenderAll();
};


// --- EVENT HANDLERS ---

const handleAddText = () => {
    addLayer({
        id: `text-${Date.now()}`,
        type: 'Text',
        konvaProps: {
            text: 'Double click to edit',
            x: 50,
            y: 50,
            fontSize: 48,
            fontFamily: 'Inter, sans-serif',
            fill: '#FFFFFF',
            draggable: true,
        }
    });
};

const handleAddImage = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
            const MAX_WIDTH = 400;
            const scale = MAX_WIDTH / img.width;
            addLayer({
                id: `image-${Date.now()}`,
                type: 'Image',
                konvaProps: {
                    x: 50,
                    y: 50,
                    imageSrc: reader.result as string, // Store base64 src
                    width: img.width * scale,
                    height: img.height * scale,
                    draggable: true,
                }
            });
        };
    };
    reader.readAsDataURL(file);
    (e.target as HTMLInputElement).value = ''; // Reset input
};

const handleExport = () => {
    transformer.nodes([]); // Hide transformer for export
    konvaLayer.batchDraw();

    const dataURL = stage.toDataURL({ pixelRatio: 2 }); // Higher res export

    transformer.nodes(stage.find(`#${selectedLayerId}`)); // Restore transformer
    konvaLayer.batchDraw();

    const link = document.createElement('a');
    link.download = 'thumbnail.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const setupEventListeners = () => {
    document.getElementById('add-text-btn')?.addEventListener('click', handleAddText);
    document.getElementById('add-image-input')?.addEventListener('change', handleAddImage);
    document.getElementById('export-btn')?.addEventListener('click', handleExport);
    
    // Event delegation for dynamic elements
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;

        // Layer selection
        const layerItem = target.closest('.layer-item');
        if (layerItem) {
            setSelectedLayerId(layerItem.getAttribute('data-id'));
        }

        // Delete layer
        const deleteBtn = target.closest('.delete-layer-btn');
        if (deleteBtn) {
            deleteLayer(deleteBtn.getAttribute('data-id')!);
        }

        // Move layer up
        const moveUpBtn = target.closest('.move-layer-up-btn');
        if (moveUpBtn) {
            moveLayer(parseInt(moveUpBtn.getAttribute('data-index')!), 'up');
        }

        // Move layer down
        const moveDownBtn = target.closest('.move-layer-down-btn');
        if (moveDownBtn) {
            moveLayer(parseInt(moveDownBtn.getAttribute('data-index')!), 'down');
        }
    });

    document.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        if (target.matches('.prop-input') || target.matches('.prop-input-color')) {
            if (!selectedLayerId) return;
            const prop = target.getAttribute('data-prop')!;
            const value = target.type === 'number' ? parseFloat(target.value) : target.value;
            updateLayerProps(selectedLayerId, { [prop]: value });
        }
    });
};

// --- START ---
document.addEventListener('DOMContentLoaded', initializeEditor);

export {};
