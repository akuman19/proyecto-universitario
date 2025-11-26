/**
 * Altura Inmobiliaria - Portal Funcional
 * Main JavaScript
 */

// ===== CONSTANTS =====
const typeLabels = {
  'apartamento': 'Apartamento',
  'casa': 'Casa',
  'villa': 'Villa',
  'penthouse': 'Penthouse',
  'terreno': 'Terreno'
};

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

let favorites = (() => {
  try {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
})();
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
  initializeAnimations();
  initializeTestimonials();
  initializeCounters();
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

  // Función para abrir el sidebar
  function openSidebar() {
    if (sidebar) {
      sidebar.classList.add('open');
      if (sidebarOverlay) {
        sidebarOverlay.classList.add('active');
      }
      // Solo ocultar scroll en móvil/tablet (menor a 1024px)
      if (window.innerWidth < 1024) {
        document.body.style.overflow = 'hidden';
      }
    }
  }

  // Función para cerrar el sidebar
  function closeSidebar() {
    if (sidebar) {
      sidebar.classList.remove('open');
      if (sidebarOverlay) {
        sidebarOverlay.classList.remove('active');
      }
      // Restaurar scroll siempre
      document.body.style.overflow = '';
    }
  }

  // Event listeners
  if (filtersBtn) {
    filtersBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Solo abrir sidebar en móvil/tablet (menor a 1024px)
      // En desktop el sidebar ya está visible
      if (window.innerWidth < 1024) {
        openSidebar();
      } else {
        // En desktop, hacer scroll suave al sidebar si está fuera de vista
        if (sidebar) {
          sidebar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  }

  if (mobileFilterBtn) {
    mobileFilterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openSidebar();
    });
  }

  if (sidebarClose) {
    sidebarClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeSidebar();
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeSidebar();
    });
  }

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
      closeSidebar();
    }
    showToast('Filtros aplicados');
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
    if (sidebar?.classList.contains('open')) {
      closeSidebar();
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
  try {
    let filtered = [...propertiesData];

    // Search
    if (currentFilters.search) {
      const searchLower = currentFilters.search.toLowerCase();
      filtered = filtered.filter(p => 
        (p.title?.toLowerCase().includes(searchLower)) ||
        (p.location?.toLowerCase().includes(searchLower)) ||
        (p.description?.toLowerCase().includes(searchLower))
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
      } else if (!isNaN(beds)) {
        filtered = filtered.filter(p => p.bedrooms === beds);
      }
    }

    // Bathrooms
    if (currentFilters.bathrooms) {
      const baths = parseInt(currentFilters.bathrooms);
      if (currentFilters.bathrooms === '4') {
        filtered = filtered.filter(p => p.bathrooms >= 4);
      } else if (!isNaN(baths)) {
        filtered = filtered.filter(p => p.bathrooms === baths);
      }
    }

    // Price
    if (currentFilters.priceMin != null && !isNaN(currentFilters.priceMin)) {
      filtered = filtered.filter(p => p.price >= currentFilters.priceMin);
    }
    if (currentFilters.priceMax != null && !isNaN(currentFilters.priceMax)) {
      filtered = filtered.filter(p => p.price <= currentFilters.priceMax);
    }

    // Area
    if (currentFilters.areaMin != null && !isNaN(currentFilters.areaMin)) {
      filtered = filtered.filter(p => p.area >= currentFilters.areaMin);
    }
    if (currentFilters.areaMax != null && !isNaN(currentFilters.areaMax)) {
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
          filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
        case 'price-desc':
          filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
        case 'newest':
          filtered.sort((a, b) => (b.id || 0) - (a.id || 0));
          break;
        case 'area':
          filtered.sort((a, b) => (b.area || 0) - (a.area || 0));
          break;
      }
    }

    return filtered;
  } catch (error) {
    console.error('Error filtering properties:', error);
    return [];
  }
}

// ===== RENDER PROPERTIES =====
function renderProperties() {
  try {
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
      if (paginatedItems.length === 0) {
        propertiesGrid.innerHTML = `
          <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <i class="fas fa-search" style="font-size: 3rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
            <p style="font-size: 1.2rem; color: var(--gray-600);">No se encontraron propiedades</p>
            <p style="color: var(--gray-500); margin-top: 0.5rem;">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        `;
      } else {
        propertiesGrid.innerHTML = paginatedItems.map((property, index) => {
          const safeTitle = escapeHtml(property.title || 'Sin título');
          const safeLocation = escapeHtml(property.location || 'Ubicación no especificada');
          const safeImage = property.image || './img/placeholder.jpg';
          
          return `
            <article class="property-card animate-slide-up" style="animation-delay: ${index * 0.05}s" data-id="${property.id}" onclick="openPropertyDetail(${property.id})">
              <div class="property-image-wrapper">
                <img src="${safeImage}" alt="${safeTitle}" class="property-image" loading="lazy" onerror="this.src='./img/placeholder.jpg'">
                <span class="property-badge badge-${property.status === 'inmediata' ? 'immediate' : property.status === 'construccion' ? 'construction' : 'plans'}">
                  ${property.status === 'inmediata' ? 'Entrega Inmediata' : property.status === 'construccion' ? 'En Construcción' : 'Sobre Planos'}
                </span>
                <button class="property-favorite ${favorites.includes(property.id) ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(event, ${property.id})" aria-label="Agregar a favoritos">
                  <i class="${favorites.includes(property.id) ? 'fas' : 'far'} fa-heart"></i>
                </button>
              </div>
              <div class="property-content">
                <p class="property-price-label">Desde:</p>
                <p class="property-price">${formatPrice(property.price || 0, property.priceType || 'venta')}</p>
                <h3 class="property-title">${safeTitle}</h3>
                <p class="property-location">
                  <i class="fas fa-map-marker-alt"></i>
                  ${safeLocation}
                </p>
                <div class="property-features">
                  <span class="property-feature"><i class="fas fa-ruler-combined"></i> ${property.area || 0} m²</span>
                  <span class="property-feature"><i class="fas fa-bed"></i> ${property.bedrooms || 0} Hab.</span>
                  <span class="property-feature"><i class="fas fa-bath"></i> ${property.bathrooms || 0} Baños</span>
                  <span class="property-feature"><i class="fas fa-car"></i> ${property.parking || 0} Parq.</span>
                </div>
              </div>
            </article>
          `;
        }).join('');
      }
    }

    // Render pagination
    renderPagination(totalPages);
  } catch (error) {
    console.error('Error rendering properties:', error);
    showToast('Error al mostrar las propiedades', 'error');
  }
}

// ===== UTILITY: ESCAPE HTML =====
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
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
  try {
    event.stopPropagation();
    
    if (!propertyId || isNaN(propertyId)) {
      console.warn('Invalid property ID:', propertyId);
      return;
    }
    
    const index = favorites.indexOf(propertyId);
    if (index > -1) {
      favorites.splice(index, 1);
      showToast('Propiedad removida de favoritos');
    } else {
      favorites.push(propertyId);
      showToast('Propiedad agregada a favoritos');
    }
    
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (storageError) {
      console.error('Error saving to localStorage:', storageError);
      showToast('Error al guardar favoritos', 'error');
    }
    
    updateFavoritesCount();
    renderProperties();
  } catch (error) {
    console.error('Error toggling favorite:', error);
    showToast('Error al actualizar favoritos', 'error');
  }
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
    // Agregar clase active con un pequeño delay para la animación
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
    
    // Agregar animación de entrada a los elementos
    const cards = modal.querySelectorAll('.servicio-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 + (index * 100));
    });
  }
};

window.closeInfoModal = function(type) {
  const modal = document.getElementById(`modal-${type}`);
  if (modal) {
    // Animar salida de las tarjetas
    const cards = modal.querySelectorAll('.servicio-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(-20px)';
      }, index * 50);
    });
    
    // Cerrar modal después de la animación
    setTimeout(() => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }, 300);
  }
};

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      const modalId = modal.id;
      if (modalId === 'modal-servicios') {
        closeInfoModal('servicios');
      } else {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
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
  try {
    const property = propertiesData.find(p => p.id === propertyId);
    if (!property) {
      console.warn('Property not found:', propertyId);
      showToast('Propiedad no encontrada', 'error');
      return;
    }

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
    whatsappEl.href = `https://wa.me/1?text=${message}`;

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
    if (!modal) {
      console.error('Property detail modal not found');
      return;
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  } catch (error) {
    console.error('Error opening property detail:', error);
    showToast('Error al cargar los detalles de la propiedad', 'error');
  }
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
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      showToast('Enlace copiado al portapapeles', 'success');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showToast('Enlace copiado al portapapeles', 'success');
      } catch (err) {
        showToast('Error al copiar el enlace', 'error');
      }
      document.body.removeChild(textArea);
    });
  } else {
    showToast('Tu navegador no soporta esta función', 'error');
  }
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

// ===== ANIMATIONS & SCROLL REVEAL =====
function initializeAnimations() {
  // Simple scroll reveal implementation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with data-aos attribute
  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });
}

// ===== COUNTERS ANIMATION =====
function initializeCounters() {
  const counters = document.querySelectorAll('.stat-value, .stat-number');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(counter);
  };

  counters.forEach(counter => {
    counter.textContent = '0';
    animateCounter(counter);
  });
}

// ===== TESTIMONIALS CAROUSEL =====
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;

function initializeTestimonials() {
  if (testimonials.length === 0) return;
  
  // Set first testimonial as active
  testimonials[0].classList.add('active');
  
  // Auto-rotate testimonials every 5 seconds
  setInterval(() => {
    if (totalTestimonials > 1) {
      changeTestimonial(1);
    }
  }, 5000);
}

window.changeTestimonial = function(direction) {
  testimonials[currentTestimonial].classList.remove('active');
  
  currentTestimonial += direction;
  
  if (currentTestimonial < 0) {
    currentTestimonial = totalTestimonials - 1;
  } else if (currentTestimonial >= totalTestimonials) {
    currentTestimonial = 0;
  }
  
  testimonials[currentTestimonial].classList.add('active');
  updateTestimonialDots();
};

window.goToTestimonial = function(index) {
  testimonials[currentTestimonial].classList.remove('active');
  currentTestimonial = index;
  testimonials[currentTestimonial].classList.add('active');
  updateTestimonialDots();
};

function updateTestimonialDots() {
  const dots = document.querySelectorAll('.testimonials-dots .dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentTestimonial);
  });
}

// ===== MAP FUNCTIONALITY =====
let propertiesMap = null;
let mapMarkers = [];

// Coordenadas aproximadas de República Dominicana por ubicación
const locationCoordinates = {
  'Punta Cana': [18.5819, -68.4047],
  'Santo Domingo': [18.4861, -69.9312],
  'La Esperilla': [18.4800, -69.9500],
  'Jarabacoa': [19.1167, -70.6333],
  'Santiago': [19.4517, -70.6970],
  'La Romana': [18.4273, -68.9728],
  'Las Terrenas': [19.3167, -69.5333],
  'default': [18.7357, -70.1627] // Centro de República Dominicana
};

function getCoordinatesForLocation(location) {
  if (!location) return locationCoordinates['default'];
  
  const locationLower = location.toLowerCase();
  for (const [key, coords] of Object.entries(locationCoordinates)) {
    if (locationLower.includes(key.toLowerCase())) {
      return coords;
    }
  }
  return locationCoordinates['default'];
}

window.openMapModal = function() {
  const modal = document.getElementById('map-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Inicializar mapa si no existe
    if (!propertiesMap) {
      initializePropertiesMap();
    } else {
      // Actualizar marcadores si el mapa ya existe
      updateMapMarkers();
    }
  }
};

window.closeMapModal = function() {
  const modal = document.getElementById('map-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

function initializePropertiesMap() {
  const mapContainer = document.getElementById('properties-map');
  if (!mapContainer) return;

  // Inicializar mapa centrado en República Dominicana
  propertiesMap = L.map('properties-map').setView([18.7357, -70.1627], 8);

  // Agregar capa de tiles (OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(propertiesMap);

  // Agregar marcadores
  updateMapMarkers();
}

function updateMapMarkers() {
  if (!propertiesMap) return;

  // Limpiar marcadores existentes
  mapMarkers.forEach(marker => marker.remove());
  mapMarkers = [];

  // Obtener propiedades filtradas
  const filteredProperties = filterProperties();

  // Agregar marcador para cada propiedad
  filteredProperties.forEach(property => {
    const coords = getCoordinatesForLocation(property.location);
    
    // Determinar color del marcador según el estado
    let markerColor = '#0891b2'; // Color por defecto (primary)
    if (property.status === 'inmediata') {
      markerColor = '#22c55e'; // Verde (success)
    } else if (property.status === 'construccion') {
      markerColor = '#eab308'; // Amarillo (warning)
    }

    // Crear icono personalizado
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: 30px;
        height: 30px;
        background: ${markerColor};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <i class="fas fa-home" style="color: white; font-size: 12px;"></i>
      </div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    // Crear marcador
    const marker = L.marker(coords, { icon: customIcon }).addTo(propertiesMap);

    // Crear popup con información de la propiedad
    const popupContent = `
      <div style="min-width: 200px;">
        <img src="${property.image || './img/placeholder.jpg'}" 
             alt="${escapeHtml(property.title)}" 
             style="width: 100%; height: 120px; object-fit: cover; border-radius: 0.5rem; margin-bottom: 0.75rem;">
        <h4 style="font-weight: 700; color: var(--gray-900); margin-bottom: 0.5rem; font-size: 1rem;">
          ${escapeHtml(property.title)}
        </h4>
        <p style="color: var(--primary); font-weight: 700; font-size: 1.1rem; margin-bottom: 0.5rem;">
          ${formatPrice(property.price || 0, property.priceType || 'venta')}
        </p>
        <p style="color: var(--gray-600); font-size: 0.875rem; margin-bottom: 0.75rem;">
          <i class="fas fa-map-marker-alt"></i> ${escapeHtml(property.location || 'Ubicación no especificada')}
        </p>
        <div style="display: flex; gap: 1rem; margin-bottom: 0.75rem; font-size: 0.875rem; color: var(--gray-600);">
          <span><i class="fas fa-ruler-combined"></i> ${property.area || 0} m²</span>
          <span><i class="fas fa-bed"></i> ${property.bedrooms || 0}</span>
          <span><i class="fas fa-bath"></i> ${property.bathrooms || 0}</span>
        </div>
        <button onclick="closeMapModal(); openPropertyDetail(${property.id});" 
                style="width: 100%; padding: 0.75rem; background: var(--primary); color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600; transition: all 0.3s;"
                onmouseover="this.style.background='var(--primary-dark)'"
                onmouseout="this.style.background='var(--primary)'">
          Ver Detalles
        </button>
      </div>
    `;

    marker.bindPopup(popupContent, {
      maxWidth: 250,
      className: 'property-popup'
    });

    mapMarkers.push(marker);
  });

  // Ajustar vista para mostrar todos los marcadores
  if (mapMarkers.length > 0) {
    const group = new L.featureGroup(mapMarkers);
    propertiesMap.fitBounds(group.getBounds().pad(0.1));
  }
}

// Event listener para el botón del mapa (se ejecuta después de que el DOM esté listo)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMapButton);
} else {
  initializeMapButton();
}

function initializeMapButton() {
  const mapBtn = document.querySelector('.btn-map');
  if (mapBtn) {
    mapBtn.addEventListener('click', openMapModal);
  }

  // Cerrar modal al hacer clic en el overlay
  const mapModal = document.getElementById('map-modal');
  if (mapModal) {
    mapModal.addEventListener('click', (e) => {
      if (e.target === mapModal) {
        closeMapModal();
      }
    });
  }
}
