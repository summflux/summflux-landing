const menuToggle = document.querySelector('[data-menu-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');

function closeMobileMenu() {
  if (!menuToggle || !navMenu) return;

  menuToggle.classList.remove('active');
  navMenu.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');
}

function openMobileMenu() {
  if (!menuToggle || !navMenu) return;

  menuToggle.classList.add('active');
  navMenu.classList.add('active');
  menuToggle.setAttribute('aria-expanded', 'true');
  document.body.classList.add('no-scroll');
}

if (menuToggle && navMenu) {
  menuToggle.setAttribute('aria-expanded', 'false');

  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('active');

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) {
      closeMobileMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });
}

const carousel = document.querySelector('[data-carousel]');

if (carousel) {
  const track = carousel.querySelector('[data-carousel-track]');
  const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
  const dotsWrap = carousel.querySelector('[data-carousel-dots]');
  let activeIndex = 0;
  let timer = null;

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir para o slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.children);

  function goToSlide(index) {
    activeIndex = index;
    track.style.transform = `translateX(-${activeIndex * 100}%)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === activeIndex);
    });
  }

  function nextSlide() {
    goToSlide((activeIndex + 1) % slides.length);
  }

  function startAutoPlay() {
    stopAutoPlay();
    timer = setInterval(nextSlide, 3800);
  }

  function stopAutoPlay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);
  carousel.addEventListener('focusin', stopAutoPlay);
  carousel.addEventListener('focusout', startAutoPlay);

  goToSlide(0);
  startAutoPlay();
}

const faqItems = document.querySelectorAll('[data-faq-item]');

faqItems.forEach((item) => {
  const button = item.querySelector('[data-faq-question]');

  if (button) {
    button.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  }
});

const planButtons = document.querySelectorAll('[data-plan]');
const leadForm = document.querySelector('[data-lead-form]');

planButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!leadForm) return;

    const select = leadForm.querySelector('select[name="plano"]');
    const selectedPlan = button.getAttribute('data-plan');

    if (select && selectedPlan) {
      select.value = selectedPlan;
    }
  });
});

if (leadForm) {
  leadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const message = leadForm.querySelector('[data-form-message]');
    const submitButton = leadForm.querySelector('button[type="submit"]');
    const formData = new FormData(leadForm);

    if (message) {
      message.classList.add('show');
      message.textContent = 'Enviando formulário...';
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
    }

    try {
      const response = await fetch(leadForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Falha no envio');
      }

      leadForm.reset();

      if (message) {
        message.textContent = 'Formulário enviado com sucesso. Em breve entraremos em contato.';
      }
    } catch (error) {
      if (message) {
        message.textContent = 'Não foi possível enviar agora. Tente novamente ou envie mensagem para contato@summflux.com.';
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Solicitar contato';
      }
    }
  });
}


/* ===== Lightbox com zoom para screenshots ===== */
const zoomableImages = document.querySelectorAll('[data-zoomable-image]');

if (zoomableImages.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Visualização ampliada da imagem');

  lightbox.innerHTML = `
    <div class="image-lightbox-panel">
      <div class="image-lightbox-stage" data-lightbox-stage>
        <img class="image-lightbox-img" alt="">
      </div>
      <div class="image-lightbox-actions">
        <button type="button" data-zoom-out aria-label="Diminuir zoom">−</button>
        <button type="button" data-zoom-reset aria-label="Restaurar zoom">=</button>
        <button type="button" data-zoom-in aria-label="Aumentar zoom">+</button>
        <button type="button" data-lightbox-close aria-label="Fechar">×</button>
      </div>
      <p class="image-lightbox-caption">Use +/− para zoom, arraste a imagem ampliada e pressione ESC para fechar.</p>
    </div>
  `;

  document.body.appendChild(lightbox);

  const stage = lightbox.querySelector('[data-lightbox-stage]');
  const lightboxImage = lightbox.querySelector('.image-lightbox-img');
  const closeButton = lightbox.querySelector('[data-lightbox-close]');
  const zoomInButton = lightbox.querySelector('[data-zoom-in]');
  const zoomOutButton = lightbox.querySelector('[data-zoom-out]');
  const zoomResetButton = lightbox.querySelector('[data-zoom-reset]');

  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let lastTranslateX = 0;
  let lastTranslateY = 0;
  let lastTouchDistance = 0;

  function updateTransform() {
    lightboxImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  function resetZoom() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
  }

  function changeZoom(delta) {
    const nextScale = Math.min(Math.max(scale + delta, 1), 3.5);

    if (nextScale === 1) {
      translateX = 0;
      translateY = 0;
    }

    scale = nextScale;
    updateTransform();
  }

  function openLightbox(image) {
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || 'Imagem ampliada';
    resetZoom();
    lightbox.classList.add('active');
    document.body.classList.add('no-scroll');
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('no-scroll');
    resetZoom();
  }

  zoomableImages.forEach((image) => {
    image.setAttribute('tabindex', '0');
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `${image.alt || 'Imagem'} — clique para ampliar`);

    image.addEventListener('click', () => openLightbox(image));

    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  zoomInButton.addEventListener('click', () => changeZoom(0.35));
  zoomOutButton.addEventListener('click', () => changeZoom(-0.35));
  zoomResetButton.addEventListener('click', resetZoom);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('active')) return;

    if (event.key === 'Escape') {
      closeLightbox();
    }

    if (event.key === '+') {
      changeZoom(0.35);
    }

    if (event.key === '-') {
      changeZoom(-0.35);
    }
  });

  stage.addEventListener('wheel', (event) => {
    event.preventDefault();
    changeZoom(event.deltaY < 0 ? 0.18 : -0.18);
  }, { passive: false });

  stage.addEventListener('pointerdown', (event) => {
    if (scale <= 1) return;

    isDragging = true;
    stage.classList.add('dragging');
    startX = event.clientX;
    startY = event.clientY;
    lastTranslateX = translateX;
    lastTranslateY = translateY;
    stage.setPointerCapture(event.pointerId);
  });

  stage.addEventListener('pointermove', (event) => {
    if (!isDragging) return;

    translateX = lastTranslateX + event.clientX - startX;
    translateY = lastTranslateY + event.clientY - startY;
    updateTransform();
  });

  stage.addEventListener('pointerup', (event) => {
    isDragging = false;
    stage.classList.remove('dragging');

    if (stage.hasPointerCapture(event.pointerId)) {
      stage.releasePointerCapture(event.pointerId);
    }
  });

  stage.addEventListener('touchstart', (event) => {
    if (event.touches.length === 2) {
      const [first, second] = event.touches;
      lastTouchDistance = Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY);
    }
  }, { passive: true });

  stage.addEventListener('touchmove', (event) => {
    if (event.touches.length !== 2 || !lastTouchDistance) return;

    const [first, second] = event.touches;
    const currentDistance = Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY);
    const delta = (currentDistance - lastTouchDistance) / 260;

    changeZoom(delta);
    lastTouchDistance = currentDistance;
  }, { passive: true });
}

/* ===== Animações de entrada no scroll ===== */
(function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.documentElement.classList.add('reveal-disabled');
    return;
  }

  document.documentElement.classList.add('reveal-enabled');

  const revealSelectors = [
    '.hero-copy > .eyebrow',
    '.hero-copy h1',
    '.hero-copy .lead',
    '.hero-actions',
    '.hero-proof',
    '.product-frame',
    '.hero-note',
    '.image-hint',
    '.logos-strip p',
    '.proof-layout > *',
    '.section .eyebrow',
    '.section h2',
    '.section > .container > .lead',
    '.feature-card',
    '.proof-metric-card',
    '.demo-section .eyebrow',
    '.demo-section h2',
    '.demo-section .lead',
    '.demo-point',
    '.demo-carousel',
    '.step-card',
    '.security-card',
    '.plan-card',
    '.faq-item',
    '.contact-card',
    '.legal-hero .eyebrow',
    '.legal-hero h1',
    '.legal-hero .lead',
    '.legal-content',
    '.tutorial-video-card',
    '.footer-column',
    '.footer-bottom'
  ];

  const revealItems = Array.from(document.querySelectorAll(revealSelectors.join(',')));

  if (!revealItems.length) return;

  revealItems.forEach((element, index) => {
    if (element.classList.contains('reveal-item')) return;

    element.classList.add('reveal-item');

    const parent = element.parentElement;
    const siblingIndex = parent ? Array.from(parent.children).indexOf(element) : index;
    const delay = Math.min((siblingIndex % 6) * 70, 350);

    element.style.setProperty('--reveal-delay', `${delay}ms`);
  });

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  revealItems.forEach((element) => observer.observe(element));
})();
