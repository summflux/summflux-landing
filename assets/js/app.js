(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navMenu = document.querySelector('[data-nav-menu]');

  function track(name, params = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
  }

  function closeMenu() {
    if (!menuToggle || !navMenu) return;
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('no-scroll');
  }

  if (header) {
    const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 10);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const willOpen = !navMenu.classList.contains('active');
      menuToggle.classList.toggle('active', willOpen);
      navMenu.classList.toggle('active', willOpen);
      menuToggle.setAttribute('aria-expanded', String(willOpen));
      menuToggle.setAttribute('aria-label', willOpen ? 'Fechar menu' : 'Abrir menu');
      document.body.classList.toggle('no-scroll', willOpen);
    });
    navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => { if (window.innerWidth > 980) closeMenu(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .12 });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 45}ms`;
      observer.observe(item);
    });
  }

  const productDemo = document.querySelector('[data-product-demo]');
  if (productDemo) {
    const stages = Array.from(productDemo.querySelectorAll('[data-demo-stage]'));
    const controls = Array.from(productDemo.querySelectorAll('[data-demo-control]'));
    const order = controls.map((button) => button.dataset.demoControl);
    let activeIndex = 0;
    let timer = null;

    function showStage(name, source = 'auto') {
      const nextIndex = Math.max(order.indexOf(name), 0);
      activeIndex = nextIndex;
      stages.forEach((stage) => {
        const active = stage.dataset.demoStage === name;
        stage.hidden = !active;
        stage.classList.toggle('is-active', active);
      });
      controls.forEach((button) => {
        const active = button.dataset.demoControl === name;
        button.classList.toggle('active', active);
        button.setAttribute('aria-selected', String(active));
      });
      if (source === 'click') track('product_demo_stage', { stage: name });
    }

    function startDemo() {
      if (prefersReducedMotion || document.hidden) return;
      window.clearInterval(timer);
      timer = window.setInterval(() => {
        activeIndex = (activeIndex + 1) % order.length;
        showStage(order[activeIndex]);
      }, 4200);
    }

    controls.forEach((button) => button.addEventListener('click', () => {
      showStage(button.dataset.demoControl, 'click');
      startDemo();
    }));
    productDemo.addEventListener('mouseenter', () => window.clearInterval(timer));
    productDemo.addEventListener('mouseleave', startDemo);
    document.addEventListener('visibilitychange', startDemo);
    showStage(order[0]);
    startDemo();
  }

  document.querySelectorAll('[data-workflow-tabs]').forEach((tabs) => {
    const buttons = Array.from(tabs.querySelectorAll('[data-workflow-tab]'));
    const panels = Array.from(tabs.querySelectorAll('[data-workflow-panel]'));
    buttons.forEach((button) => button.addEventListener('click', () => {
      const target = button.dataset.workflowTab;
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      panels.forEach((panel) => {
        const active = panel.dataset.workflowPanel === target;
        panel.hidden = !active;
        panel.classList.toggle('active', active);
      });
      track('workflow_mode_selected', { mode: target });
    }));
  });

  document.querySelectorAll('[data-faq-item]').forEach((item) => {
    const button = item.querySelector('[data-faq-question]');
    if (!button) return;
    button.addEventListener('click', () => {
      const open = !item.classList.contains('open');
      item.classList.toggle('open', open);
      button.setAttribute('aria-expanded', String(open));
      const icon = button.querySelector('i');
      if (icon) icon.textContent = open ? '×' : '+';
    });
  });

  if (hasFinePointer && !prefersReducedMotion) {
    document.querySelectorAll('[data-parallax-card]').forEach((card) => {
      card.addEventListener('mousemove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(1100px) rotateX(${y * -2.2}deg) rotateY(${x * 2.8}deg) translateY(-2px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const currentParams = new URLSearchParams(window.location.search);
  const safeSessionStorage = {
    get(key) {
      try { return window.sessionStorage.getItem(key); } catch { return null; }
    },
    set(key, value) {
      try { window.sessionStorage.setItem(key, value); } catch { /* navegação privada ou storage bloqueado */ }
    }
  };
  utmKeys.forEach((key) => {
    const incoming = currentParams.get(key);
    if (incoming) safeSessionStorage.set(`summflux_${key}`, incoming.slice(0, 180));
    document.querySelectorAll(`[data-utm="${key}"]`).forEach((input) => {
      input.value = incoming || safeSessionStorage.get(`summflux_${key}`) || '';
    });
  });

  document.querySelectorAll('[data-track]').forEach((element) => {
    element.addEventListener('click', () => track('cta_click', { cta: element.dataset.track }));
  });

  const leadForm = document.querySelector('[data-lead-form]');
  if (leadForm) {
    const steps = Array.from(leadForm.querySelectorAll('[data-form-step]'));
    const progressSteps = Array.from(leadForm.querySelectorAll('.form-progress span'));
    const message = leadForm.querySelector('[data-form-message]');
    const planSelect = leadForm.querySelector('[data-plan-select]');
    let currentStep = 0;

    function showFormStep(index) {
      currentStep = Math.max(0, Math.min(index, steps.length - 1));
      steps.forEach((step, stepIndex) => {
        const active = stepIndex === currentStep;
        step.hidden = !active;
        step.classList.toggle('active', active);
      });
      progressSteps.forEach((step, stepIndex) => step.classList.toggle('active', stepIndex <= currentStep));
      const firstField = steps[currentStep].querySelector('input:not([type="hidden"]), select, textarea');
      if (firstField && currentStep > 0) window.setTimeout(() => firstField.focus({ preventScroll: true }), 80);
      track('lead_form_step_view', { step: currentStep + 1 });
    }

    function validateCurrentStep() {
      const fields = Array.from(steps[currentStep].querySelectorAll('input:not([type="hidden"]), select, textarea'));
      for (const field of fields) {
        if (!field.checkValidity()) {
          field.reportValidity();
          return false;
        }
      }
      return true;
    }

    leadForm.querySelectorAll('[data-form-next]').forEach((button) => button.addEventListener('click', () => {
      if (!validateCurrentStep()) return;
      showFormStep(currentStep + 1);
    }));
    leadForm.querySelectorAll('[data-form-prev]').forEach((button) => button.addEventListener('click', () => showFormStep(currentStep - 1)));

    const requestedPlan = currentParams.get('plano');
    if (requestedPlan && planSelect) {
      const option = Array.from(planSelect.options).find((item) => item.value.toLowerCase() === requestedPlan.toLowerCase());
      if (option) planSelect.value = option.value;
    }

    document.querySelectorAll('a[data-plan][href="#contato"]').forEach((button) => button.addEventListener('click', () => {
      if (planSelect) planSelect.value = button.dataset.plan;
    }));

    leadForm.addEventListener('focusin', () => {
      if (!leadForm.dataset.openTracked) {
        leadForm.dataset.openTracked = 'true';
        track('lead_form_started');
      }
    });

    leadForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!validateCurrentStep()) return;
      const submitButton = leadForm.querySelector('button[type="submit"]');
      const originalText = submitButton?.textContent || 'Quero ver na prática';
      if (message) {
        message.classList.add('show');
        message.textContent = 'Enviando sua solicitação…';
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando…';
      }

      try {
        const response = await fetch(leadForm.action, { method: 'POST', body: new FormData(leadForm), headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Falha no envio');
        track('lead_form_submitted', { plan: planSelect?.value || 'indefinido' });
        leadForm.reset();
        if (message) message.textContent = 'Recebemos seu contexto. A equipe entra em contato em até 1 dia útil.';
        showFormStep(0);
      } catch {
        if (message) message.textContent = 'Não foi possível enviar agora. Tente novamente ou escreva para support@summflux.com.';
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      }
    });

    showFormStep(0);
  }
})();
