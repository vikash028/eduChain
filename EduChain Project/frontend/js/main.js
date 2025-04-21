// Main JavaScript for all pages

// Page transition effect
document.addEventListener('DOMContentLoaded', () => {
  // Add page transition class to main content
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.classList.add('page-transition');
  }

  // Mobile navigation menu toggle
  const menuButton = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
      menuButton.setAttribute('aria-expanded', !expanded);
    });
  }

  // Add hover effects to cards
  const cards = document.querySelectorAll('.hover-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '';
    });
  });

  // Update active navigation link
  updateActiveNavLink();
});

// API utilities
const API_URL = '/api';

// Fetch with error handling
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

// Format date string
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Format timestamp
function formatTimestamp(timestamp) {
  if (!timestamp) return 'N/A';
  
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return timestamp;
  
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

// Update active navigation link with improved contrast
function updateActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Update desktop navigation
  const desktopLinks = document.querySelectorAll('.sm\\:flex a');
  desktopLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('border-blue-500', 'text-white');
      link.classList.remove('border-transparent', 'text-gray-300', 'hover:border-gray-300', 'hover:text-gray-100');
    } else {
      link.classList.add('border-transparent', 'text-gray-300', 'hover:border-gray-300', 'hover:text-gray-100');
      link.classList.remove('border-blue-500', 'text-white');
    }
  });
  
  // Update mobile navigation
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  mobileLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('bg-blue-900', 'border-blue-500', 'text-white');
      link.classList.remove('border-transparent', 'text-gray-300', 'hover:bg-gray-800', 'hover:border-gray-300', 'hover:text-gray-100');
    } else {
      link.classList.add('border-transparent', 'text-gray-300', 'hover:bg-gray-800', 'hover:border-gray-300', 'hover:text-gray-100');
      link.classList.remove('bg-blue-900', 'border-blue-500', 'text-white');
    }
  });
}