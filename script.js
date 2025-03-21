// Sample image data
const images = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        category: 'kids',
        caption: 'Kid with Silly Face'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce',
        category: 'animals',
        caption: 'Laughing Horse'
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194',
        category: 'animals',
        caption: 'Funny Cow Pose'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131',
        category: 'kids',
        caption: 'Baby Food Mess'
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1517849845537-4d257902454a',
        category: 'animals',
        caption: 'Dog with Sunglasses'
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9',
        category: 'animals',
        caption: 'Laughing Monkey'
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6',
        category: 'kids',
        caption: 'Playground Fail'
    },
    {
        id: 8,
        src: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f',
        category: 'fails',
        caption: 'Beach Splash Fail'
    },
    {
        id: 9,
        src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
        category: 'animals',
        caption: 'Playful Cat'
    },
    {
        id: 10,
        src: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8',
        category: 'kids',
        caption: 'Messy Ice Cream'
    },
    {
        id: 11,
        src: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb',
        category: 'animals',
        caption: 'Silly Duck Face'
    },
    {
        id: 12,
        src: 'https://images.unsplash.com/photo-1520808663317-647b476a81b9',
        category: 'fails',
        caption: 'Coffee Spill Moment'
    },
    {
        id: 13,
        src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
        category: 'animals',
        caption: 'Dancing Monkey'
    },
    {
        id: 14,
        src: 'https://images.unsplash.com/photo-1463852247062-1bbca38f7805',
        category: 'animals',
        caption: 'Monkey Making Faces'
    },
    {
        id: 15,
        src: 'https://images.unsplash.com/photo-1525253013412-55c1a69a5738',
        category: 'fails',
        caption: 'Cake Fail'
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
