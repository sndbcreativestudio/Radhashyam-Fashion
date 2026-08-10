/**
 * RADHASHYAM FASHION — INTERACTIVE SCRIPT
 * Lightweight, zero-dependency JavaScript for smooth navigation,
 * sticky elements, gallery filtering, and lightbox modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. MOBILE DRAWER NAVIGATION
  // ------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const closeDrawer = document.getElementById('closeDrawer');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

  function openMenu() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.add('open');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.remove('open');
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (closeDrawer) closeDrawer.addEventListener('click', closeMenu);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMenu);

  mobileNavItems.forEach(item => {
    item.addEventListener('click', closeMenu);
  });

  // ------------------------------------------------------------------------
  // 2. STICKY HEADER & BACK-TO-TOP BUTTON ON SCROLL
  // ------------------------------------------------------------------------
  const siteHeader = document.getElementById('header');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header Transformation
    if (siteHeader) {
      if (scrollY > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Back to Top Button
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ------------------------------------------------------------------------
  // 3. GALLERY CATEGORY FILTERING
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category') || '';
        if (filterValue === 'all' || itemCategories.includes(filterValue)) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 4. LIGHTBOX MODAL FOR GALLERY IMAGES
  // ------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCat = document.getElementById('lightboxCat');
  const lightboxWa = document.getElementById('lightboxWa');
  const lightboxClose = document.getElementById('lightboxClose');

  const galleryViewBtns = document.querySelectorAll('.view-lightbox-btn');

  galleryViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const galleryItem = btn.closest('.gallery-item');
      if (!galleryItem) return;

      const img = galleryItem.querySelector('img');
      const title = galleryItem.querySelector('h4')?.textContent || 'Radhashyam Fashion Style';
      const cat = galleryItem.querySelector('.gallery-cat')?.textContent || 'Collection Showcase';

      if (lightboxImg && img) lightboxImg.src = img.src;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxCat) lightboxCat.textContent = cat;

      if (lightboxWa) {
        lightboxWa.href = `https://wa.me/919239019039?text=Hi%20Radhashyam%20Fashion,%20I%20am%20interested%20in%20this%20style:%20${encodeURIComponent(title)}`;
      }

      if (lightboxModal) {
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // ------------------------------------------------------------------------
  // 5. COPY ADDRESS TO CLIPBOARD
  // ------------------------------------------------------------------------
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  const storeAddressText = document.getElementById('store-address-text');

  if (copyAddressBtn && storeAddressText) {
    copyAddressBtn.addEventListener('click', () => {
      const address = storeAddressText.textContent.trim();
      navigator.clipboard.writeText(address).then(() => {
        const originalText = copyAddressBtn.innerHTML;
        copyAddressBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        copyAddressBtn.style.color = '#2e7d32';

        setTimeout(() => {
          copyAddressBtn.innerHTML = originalText;
          copyAddressBtn.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  // ------------------------------------------------------------------------
  // 6. SMOOTH SCROLLING FOR INTERNAL ANCHOR LINKS
  // ------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
