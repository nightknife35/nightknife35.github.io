const woodworkItems = [
    { 
        id: 'walnut-box', 
        title: 'Walnut Jewelry Box', 
        image: 'images/img1.jpg', 
        price: '€89', 
        description: 'Handcrafted walnut box with dovetail joints and felt lining. Perfect for jewelry or small treasures.',
        category: 'boxes', 
        wood: 'Walnut', 
        size: '6x4x3"', 
        finish: 'Hand-rubbed oil' 
    },
    { 
        id: 'oak-owl', 
        title: 'Oak Owl Carving', 
        image: 'images/img2.jpg', 
        price: '€45', 
        description: 'Detailed hand-carved owl from solid oak, 8 inches tall. Each feather individually sculpted.',
        category: 'carvings', 
        wood: 'Oak', 
        size: '8" tall', 
        finish: 'Natural wax' 
    },
    { 
        id: 'cherry-ornament', 
        title: 'Cherry Tree Ornament', 
        image: 'images/img3.jpg', 
        price: '€29', 
        description: 'Holiday ornament with intricate branch details and hanger. Hangs beautifully on any tree.',
        category: 'ornaments', 
        wood: 'Cherry', 
        size: '3" diameter', 
        finish: 'Lacquer' 
    },
    { 
        id: 'mahogany-box', 
        title: 'Mahogany Keepsake Box', 
        image: 'images/img4.jpg', 
        price: '€149', 
        description: 'Luxury mahogany box with brass inlay and secret compartment. Heirloom quality.',
        category: 'boxes', 
        wood: 'Mahogany', 
        size: '8x5x4"', 
        finish: 'French polish' 
    },
    { 
        id: 'pine-bear', 
        title: 'Pine Bear Figure', 
        image: 'images/img5.jpg', 
        price: '€39', 
        description: 'Whimsical standing bear sculpture, perfect desk companion. Child-safe finish.',
        category: 'carvings', 
        wood: 'Pine', 
        size: '5" tall', 
        finish: 'Water-based polyurethane' 
    },
    { 
        id: 'maple-star', 
        title: 'Maple Star Ornament', 
        image: 'images/img6.jpg', 
        price: '€35', 
        description: '5-pointed star with wood-burned texture and gold leaf accents. Limited edition.',
        category: 'ornaments', 
        wood: 'Maple', 
        size: '4" wide', 
        finish: 'Gold leaf + wax' 
    }
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    const pageType = document.documentElement.getAttribute('data-page');
    const pathname = window.location.pathname.split('/').pop();
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    
    initTheme();
    initNavigation();
    
    if (pageType === 'gallery' || pathname === 'index.html') {
        initGallery();
    } else if (pageType === 'about' || pathname === 'about.html') {
        initAbout();
    } else if (pageType === 'product' || productId) {
        const itemId = productId || pathname.match(/product\.html/);
        initProductPage(productId);
    }
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;
    const toggleBtn = document.getElementById('theme-toggle');
    
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        toggleBtn.textContent = '☀️';
    }
    
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

function initNavigation() {
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath === 'index.html' && link.dataset.page === 'gallery')) {
            link.classList.add('active');
        }
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function initGallery() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = '<div class="gallery" id="gallery"></div>';
    createGallery();
    setupSidebarFilters();
    initCommonInteractions();
}

function initAbout() {
    document.getElementById('page-content').innerHTML = `
        <section class="about-section">
            <div class="container">
                <div class="about-grid">
                    <div class="about-text">
                        <h2>My Craft</h2>
                        <p>With over 15 years of woodworking experience, I specialize in creating small, intricate pieces that combine traditional joinery techniques with modern design sensibilities. Each piece is handcrafted in my workshop in Breda, Netherlands, using sustainably sourced hardwoods.</p>
                        
                        <h3>Materials I Love</h3>
                        <ul class="material-list">
                            <li>Walnut - Rich, dark grain with exceptional durability</li>
                            <li>Oak - Strong and versatile with beautiful ray fleck patterns</li>
                            <li>Cherry - Warm tones that deepen beautifully with age</li>
                            <li>Mahogany - Luxurious and timeless</li>
                        </ul>
                        
                        <h3>Process</h3>
                        <p>Every piece starts with rough lumber that I mill by hand. I use traditional hand tools for joinery and finishing, ensuring each item carries the marks of authentic craftsmanship. No two pieces are exactly alike.</p>
                    </div>
                    
                    <div class="about-stats">
                        <div class="stat-card">
                            <div class="stat-number">15+</div>
                            <div class="stat-label">Years Experience</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">500+</div>
                            <div class="stat-label">Pieces Created</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">100%</div>
                            <div class="stat-label">Handcrafted</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    document.getElementById('sidebar-title').textContent = 'Navigation';
    document.getElementById('filter-list').innerHTML = '<li><a href="index.html" class="nav-item">← Back to Gallery</a></li>';
    initCommonInteractions();
}

function initProductPage(productId) {
    const product = woodworkItems.find(item => item.id === productId);
    
    if (!product) {
        document.getElementById('page-content').innerHTML = `
            <div style="text-align: center; padding: 0px; color: var(--text-secondary);">
                <h1>Product Not Found</h1>
                <p>No product matches this URL. <a href="index.html" class="back-link">Return to Gallery</a></p>
            </div>
        `;
        return;
    }
    
    document.getElementById('hero-placeholder').src = product.image;
    document.getElementById('hero-title').textContent = product.title;
    document.title = `${product.title} - Small Woodwork Gallery`;
    
    document.getElementById('page-content').innerHTML = `
        <div class="product-content">
            <a href="index.html" class="back-link">← Back to Gallery</a>
            <img src="${product.image}" alt="${product.title}" class="product-main-image">
            <div class="product-details">
                <div>
                    <h1 class="product-title">${product.title}</h1>
                    <div class="product-category">${product.category.toUpperCase()}</div>
                    <div class="product-price">${product.price}</div>
                    <p class="product-description">${product.description}</p>
                </div>
                <div class="product-specs">
                    <h4>Specifications</h4>
                    <div class="spec-item"><span>Wood:</span><span>${product.wood}</span></div>
                    <div class="spec-item"><span>Size:</span><span>${product.size}</span></div>
                    <div class="spec-item"><span>Finish:</span><span>${product.finish}</span></div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('sidebar-title').textContent = 'Navigation';
    document.getElementById('filter-list').innerHTML = '<li><a href="index.html" class="nav-item">← Back to Gallery</a></li>';
    initCommonInteractions();
}

function createGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    
    woodworkItems.forEach((item) => {
        const div = document.createElement('div');
        div.className = `gallery-item ${item.category}`;
        div.innerHTML = `
            <a href="product.html?product=${item.id}" class="gallery-link">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-info">
                    <div class="gallery-title">${item.title}</div>
                    <div class="gallery-desc">${item.description}</div>
                </div>
            </a>
        `;
        gallery.appendChild(div);
    });
}

function setupSidebarFilters() {
    const filterList = document.getElementById('filter-list');
    filterList.innerHTML = `
        <li class="filter-item active" data-filter="all">All Items</li>
        <li class="filter-item" data-filter="boxes">Wooden Boxes</li>
        <li class="filter-item" data-filter="carvings">Carvings</li>
        <li class="filter-item" data-filter="ornaments">Ornaments</li>
    `;
    
    document.querySelectorAll('.filter-item').forEach(item => {
        item.addEventListener('click', function(e) {
            filterItems(this.dataset.filter);
        });
    });
}

function filterItems(filter) {
    currentFilter = filter;
    
    document.querySelectorAll('.filter-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);
        }
    });
    
    toggleSidebar();
}

function initCommonInteractions() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const closeSidebar = document.getElementById('close-sidebar');
    
    if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);
    if (closeSidebar) closeSidebar.addEventListener('click', toggleSidebar);
    
    // Overlay
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', toggleSidebar);
    }
}

function toggleTheme() {
    const body = document.body;
    const toggleBtn = document.getElementById('theme-toggle');
    
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        toggleBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        toggleBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const overlay = document.querySelector('.sidebar-overlay');
    
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('shifted');
    overlay.classList.toggle('active');
    sidebarToggle.classList.toggle('active');
}


