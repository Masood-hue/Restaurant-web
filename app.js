/*    SAVORA — Restaurant Website JavaScript
   Vanilla JS only. No frameworks, no dependencies.   */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     1. MOBILE NAVIGATION
     ========================================================= */
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
  /*    2. STICKY NAVIGATION SHADOW  */
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }
  });
/*       3. SMOOTH SCROLLING FOR INTERNAL LINKS     */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  /*             4. MENU DATA & RENDERING        */
  const menuItems = [
    {
      id: 1,
      name: 'Signature Beef Burger',
      description: 'Juicy grass-fed beef, melted cheddar, crisp lettuce & our secret sauce.',
      price: '$14.99',
      category: 'burgers',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
      popular: true
    },
    {
      id: 2,
      name: 'Spicy Chicken Pizza',
      description: 'Wood-fired base, spicy marinated chicken, jalapeños & smoked mozzarella.',
      price: '$16.49',
      category: 'pizza',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
      popular: false
    },
    {
      id: 3,
      name: 'Crispy Chicken Wings',
      description: 'Golden-fried wings tossed in your choice of honey-sriracha or classic buffalo.',
      price: '$11.99',
      category: 'main',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
      popular: true
    },
    {
      id: 4,
      name: 'Creamy Alfredo Pasta',
      description: 'Fettuccine in a rich parmesan cream sauce with grilled chicken & herbs.',
      price: '$15.49',
      category: 'main',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80',
      popular: false
    },
    {
      id: 5,
      name: 'Loaded French Fries',
      description: 'Crispy fries topped with melted cheese, bacon bits & green onions.',
      price: '$8.99',
      category: 'main',
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80',
      popular: false
    },
    {
      id: 6,
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with a molten centre, served with vanilla ice cream.',
      price: '$9.99',
      category: 'desserts',
      image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80',
      popular: true
    }
  ];
const menuGrid = document.getElementById('menuGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  function renderMenu(filter = 'all') {
    if (!menuGrid) return;
    const filtered = filter === 'all'
      ? menuItems
      : menuItems.filter(item => item.category === filter);

    menuGrid.innerHTML = filtered.map(item => `
      <article class="menu-card" data-category="${item.category}">
        ${item.popular ? '<span class="popular-badge">🔥 Popular</span>' : ''}
        <img src="${item.image}" alt="${item.name}" loading="lazy" width="600" height="400">
        <div class="menu-card-body">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="menu-card-footer">
            <span class="price">${item.price}</span>
            <button class="btn btn-primary add-to-order" data-id="${item.id}" aria-label="Add ${item.name} to order">Add to Order</button>
          </div>
        </div>
      </article>
    `).join('');

    // Re-attach add-to-order listeners
    attachAddToOrderListeners();
  }

})