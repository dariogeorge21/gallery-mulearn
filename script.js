// Sample image data
const images = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        category: 'nature',
        caption: 'Misty Mountains'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
        category: 'city',
        caption: 'Modern Architecture'
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5',
        category: 'animals',
        caption: 'Wild Fox'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5',
        category: 'nature',
        caption: 'Autumn Forest'
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
        category: 'city',
        caption: 'City Lights'
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d',
        category: 'animals',
        caption: 'Mountain Lion'
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        category: 'nature',
        caption: 'Coastal Sunset'
    },
    {
        id: 8,
        src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390',
        category: 'city',
        caption: 'Urban Geometry'
    },
    {
        id: 9,
        src: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b',
        category: 'animals',
        caption: 'Arctic Wolf'
    },
    {
        id: 10,
        src: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7',
        category: 'nature',
        caption: 'Northern Lights'
    },
    {
        id: 11,
        src: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb',
        category: 'city',
        caption: 'Night City'
    },
    {
        id: 12,
        src: 'https://images.unsplash.com/photo-1549366021-9f761d450615',
        category: 'animals',
        caption: 'Bengal Tiger'
    },
    {
        id: 13,
        src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35',
        category: 'nature',
        caption: 'Desert Dunes'
    },
    {
        id: 14,
        src: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
        category: 'city',
        caption: 'City Skyline'
    },
    {
        id: 15,
        src: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44',
        category: 'animals',
        caption: 'Wild Elephant'
    }
];

// DOM Elements
const galleryContainer = document.getElementById('imageGallery');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.querySelector('.modal-caption');
const closeModal = document.querySelector('.close-modal');
const filterSelect = document.getElementById('filterSelect');
const brightnessSlider = document.getElementById('brightnessSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// State variables
let currentFilter = 'all';
let currentImageIndex = 0;
let filteredImages = [...images];

// Functions
function createGalleryItem(image) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
        <img src="${image.src}" alt="${image.caption}" loading="lazy">
        <div class="caption">${image.caption}</div>
    `;
    
    div.addEventListener('click', () => openModal(image));
    return div;
}

function renderGallery() {
    galleryContainer.innerHTML = '';
    filteredImages.forEach(image => {
        galleryContainer.appendChild(createGalleryItem(image));
    });
}

function openModal(image) {
    modalImage.src = image.src;
    modalCaption.textContent = image.caption;
    modal.style.display = 'block';
    currentImageIndex = filteredImages.findIndex(img => img.id === image.id);
}

function closeModalHandler() {
    modal.style.display = 'none';
}

function filterImages(category) {
    currentFilter = category;
    filteredImages = category === 'all' 
        ? [...images] 
        : images.filter(image => image.category === category);
    renderGallery();
}

function adjustBrightness(value) {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.style.filter = `brightness(${value}%)`;
    });
}

function navigateImages(direction) {
    if (filteredImages.length === 0) return;
    
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    } else {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    
    const image = filteredImages[currentImageIndex];
    openModal(image);
}

// Event Listeners
filterSelect.addEventListener('change', (e) => filterImages(e.target.value));

brightnessSlider.addEventListener('input', (e) => adjustBrightness(e.target.value));

closeModal.addEventListener('click', closeModalHandler);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalHandler();
});

prevBtn.addEventListener('click', () => navigateImages('prev'));
nextBtn.addEventListener('click', () => navigateImages('next'));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'ArrowLeft') navigateImages('prev');
        if (e.key === 'ArrowRight') navigateImages('next');
        if (e.key === 'Escape') closeModalHandler();
    }
});

// Initial render
renderGallery(); 
