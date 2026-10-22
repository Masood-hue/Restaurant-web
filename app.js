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
 // Filter button listeners
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.filter);
    });
  });

  // Initial render
  renderMenu();

  /* =========================================================
     5. ADD-TO-ORDER CART COUNT
     ========================================================= */
  let cartCount = 0;
  const cartToast = document.getElementById('cartToast');

  function showToast(message) {
    if (!cartToast) return;
    cartToast.textContent = message;
    cartToast.classList.add('show');
    setTimeout(() => cartToast.classList.remove('show'), 2200);
  }

  function attachAddToOrderListeners() {
    document.querySelectorAll('.add-to-order').forEach(button => {
      button.addEventListener('click', (e) => {
        const itemId = Number(e.currentTarget.dataset.id);
        const item = menuItems.find(m => m.id === itemId);
        if (item) {
          cartCount++;
          showToast(`🛒 Added "${item.name}" — Cart: ${cartCount} item${cartCount > 1 ? 's' : ''}`);
        }
      });
    });
  }

  // Also handle "Order Now" and "Grab This Deal" buttons
  const orderNowBtn = document.getElementById('orderNowBtn');
  if (orderNowBtn) {
    orderNowBtn.addEventListener('click', () => {
      cartCount++;
      showToast(`🛒 Order started — Cart: ${cartCount} item${cartCount > 1 ? 's' : ''}`);
    });
  }

  const grabDealBtn = document.getElementById('grabDealBtn');
  if (grabDealBtn) {
    grabDealBtn.addEventListener('click', () => {
      cartCount++;
      showToast(`🎉 Deal added to order — Cart: ${cartCount} item${cartCount > 1 ? 's' : ''}`);
    });
  }
//  6. *TESTIMONIALS SLIDER*
    
  const testimonials = [
    {
      name: 'Emily R.',
      stars: '★★★★★',
      review: 'The best burger I’ve had in years! The atmosphere is warm and the staff treat you like family.',
      avatar: 'https://i.pravatar.cc/80?img=1'
    },
    {
      name: 'Marcus T.',
      stars: '★★★★★',
      review: 'Savora never disappoints. The spicy chicken pizza is a flavour explosion — I order it every week.',
      avatar: 'https://i.pravatar.cc/80?img=3'
    },
    {
      name: 'Aisha K.',
      stars: '★★★★☆',
      review: 'Beautiful presentation and generous portions. The chocolate lava cake is a must-try dessert!',
      avatar: 'https://i.pravatar.cc/80?img=5'
    }
  ];

  const track = document.getElementById('testimonialTrack');
  let currentSlide = 0;

  function renderTestimonials() {
    if (!track) return;
    track.innerHTML = testimonials.map(t => `
      <div class="testimonial-card" role="group" aria-label="Testimonial from ${t.name}">
        <div class="stars" aria-label="${t.stars.replace(/★/g, 'star, ').replace(/☆/g, 'empty star, ')}">${t.stars}</div>
        <blockquote>“${t.review}”</blockquote>
        <div class="author">${t.name}</div>
      </div>
    `).join('');
    updateSliderPosition();
  }

  function updateSliderPosition() {
    if (!track) return;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
      updateSliderPosition();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % testimonials.length;
      updateSliderPosition();
    });
  }

  renderTestimonials();

  //  7. RESERVATION FORM VALIDATION
    
  const reservationForm = document.getElementById('reservationForm');
  const resFeedback = document.getElementById('resFeedback');

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('resName').value.trim();
      const email = document.getElementById('resEmail').value.trim();
      const phone = document.getElementById('resPhone').value.trim();
      const guests = document.getElementById('resGuests').value;
      const date = document.getElementById('resDate').value;
      const time = document.getElementById('resTime').value;

      let errors = [];

      if (!name) errors.push('Full name is required.');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('A valid email is required.');
      if (!phone) errors.push('Phone number is required.');
      if (!guests) errors.push('Please select the number of guests.');
      if (!date) errors.push('Please choose a reservation date.');
      if (!time) errors.push('Please choose a reservation time.');

      if (errors.length > 0) {
        resFeedback.textContent = '⚠️ ' + errors.join(' ');
        resFeedback.className = 'form-feedback error';
      } else {
        resFeedback.textContent = '✅ Reservation request received! This is a front-end demo — no real booking has been made. We\'ll be in touch once backend integration is complete.';
        resFeedback.className = 'form-feedback success';
        reservationForm.reset();
      }
    });
  }
  // 8. CONTACT FORM VALIDATION
  
  const contactForm = document.getElementById('contactForm');
  const contactFeedback = document.getElementById('contactFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      let errors = [];

      if (!name) errors.push('Name is required.');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('A valid email is required.');
      if (!message) errors.push('Message cannot be empty.');

      if (errors.length > 0) {
        contactFeedback.textContent = '⚠️ ' + errors.join(' ');
        contactFeedback.className = 'form-feedback error';
      } else {
        contactFeedback.textContent = '✅ Message sent (demo only). Thank you for reaching out!';
        contactFeedback.className = 'form-feedback success';
        contactForm.reset();
      }
    });
  }
  /*      9. BACK TO TOP BUTTON           */

  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
/*      10. DYNAMIC CURRENT YEAR IN FOOTER       */
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /*  11. SCROLL-REVEAL ANIMATIONS (respecting reduced motion)      */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const revealElements = document.querySelectorAll('.section');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      revealObserver.observe(el);
    });
  }

})