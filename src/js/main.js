/**
 * Altura Inmobiliaria - Portal Funcional
 * Main JavaScript
 */

// ===== PROPERTY DATA =====
const propertiesData = [
  {
    id: 1,
    title: "Villa de Lujo en Punta Cana",
    price: 850000,
    priceType: "venta",
    image: "./img/Villa Punta Cana.jpg",
    images: [
      "./img/Villa Punta Cana.jpg",
      "./img/¡Elegancia Natural en Jarabacoa! Villa de Lujo con Piscina Infinity.jpg",
      "./img/ESPECTACULAR VILLA DE 3 NIVELES EN JARABACOA.jpg"
    ],
    location: "Punta Cana, La Altagracia",
    locationKey: "punta cana",
    area: 450,
    bedrooms: 5,
    bathrooms: 4,
    parking: 2,
    type: "villa",
    status: "inmediata",
    category: "compra nuevo",
    description: "Espectacular villa de lujo con acabados de primera calidad, piscina privada y amplios jardines. Ubicada en una de las zonas más exclusivas de Punta Cana, esta propiedad ofrece privacidad y comodidad en un entorno paradisíaco.",
    deliveryDate: "Inmediata",
    expenses: {
      "Administración": "$150 USD/mes",
      "Impuestos": "$2,500 USD/año",
      "Seguro": "$800 USD/año"
    }
  },
  {
    id: 2,
    title: "Villa con Piscina Infinity en Jarabacoa",
    price: 1200,
    priceType: "alquiler",
    image: "./img/¡Elegancia Natural en Jarabacoa! Villa de Lujo con Piscina Infinity.jpg",
    images: [
      "./img/¡Elegancia Natural en Jarabacoa! Villa de Lujo con Piscina Infinity.jpg",
      "./img/ESPECTACULAR VILLA DE 3 NIVELES EN JARABACOA.jpg",
      "./img/Villa Punta Cana.jpg"
    ],
    location: "Jarabacoa, La Vega",
    locationKey: "jarabacoa",
    area: 120,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    type: "villa",
    status: "construccion",
    category: "arriendo",
    description: "Hermosa villa con piscina infinity y vistas panorámicas a las montañas. Perfecta para disfrutar de la naturaleza y el clima fresco de Jarabacoa.",
    deliveryDate: "Diciembre 2026",
    expenses: {
      "Administración": "Incluida",
      "Impuestos": "A cargo del propietario",
      "Seguro": "Incluido"
    }
  },
  {
    id: 3,
    title: "Apartamento Vista al Mar - La Esperilla",
    price: 320000,
    priceType: "venta",
    image: "./img/Casa Jarabacoa.jpg",
    location: "La Esperilla, Santo Domingo",
    locationKey: "santo domingo",
    area: 280,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    type: "apartamento",
    status: "planos",
    category: "compra nuevo"
  },
  {
    id: 4,
    title: "Espectacular Villa de 3 Niveles",
    price: 1500000,
    priceType: "venta",
    image: "./img/ESPECTACULAR VILLA DE 3 NIVELES EN JARABACOA.jpg",
    location: "Jarabacoa, La Vega",
    locationKey: "jarabacoa",
    area: 700,
    bedrooms: 6,
    bathrooms: 6,
    parking: 4,
    type: "villa",
    status: "inmediata",
    category: "compra nuevo"
  },
  {
    id: 5,
    title: "Apartamento Moderno en Piantini",
    price: 950,
    priceType: "alquiler",
    image: "./img/Apartamento Moderno en Santo Domingo (2).jpg",
    location: "Piantini, Santo Domingo",
    locationKey: "santo domingo",
    area: 100,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    type: "apartamento",
    status: "construccion",
    category: "arriendo"
  },
  {
    id: 6,
    title: "Apartamentos en Prado Oriental",
    price: 120000,
    priceType: "venta",
    image: "./img/Apartamentos en Prado Oriental, San Isidro.jpg",
    location: "San Isidro, Santo Domingo Este",
    locationKey: "santo domingo",
    area: 110,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    type: "apartamento",
    status: "planos",
    category: "compra nuevo"
  },
  {
    id: 7,
    title: "Penthouse de Lujo en Naco",
    price: 485000,
    priceType: "venta",
    image: "./img/Apartamento Moderno en Santo Domingo.jpg",
    location: "Naco, Santo Domingo",
    locationKey: "santo domingo",
    area: 220,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    type: "penthouse",
    status: "inmediata",
    category: "compra nuevo"
  },
  {
    id: 8,
    title: "Casa Moderna en Las Terrenas",
    price: 275000,
    priceType: "venta",
    image: "./img/bv.jpg",
    location: "Las Terrenas, Samaná",
    locationKey: "samaná",
    area: 180,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    type: "casa",
    status: "construccion",
    category: "compra nuevo"
  },
  {
    id: 9,
    title: "Proyecto Residencial Los Prados",
    price: 95000,
    priceType: "venta",
    image: "./img/kkmn.jpg",
    location: "Los Prados, Santo Domingo",
    locationKey: "santo domingo",
    area: 85,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    type: "apartamento",
    status: "planos",
    category: "compra nuevo"
  }
];

// ===== STATE =====
let currentFilters = {
  search: '',
  category: 'compra nuevo',
  types: [],
  bedrooms: null,
  bathrooms: null,
  priceMin: null,
  priceMax: null,
  areaMin: null,
  areaMax: null,
  locations: []
};

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentPage = 1;
const itemsPerPage = 9;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  renderProperties();
  updateFavoritesCount();
  initializeEventListeners();
  initializeSmoothScroll();
  initializeContactForm();
  console.log('Altura Inmobiliaria - Portal Ready');
}

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
  // Sidebar
  const filtersBtn = document.getElementById('filters-btn');
  const mobileFilterBtn = document.getElementById('mobile-filter-btn');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarClose = document.getElementById('sidebar-close');

  filtersBtn?.addEventListener('click', () => {
    sidebar?.classList.add('open');
    sidebarOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  mobileFilterBtn?.addEventListener('click', () => {
    sidebar?.classList.add('open');
    sidebarOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  sidebarClose?.addEventListener('click', () => {
    sidebar?.classList.remove('open');
    sidebarOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  });

  sidebarOverlay?.addEventListener('click', () => {
    sidebar?.classList.remove('open');
    sidebarOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Search
  const searchInput = document.getElementById('search-input');
  searchInput?.addEventListener('input', debounce((e) => {
    currentFilters.search = e.target.value.toLowerCase();
    currentPage = 1;
    renderProperties();
  }, 300));

  // Sort
  const sortSelect = document.getElementById('sort-select');
  sortSelect?.addEventListener('change', () => {
    currentPage = 1;
    renderProperties();
  });

  // Filter Chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', handleFilterChipClick);
  });

  // Filter Inputs
  const priceMin = document.getElementById('filter-price-min');
  const priceMax = document.getElementById('filter-price-max');
  const areaMin = document.getElementById('filter-area-min');
  const areaMax = document.getElementById('filter-area-max');

  priceMin?.addEventListener('input', debounce(() => {
    currentFilters.priceMin = parseInt(priceMin.value) || null;
    currentPage = 1;
    renderProperties();
  }, 500));

  priceMax?.addEventListener('input', debounce(() => {
    currentFilters.priceMax = parseInt(priceMax.value) || null;
    currentPage = 1;
    renderProperties();
  }, 500));

  areaMin?.addEventListener('input', debounce(() => {
    currentFilters.areaMin = parseInt(areaMin.value) || null;
    currentPage = 1;
    renderProperties();
  }, 500));

  areaMax?.addEventListener('input', debounce(() => {
    currentFilters.areaMax = parseInt(areaMax.value) || null;
    currentPage = 1;
    renderProperties();
  }, 500));

  // Filter Buttons
  const btnClear = document.querySelector('.btn-clear');
  const btnApply = document.querySelector('.btn-apply');

  btnClear?.addEventListener('click', clearAllFilters);
  btnApply?.addEventListener('click', () => {
    if (window.innerWidth < 1024) {
      sidebar?.classList.remove('open');
      sidebarOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    }
    showToast('Filtros aplicados');
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (sidebar?.classList.contains('open')) {
        sidebar.classList.remove('open');
        sidebarOverlay?.classList.remove('active');
        document.body.style.overflow = '';
      }
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });
}

// ===== FILTER CHIPS =====
function handleFilterChipClick(e) {
  const chip = e.target.closest('.filter-chip');
  if (!chip) return;

  const section = chip.closest('.filter-section');
  const filterTitle = section?.querySelector('.filter-title')?.textContent;

  if (filterTitle?.includes('Categoría')) {
    document.querySelectorAll('[data-filter="category"] .filter-chip, .filter-section:has(.filter-title:contains("Categoría")) .filter-chip').forEach(c => {
      c.classList.remove('active');
    });
    chip.classList.add('active');
    const categoryMap = {
      'compra nuevo': 'compra nuevo',
      'compra usado': 'compra usado',
      'arriendo': 'arriendo'
    };
    const text = chip.textContent.trim().toLowerCase();
    currentFilters.category = categoryMap[text] || 'compra nuevo';
  } else if (filterTitle?.includes('Tipo')) {
    chip.classList.toggle('active');
    const activeTypes = Array.from(section.querySelectorAll('.filter-chip.active'))
      .map(c => c.textContent.trim().toLowerCase());
    currentFilters.types = activeTypes;
  } else if (filterTitle?.includes('Habitaciones')) {
    section.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const beds = chip.textContent.trim();
    currentFilters.bedrooms = beds === '5+' ? '5' : beds;
  } else if (filterTitle?.includes('Baños')) {
    section.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const baths = chip.textContent.trim();
    currentFilters.bathrooms = baths === '4+' ? '4' : baths;
  } else if (filterTitle?.includes('Ubicación')) {
    chip.classList.toggle('active');
    const activeLocations = Array.from(section.querySelectorAll('.filter-chip.active'))
      .map(c => c.textContent.trim().toLowerCase());
    currentFilters.locations = activeLocations;
  }

  currentPage = 1;
  renderProperties();
}

// ===== CLEAR FILTERS =====
function clearAllFilters() {
  currentFilters = {
    search: '',
    category: 'compra nuevo',
    types: [],
    bedrooms: null,
    bathrooms: null,
    priceMin: null,
    priceMax: null,
    areaMin: null,
    areaMax: null,
    locations: []
  };

  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.remove('active');
  });
  document.querySelectorAll('.filter-chip')[0]?.classList.add('active');
  
  document.querySelectorAll('.filter-field').forEach(field => {
    field.value = '';
  });

  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  currentPage = 1;
  renderProperties();
  showToast('Filtros limpiados');
}

// ===== FILTER PROPERTIES =====
function filterProperties() {
  let filtered = [...propertiesData];

  // Search
  if (currentFilters.search) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(currentFilters.search) ||
      p.location.toLowerCase().includes(currentFilters.search)
    );
  }

  // Category
  if (currentFilters.category) {
    if (currentFilters.category === 'compra nuevo' || currentFilters.category === 'compra usado') {
      filtered = filtered.filter(p => p.priceType === 'venta');
    } else if (currentFilters.category === 'arriendo') {
      filtered = filtered.filter(p => p.priceType === 'alquiler');
    }
  }

  // Type
  if (currentFilters.types.length > 0) {
    filtered = filtered.filter(p => currentFilters.types.includes(p.type));
  }

  // Bedrooms
  if (currentFilters.bedrooms) {
    const beds = parseInt(currentFilters.bedrooms);
    if (currentFilters.bedrooms === '5') {
      filtered = filtered.filter(p => p.bedrooms >= 5);
    } else {
      filtered = filtered.filter(p => p.bedrooms === beds);
    }
  }

  // Bathrooms
  if (currentFilters.bathrooms) {
    const baths = parseInt(currentFilters.bathrooms);
    if (currentFilters.bathrooms === '4') {
      filtered = filtered.filter(p => p.bathrooms >= 4);
    } else {
      filtered = filtered.filter(p => p.bathrooms === baths);
    }
  }

  // Price
  if (currentFilters.priceMin) {
    filtered = filtered.filter(p => p.price >= currentFilters.priceMin);
  }
  if (currentFilters.priceMax) {
    filtered = filtered.filter(p => p.price <= currentFilters.priceMax);
  }

  // Area
  if (currentFilters.areaMin) {
    filtered = filtered.filter(p => p.area >= currentFilters.areaMin);
  }
  if (currentFilters.areaMax) {
    filtered = filtered.filter(p => p.area <= currentFilters.areaMax);
  }

  // Location
  if (currentFilters.locations && currentFilters.locations.length > 0) {
    filtered = filtered.filter(p => currentFilters.locations.includes(p.locationKey));
  }

  // Sort
  const sortSelect = document.getElementById('sort-select');
  const sortValue = sortSelect?.value;
  if (sortValue) {
    switch (sortValue) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'area':
        filtered.sort((a, b) => b.area - a.area);
        break;
    }
  }

  return filtered;
}

// ===== RENDER PROPERTIES =====
function renderProperties() {
  const filtered = filterProperties();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Update count
  const resultsCount = document.querySelector('.results-count strong');
  if (resultsCount) {
    resultsCount.textContent = totalItems;
  }

  // Paginate
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  // Render cards
  const propertiesGrid = document.getElementById('properties-grid');
  if (propertiesGrid) {
    propertiesGrid.innerHTML = paginatedItems.map((property, index) => `
      <article class="property-card animate-slide-up" style="animation-delay: ${index * 0.05}s" data-id="${property.id}" onclick="openPropertyDetail(${property.id})">
        <div class="property-image-wrapper">
          <img src="${property.image}" alt="${property.title}" class="property-image" loading="lazy">
          <span class="property-badge badge-${property.status === 'inmediata' ? 'immediate' : property.status === 'construccion' ? 'construction' : 'plans'}">
            ${property.status === 'inmediata' ? 'Entrega Inmediata' : property.status === 'construccion' ? 'En Construcción' : 'Sobre Planos'}
          </span>
          <button class="property-favorite ${favorites.includes(property.id) ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(event, ${property.id})" aria-label="Agregar a favoritos">
            <i class="${favorites.includes(property.id) ? 'fas' : 'far'} fa-heart"></i>
          </button>
        </div>
        <div class="property-content">
          <p class="property-price-label">Desde:</p>
          <p class="property-price">${formatPrice(property.price, property.priceType)}</p>
          <h3 class="property-title">${property.title}</h3>
          <p class="property-location">
            <i class="fas fa-map-marker-alt"></i>
            ${property.location}
          </p>
          <div class="property-features">
            <span class="property-feature"><i class="fas fa-ruler-combined"></i> ${property.area} m²</span>
            <span class="property-feature"><i class="fas fa-bed"></i> ${property.bedrooms} Hab.</span>
            <span class="property-feature"><i class="fas fa-bath"></i> ${property.bathrooms} Baños</span>
            <span class="property-feature"><i class="fas fa-car"></i> ${property.parking} Parq.</span>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Render pagination
  renderPagination(totalPages);
}

// ===== RENDER PAGINATION =====
function renderPagination(totalPages) {
  const pagination = document.querySelector('.pagination');
  if (!pagination || totalPages <= 1) {
    if (pagination) pagination.innerHTML = '';
    return;
  }

  let html = `
    <button class="pagination-btn" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
      <i class="fas fa-chevron-left"></i>
    </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      html += `
        <button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
          ${i}
        </button>
      `;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += `<span style="color: var(--gray-400);">...</span>`;
    }
  }

  html += `
    <button class="pagination-btn" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
      <i class="fas fa-chevron-right"></i>
    </button>
  `;

  pagination.innerHTML = html;
}

window.goToPage = function(page) {
  const filtered = filterProperties();
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  
  if (page < 1 || page > totalPages) return;
  
  currentPage = page;
  renderProperties();
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ===== FORMAT PRICE =====
function formatPrice(price, type) {
  if (type === 'alquiler') {
    return `$${price.toLocaleString()} USD/mes`;
  }
  return `$${price.toLocaleString()} USD`;
}

// ===== FAVORITES =====
window.toggleFavorite = function(event, propertyId) {
  event.stopPropagation();
  
  const index = favorites.indexOf(propertyId);
  if (index > -1) {
    favorites.splice(index, 1);
    showToast('Propiedad removida de favoritos');
  } else {
    favorites.push(propertyId);
    showToast('Propiedad agregada a favoritos');
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoritesCount();
  renderProperties();
};

function updateFavoritesCount() {
  const favoritesBtn = document.querySelector('.header-actions .btn-ghost');
  if (favoritesBtn && favorites.length > 0) {
    let countBadge = favoritesBtn.querySelector('.favorites-count');
    if (!countBadge) {
      countBadge = document.createElement('span');
      countBadge.className = 'favorites-count';
      favoritesBtn.style.position = 'relative';
      favoritesBtn.appendChild(countBadge);
    }
    countBadge.textContent = favorites.length;
  }
}

// ===== INFO MODALS =====
window.openInfoModal = function(type) {
  const modal = document.getElementById(`modal-${type}`);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeInfoModal = function(type) {
  const modal = document.getElementById(`modal-${type}`);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// ===== SMOOTH SCROLL =====
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      
      e.preventDefault();
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== TOAST =====
function showToast(message, type = 'info') {
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle'
  };
  
  const colors = {
    success: '#22c55e',
    error: '#ef4444',
    info: '#0891b2'
  };
  
  toast.innerHTML = `
    <i class="fas ${icons[type] || icons.info}"></i>
    <span>${message}</span>
  `;
  
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: ${colors[type] || colors.info};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
    font-size: 0.9rem;
    z-index: 10000;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 300px;
    max-width: 90%;
    animation: slideUpToast 0.3s ease-out;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    toast.style.transition = 'all 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, type === 'error' ? 4000 : 3000);
}

// ===== DEBOUNCE =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== PROPERTY DETAIL MODAL =====
let currentPropertyDetail = null;
let currentGalleryIndex = 0;
let currentGalleryTab = 'fotos';

window.openPropertyDetail = function(propertyId) {
  const property = propertiesData.find(p => p.id === propertyId);
  if (!property) return;

  // Complete missing data
  if (!property.images) {
    property.images = [property.image];
  }
  if (!property.description) {
    property.description = `Hermosa ${property.type} ubicada en ${property.location}. Esta propiedad ofrece ${property.bedrooms} habitaciones, ${property.bathrooms} baños y ${property.parking} espacios de parqueo. Con un área de ${property.area} m², es ideal para ${property.bedrooms >= 4 ? 'familias grandes' : 'familias pequeñas o parejas'}.`;
  }
  if (!property.deliveryDate) {
    property.deliveryDate = property.status === 'inmediata' ? 'Inmediata' : 
                           property.status === 'construccion' ? 'Diciembre 2026' : 
                           'Sobre planos';
  }
  if (!property.expenses) {
    property.expenses = {
      'Administración': property.priceType === 'alquiler' ? 'Incluida' : '$150 USD/mes',
      'Impuestos': property.priceType === 'alquiler' ? 'A cargo del propietario' : '$2,500 USD/año',
      'Seguro': property.priceType === 'alquiler' ? 'Incluido' : '$800 USD/año'
    };
  }

  currentPropertyDetail = property;
  currentGalleryIndex = 0;
  currentGalleryTab = 'fotos';

  // Update title and location
  document.getElementById('detail-title').textContent = property.title;
  document.getElementById('detail-location').textContent = property.location;

  // Update price
  const priceEl = document.getElementById('detail-price');
  priceEl.textContent = formatPrice(property.price, property.priceType);

  // Update delivery date
  const deliveryEl = document.getElementById('detail-delivery');
  const deliveryText = property.deliveryDate || 
    (property.status === 'inmediata' ? 'Inmediata' : 
     property.status === 'construccion' ? 'En construcción' : 
     'Sobre planos');
  deliveryEl.textContent = deliveryText;

  // Update type
  const typeEl = document.getElementById('detail-type');
  const typeLabels = {
    'apartamento': 'Apartamento',
    'casa': 'Casa',
    'villa': 'Villa',
    'penthouse': 'Penthouse',
    'terreno': 'Terreno'
  };
  typeEl.textContent = typeLabels[property.type] || property.type;

  // Update area
  document.getElementById('detail-area').textContent = `${property.area} m²`;

  // Update WhatsApp link
  const whatsappEl = document.getElementById('detail-whatsapp');
  const message = encodeURIComponent(`Hola, me interesa la propiedad: ${property.title}`);
  whatsappEl.href = `https://wa.me/18095557890?text=${message}`;

  // Load gallery
  loadPropertyGallery(property);

  // Load features
  loadPropertyFeatures(property);

  // Load general info
  loadPropertyGeneralInfo(property);

  // Load description
  loadPropertyDescription(property);

  // Load expenses
  loadPropertyExpenses(property);

  // Open modal
  const modal = document.getElementById('property-detail-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closePropertyDetail = function() {
  const modal = document.getElementById('property-detail-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  currentPropertyDetail = null;
};

function loadPropertyGallery(property) {
  // Ensure property has images array
  const images = property.images || [property.image];
  const mainImage = document.getElementById('detail-main-image');
  const thumbnails = document.getElementById('detail-thumbnails');
  const currentImage = document.getElementById('current-image');
  const totalImages = document.getElementById('total-images');

  if (images.length > 0) {
    mainImage.src = images[0];
    mainImage.alt = property.title;
    currentImage.textContent = '1';
    totalImages.textContent = images.length;

    // Show thumbnails if more than 1 image
    if (images.length > 1) {
      thumbnails.innerHTML = images.map((img, index) => `
        <div class="property-thumbnail ${index === 0 ? 'active' : ''}" onclick="selectGalleryImage(${index})">
          <img src="${img}" alt="${property.title} - Imagen ${index + 1}">
        </div>
      `).join('');
      thumbnails.style.display = 'grid';
    } else {
      thumbnails.style.display = 'none';
    }
  }
}

window.selectGalleryImage = function(index) {
  if (!currentPropertyDetail) return;
  
  const images = currentPropertyDetail.images || [currentPropertyDetail.image];
  if (index < 0 || index >= images.length) return;

  currentGalleryIndex = index;
  document.getElementById('detail-main-image').src = images[index];
  document.getElementById('current-image').textContent = index + 1;

  // Update active thumbnail
  document.querySelectorAll('.property-thumbnail').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
};

window.changeGalleryImage = function(direction) {
  if (!currentPropertyDetail) return;
  
  const images = currentPropertyDetail.images || [currentPropertyDetail.image];
  let newIndex = currentGalleryIndex + direction;
  
  if (newIndex < 0) newIndex = images.length - 1;
  if (newIndex >= images.length) newIndex = 0;
  
  selectGalleryImage(newIndex);
};

window.switchDetailTab = function(tab) {
  currentGalleryTab = tab;
  
  // Update active tab
  document.querySelectorAll('.detail-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });

  // Show/hide content based on tab
  const gallery = document.getElementById('detail-gallery');
  if (tab === 'fotos') {
    gallery.style.display = 'block';
  } else {
    gallery.style.display = 'none';
    // Here you would load video, map, or zone info
    if (tab === 'video') {
      // Load video if available
    } else if (tab === 'mapa') {
      // Load map
    } else if (tab === 'zona') {
      // Load zone info
    }
  }
};

function loadPropertyFeatures(property) {
  const featuresEl = document.getElementById('detail-features');
  const features = [
    { icon: 'fas fa-bed', label: `${property.bedrooms} Habitaciones` },
    { icon: 'fas fa-bath', label: `${property.bathrooms} Baños` },
    { icon: 'fas fa-car', label: `${property.parking} Parqueos` },
    { icon: 'fas fa-ruler-combined', label: `${property.area} m²` },
    { icon: 'fas fa-building', label: typeLabels[property.type] || property.type },
    { icon: 'fas fa-map-marker-alt', label: property.location }
  ];

  featuresEl.innerHTML = features.map(f => `
    <div class="property-detail-feature">
      <i class="${f.icon}"></i>
      <span>${f.label}</span>
    </div>
  `).join('');
}

function loadPropertyGeneralInfo(property) {
  const infoEl = document.getElementById('detail-general-info');
  const info = [
    { label: 'Tipo', value: typeLabels[property.type] || property.type },
    { label: 'Estado', value: property.status === 'inmediata' ? 'Entrega Inmediata' : property.status === 'construccion' ? 'En Construcción' : 'Sobre Planos' },
    { label: 'Ubicación', value: property.location },
    { label: 'Área', value: `${property.area} m²` },
    { label: 'Habitaciones', value: property.bedrooms },
    { label: 'Baños', value: property.bathrooms },
    { label: 'Parqueos', value: property.parking },
    { label: 'Precio', value: formatPrice(property.price, property.priceType) }
  ];

  infoEl.innerHTML = info.map(i => `
    <div class="property-detail-info-item">
      <strong>${i.label}:</strong>
      <span>${i.value}</span>
    </div>
  `).join('');
}

function loadPropertyDescription(property) {
  const descEl = document.getElementById('detail-description');
  const description = property.description || 
    `Hermosa ${property.type} ubicada en ${property.location}. Esta propiedad ofrece ${property.bedrooms} habitaciones, ${property.bathrooms} baños y ${property.parking} espacios de parqueo. Con un área de ${property.area} m², es ideal para ${property.bedrooms >= 4 ? 'familias grandes' : 'familias pequeñas o parejas'}.`;
  
  descEl.innerHTML = `<p>${description}</p>`;
}

function loadPropertyExpenses(property) {
  const expensesEl = document.getElementById('detail-expenses');
  const expenses = property.expenses || {
    'Administración': property.priceType === 'alquiler' ? 'Incluida' : '$150 USD/mes',
    'Impuestos': property.priceType === 'alquiler' ? 'A cargo del propietario' : '$2,500 USD/año',
    'Seguro': property.priceType === 'alquiler' ? 'Incluido' : '$800 USD/año'
  };

  expensesEl.innerHTML = Object.entries(expenses).map(([key, value]) => `
    <div class="expense-item">
      <strong>${key}:</strong>
      <span>${value}</span>
    </div>
  `).join('');
}

window.switchContentTab = function(tab) {
  // Update active tab
  document.querySelectorAll('.content-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.content === tab);
  });

  // Show/hide content sections
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.toggle('active', section.id === `content-${tab}`);
  });
};

window.openContactForm = function() {
  closePropertyDetail();
  const modal = document.getElementById('contact-form-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeContactForm = function() {
  const modal = document.getElementById('contact-form-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
};

window.shareProperty = function(platform) {
  if (!currentPropertyDetail) return;

  const url = window.location.href;
  const title = currentPropertyDetail.title;
  const text = `Mira esta propiedad: ${title}`;

  let shareUrl = '';
  switch(platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      break;
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
      break;
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
};

window.copyPropertyLink = function() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    showToast('Enlace copiado al portapapeles');
  });
};

// Initialize contact form
function initializeContactForm() {
  const contactForm = document.getElementById('property-contact-form');
  if (!contactForm) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const phoneInput = document.getElementById('contact-phone');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('submit-btn');

  // Real-time validation
  nameInput?.addEventListener('blur', () => validateField(nameInput, 'name'));
  nameInput?.addEventListener('input', () => clearError(nameInput, 'name'));

  emailInput?.addEventListener('blur', () => validateField(emailInput, 'email'));
  emailInput?.addEventListener('input', () => clearError(emailInput, 'email'));

  phoneInput?.addEventListener('blur', () => validateField(phoneInput, 'phone'));
  phoneInput?.addEventListener('input', () => {
    formatPhoneInput(phoneInput);
    clearError(phoneInput, 'phone');
  });

  messageInput?.addEventListener('input', () => clearError(messageInput, 'message'));

  // Form submission
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateField(nameInput, 'name');
    const isEmailValid = validateField(emailInput, 'email');
    const isPhoneValid = validateField(phoneInput, 'phone');

    if (!isNameValid || !isEmailValid || !isPhoneValid) {
      showToast('Por favor, completa todos los campos requeridos correctamente', 'error');
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    contactForm.classList.add('form-loading');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get form data
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        message: messageInput.value,
        property: currentPropertyDetail?.title || 'Consulta general'
      };

      console.log('Form submitted:', formData);
      
      showToast('¡Solicitud enviada exitosamente! Te contactaremos pronto.', 'success');
      
      // Reset form
      contactForm.reset();
      contactForm.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('success', 'error');
      });
      
      // Close modal after delay
      setTimeout(() => {
        closeContactForm();
      }, 1500);
      
    } catch (error) {
      showToast('Error al enviar. Por favor, intenta nuevamente.', 'error');
    } finally {
      submitBtn.disabled = false;
      contactForm.classList.remove('form-loading');
    }
  });
}

function validateField(input, fieldName) {
  const formGroup = input.closest('.form-group');
  const errorEl = document.getElementById(`error-${fieldName}`);
  
  if (!formGroup || !errorEl) return true;

  let isValid = true;
  let errorMessage = '';

  // Remove previous states
  formGroup.classList.remove('success', 'error');

  if (input.hasAttribute('required') && !input.value.trim()) {
    isValid = false;
    errorMessage = 'Este campo es obligatorio';
  } else {
    switch(fieldName) {
      case 'name':
        if (input.value.trim().length < 2) {
          isValid = false;
          errorMessage = 'El nombre debe tener al menos 2 caracteres';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(input.value.trim())) {
          isValid = false;
          errorMessage = 'El nombre solo puede contener letras';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
          isValid = false;
          errorMessage = 'Ingresa un correo electrónico válido';
        }
        break;
      case 'phone':
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(input.value.trim()) || input.value.trim().length < 10) {
          isValid = false;
          errorMessage = 'Ingresa un número de teléfono válido';
        }
        break;
    }
  }

  if (isValid) {
    formGroup.classList.add('success');
    errorEl.textContent = '';
  } else {
    formGroup.classList.add('error');
    errorEl.textContent = errorMessage;
  }

  return isValid;
}

function clearError(input, fieldName) {
  const formGroup = input.closest('.form-group');
  const errorEl = document.getElementById(`error-${fieldName}`);
  
  if (formGroup && input.value.trim()) {
    formGroup.classList.remove('error');
  }
  if (errorEl) {
    errorEl.textContent = '';
  }
}

function formatPhoneInput(input) {
  let value = input.value.replace(/\D/g, '');
  
  if (value.length > 0) {
    if (value.length <= 3) {
      value = `+${value}`;
    } else if (value.length <= 6) {
      value = `+${value.slice(0, 3)} ${value.slice(3)}`;
    } else if (value.length <= 9) {
      value = `+${value.slice(0, 3)} ${value.slice(3, 6)}-${value.slice(6)}`;
    } else {
      value = `+${value.slice(0, 3)} (${value.slice(3, 6)}) ${value.slice(6, 9)}-${value.slice(9, 13)}`;
    }
  }
  
  input.value = value;
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeContactForm);
} else {
  initializeContactForm();
}

const typeLabels = {
  'apartamento': 'Apartamento',
  'casa': 'Casa',
  'villa': 'Villa',
  'penthouse': 'Penthouse',
  'terreno': 'Terreno'
};
