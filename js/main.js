/**
 * MUHAMMED SAHL - AI CONTENT CREATOR PORTFOLIO
 * Main Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  /* ------------------------------------------------------------------------
     1. Ambient Glow Follower
     ------------------------------------------------------------------------ */
  const ambientGlow = document.getElementById('ambientGlow');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 3;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateAmbientGlow() {
    // Smooth lerp
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    if (ambientGlow) {
      ambientGlow.style.left = `${currentX}px`;
      ambientGlow.style.top = `${currentY}px`;
    }
    requestAnimationFrame(updateAmbientGlow);
  }
  updateAmbientGlow();

  /* ------------------------------------------------------------------------
     2. Sticky Header & Scroll Spy
     ------------------------------------------------------------------------ */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Sticky header style
    if (scrollY > 250) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy for active link
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  /* ------------------------------------------------------------------------
     3. Mobile Navigation Drawer
     ------------------------------------------------------------------------ */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-footer a');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  drawerLinks.forEach((link) => link.addEventListener('click', closeDrawer));

  /* ------------------------------------------------------------------------
     4. 3D Rotating Wheel Carousel for Projects
     ------------------------------------------------------------------------ */
  const carouselStage = document.getElementById('projectsCarouselStage');
  const wheelCards = Array.from(document.querySelectorAll('.projects-wheel-track .project-card'));
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const indicators = document.querySelectorAll('.carousel-indicator');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const totalCards = wheelCards.length || 4;
  let activeIndex = 0; // 0 = Nesto Ads (first in center)

  function updateWheelCarousel() {
    wheelCards.forEach((card, idx) => {
      let rel = (idx - activeIndex) % totalCards;
      if (rel < 0) rel += totalCards;
      card.setAttribute('data-wheel-pos', rel);

      // Accessibility & active state
      if (rel === 0) {
        card.setAttribute('aria-hidden', 'false');
        card.classList.add('is-active-card');
      } else {
        card.setAttribute('aria-hidden', 'true');
        card.classList.remove('is-active-card');
      }
    });

    // Update bottom indicator pills
    indicators.forEach((indicator) => {
      const indIdx = parseInt(indicator.getAttribute('data-index'), 10);
      if (indIdx === activeIndex) {
        indicator.classList.add('active');
        indicator.setAttribute('aria-selected', 'true');
      } else {
        indicator.classList.remove('active');
        indicator.setAttribute('aria-selected', 'false');
      }
    });
  }

  function rotateNext() {
    activeIndex = (activeIndex + 1) % totalCards;
    updateWheelCarousel();
  }

  function rotatePrev() {
    activeIndex = (activeIndex - 1 + totalCards) % totalCards;
    updateWheelCarousel();
  }

  function rotateToIndex(targetIndex) {
    if (targetIndex >= 0 && targetIndex < totalCards) {
      activeIndex = targetIndex;
      updateWheelCarousel();
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      rotateNext();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      rotatePrev();
    });
  }

  indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
      const targetIdx = parseInt(indicator.getAttribute('data-index'), 10);
      rotateToIndex(targetIdx);
    });
  });

  // Filter Buttons Behavior
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');

      if (filterValue === 'product') {
        // Delizia Milma is at index 3
        rotateToIndex(3);
      } else if (filterValue === 'brand') {
        // If current card is not a brand ad, rotate to Nesto (0)
        if (activeIndex === 3) {
          rotateToIndex(0);
        }
      }
    });
  });

  // Touch swipe support for mobile
  if (carouselStage) {
    let touchStartX = 0;
    let touchStartY = 0;
    carouselStage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    carouselStage.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          rotateNext(); // Swipe left -> Next video
        } else {
          rotatePrev(); // Swipe right -> Prev video
        }
      }
    }, { passive: true });
  }

  // Keyboard navigation when carousel section is focused/hovered
  window.addEventListener('keydown', (e) => {
    if (document.getElementById('projectModal')?.classList.contains('open')) return;
    const projectsSec = document.getElementById('projects');
    if (!projectsSec) return;
    const rect = projectsSec.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      if (e.key === 'ArrowRight') {
        rotateNext();
      } else if (e.key === 'ArrowLeft') {
        rotatePrev();
      }
    }
  });

  // Initialize carousel on load
  updateWheelCarousel();

  /* ------------------------------------------------------------------------
     5. Project Lightbox & Interactive Video Player Simulation
     ------------------------------------------------------------------------ */
  const projectData = {
    nesto: {
      title: 'NESTO ADS',
      subtitle: 'Heartfelt Family Commercial Brand Showcase',
      category: 'Brand Commercial',
      year: '2026 Commercial Production',
      image: 'assets/images/project-nesto.jpg',
      video: 'assets/videos/nesto-ad.mov',
      tools: ['Seedance 2.5', 'Claude', 'CapCut'],
      description: 'A cinematic, emotionally resonant commercial spot crafted for Nesto, capturing family warmth, cozy home living, and heartfelt brand presence. Designed for high engagement across Meta Ads and digital channels.',
      conceptBrief: 'The client needed an emotionally engaging family campaign for Nesto. By utilizing Claude for creative narrative development and prompt architecture, alongside Seedance 2.5 for cinematic character rendering, volumetric lighting, and realistic emotional cues, we achieved high-end commercial storytelling.',
      deliverables: ['15s Social Hook Version (9:16)', '30s Full Campaign Commercial (16:9)', 'High-Res Digital Banner Stills'],
      duration: '0:30'
    },
    abba: {
      title: 'ABBA PERFUME',
      subtitle: 'Luxury Fragrance Atmospheric Commercial',
      category: 'Luxury Brand Ad',
      year: '2026 Brand Campaign',
      image: 'assets/images/project-abba-perfume.jpg',
      video: 'assets/videos/abba-perfume.mov',
      tools: ['Kling 4.0', 'Chat GPT', 'CapCut'],
      description: 'A sensual, high-prestige perfume commercial highlighting the tactile beauty of geometric flacon glass, amber liquid luminance, and suspended golden mist particles in zero-gravity motion.',
      conceptBrief: 'Engineered specifically for luxury digital marketing. Utilizing Chat GPT for atmospheric visual storytelling concepts and Kling 4.0 for fluid cinematic motion, liquid amber luminance, and golden reflections, completed with CapCut for sound pacing.',
      deliverables: ['Cinematic Brand Commercial (0:25)', 'Looping Luxury Social Teasers', 'Print-Ready 8K Campaign Stills'],
      duration: '0:25'
    },
    karak: {
      title: 'AL KARAK',
      subtitle: 'Winter Season Atmosphere Commercial',
      category: 'Brand Commercial',
      year: '2026 Winter Campaign',
      image: 'assets/images/project-al-karak.jpg',
      video: 'assets/videos/al-karak.mov',
      tools: ['Seedance 2.5', 'Claude', 'CapCut'],
      description: 'A cozy, atmospheric winter season commercial for Al Karak tea, capturing warm desert camp gatherings, glowing vintage lantern embers, steaming authentic Karak flask, and seasonal brand storytelling.',
      conceptBrief: 'Crafted specifically for the winter season campaign. Claude guided the evocative cultural storytelling and sensory prompting, while Seedance 2.5 rendered photorealistic steam, golden lantern illumination, and traditional majlis atmosphere, finished in CapCut with cozy ambient sound design.',
      deliverables: ['Cinematic Brand Commercial', 'Winter Social Media Hook (9:16)', 'High-Res Campaign Stills'],
      duration: '0:30'
    },
    milma: {
      title: 'DELIZIA MILMA',
      subtitle: 'Premium Chocolate Product Ad Commercial',
      category: 'Product Commercial',
      year: '2026 Product Campaign',
      image: 'assets/images/project-delizia-milma.jpg',
      video: 'assets/videos/delizia-milma.mp4',
      tools: ['Flow', 'Claude', 'CapCut'],
      description: 'A luxurious, mouthwatering product ad for Milma Delizia Almonds & Orange chocolate bar. Features rich fluid chocolate textures, vibrant zesty orange bursts, and crisp golden almond detailing.',
      conceptBrief: 'Crafted as a high-end food & beverage product commercial. Claude assisted in script pacing and sensory appetite-appeal prompting, while Flow generated photorealistic fluid chocolate motion and dynamic lighting, perfected in CapCut with crisp sound design.',
      deliverables: ['Cinematic Product Commercial (0:30)', '15s Social Media Reel Cut', 'Ultra HD Product Stills'],
      duration: '0:30'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    const mediaHtml = data.video ? `
      <div class="modal-media-wrapper has-video">
        <video id="modalRealVideo" class="modal-real-video" controls autoplay playsinline preload="auto" poster="${data.image}">
          <source src="${data.video}" type="video/mp4">
          <source src="${data.video}" type="video/quicktime">
          Your browser does not support HTML5 video.
        </video>
        <div class="video-ambient-glow"></div>
      </div>
    ` : `
      <div class="modal-media-wrapper">
        <img src="${data.image}" alt="${data.title}" id="modalPlayerImg">
        <div class="simulated-player-overlay">
          <div class="sim-player-top">
            <span class="sim-live-badge">
              <span class="pulse-indicator"></span>
              <span>4K CINEMATIC PREVIEW</span>
            </span>
            <span class="tool-tag">${data.year}</span>
          </div>
          
          <button class="sim-play-center" id="simPlayBtn" title="Play / Pause preview">
            <i data-lucide="play" id="playIcon"></i>
          </button>

          <div class="sim-player-controls">
            <span id="playerTimer">0:00</span>
            <div class="sim-progress-bar">
              <div class="sim-progress-fill" id="playerProgress" style="width: 0%;"></div>
            </div>
            <span>${data.duration}</span>
            <button class="btn-copy" id="soundToggleBtn" title="Audio Sync Simulated" style="width: 30px; height: 30px;">
              <i data-lucide="volume-2"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    modalBody.innerHTML = `
      ${mediaHtml}

      <div class="modal-details-grid">
        <div class="modal-main-info">
          <div class="modal-meta-pills">
            <span class="modal-pill">${data.category}</span>
            <span class="modal-pill">${data.subtitle}</span>
          </div>
          <h2 class="modal-title">${data.title}</h2>
          <p class="modal-desc">${data.description}</p>

          <h4 style="color: #ffffff; margin-bottom: 0.5rem; font-size: 1.05rem;">Creative Concept & Production</h4>
          <p class="modal-desc" style="font-size: 0.92rem;">${data.conceptBrief}</p>

          <h4 style="color: #ffffff; margin-bottom: 0.6rem; font-size: 1.05rem;">Deliverables Included</h4>
          <ul style="list-style: none; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.4rem;">
            ${data.deliverables.map(deliv => `<li style="display:flex; align-items:center; gap:0.5rem; font-size:0.88rem; color:var(--text-secondary);"><i data-lucide="check" style="width:14px; height:14px; color:var(--accent-amber);"></i> ${deliv}</li>`).join('')}
          </ul>
        </div>

        <div class="modal-side-info">
          <div class="modal-side-title">AI Engines & Software</div>
          <div class="modal-tool-chips">
            ${data.tools.map(tool => `<span class="modal-tool-chip">${tool}</span>`).join('')}
          </div>

          <div class="modal-cta-box">
            <a href="#contact" class="btn-primary w-full" id="modalDiscussBtn">
              <span>Discuss Similar Project</span>
              <i data-lucide="arrow-up-right"></i>
            </a>
            <button class="btn-secondary w-full" id="modalShareBtn">
              <span>Share Project</span>
              <i data-lucide="share-2"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (window.lucide) lucide.createIcons();

    // Video Player or Simulated Player Logic
    if (data.video) {
      const realVideo = document.getElementById('modalRealVideo');
      if (realVideo) {
        realVideo.play().catch(() => {
          // Autoplay handled by browser permission
        });
      }
    } else {
      initSimulatedPlayer(data.duration);
    }

    // Modal action listeners
    const modalDiscussBtn = document.getElementById('modalDiscussBtn');
    if (modalDiscussBtn) {
      modalDiscussBtn.addEventListener('click', () => {
        closeProjectModal();
      });
    }

    const modalShareBtn = document.getElementById('modalShareBtn');
    if (modalShareBtn) {
      modalShareBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          showToast(`Link to ${data.title} copied!`);
        }
      });
    }
  }

  function closeProjectModal() {
    projectModal.classList.remove('open');
    document.body.style.overflow = '';
    if (simPlayerInterval) clearInterval(simPlayerInterval);
    const video = document.getElementById('modalRealVideo');
    if (video) {
      video.pause();
    }
  }

  // Simulated Player Interval
  let simPlayerInterval = null;
  function initSimulatedPlayer(totalDurationStr) {
    const playBtn = document.getElementById('simPlayBtn');
    const playIcon = document.getElementById('playIcon');
    const progressBar = document.getElementById('playerProgress');
    const timerText = document.getElementById('playerTimer');
    let isPlaying = false;
    let currentSeconds = 0;

    // Parse seconds
    const parts = totalDurationStr.split(':');
    const totalSeconds = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;

        if (isPlaying) {
          playIcon.setAttribute('data-lucide', 'pause');
          if (window.lucide) lucide.createIcons();

          simPlayerInterval = setInterval(() => {
            currentSeconds++;
            if (currentSeconds > totalSeconds) {
              currentSeconds = 0;
            }
            const mins = Math.floor(currentSeconds / 60);
            const secs = currentSeconds % 60;
            timerText.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            const percentage = (currentSeconds / totalSeconds) * 100;
            progressBar.style.width = `${percentage}%`;
          }, 1000);
        } else {
          playIcon.setAttribute('data-lucide', 'play');
          if (window.lucide) lucide.createIcons();
          clearInterval(simPlayerInterval);
        }
      });
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // Attach 3D wheel card click triggers:
  // - Clicking a side/back card rotates it smoothly to the front center
  // - Clicking the active front card (or its Watch button) opens the video modal
  wheelCards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      const relPos = parseInt(card.getAttribute('data-wheel-pos'), 10);
      const isWatchBtn = e.target.closest('.btn-project-view') || e.target.closest('.play-badge');

      if (relPos !== 0 && !isWatchBtn) {
        // Rotate this card to front center
        e.preventDefault();
        e.stopPropagation();
        rotateToIndex(idx);
      } else {
        // Open modal
        const pId = card.getAttribute('data-project-id');
        openProjectModal(pId);
      }
    });
  });

  /* ------------------------------------------------------------------------
     6. Service Selector in Contact Form
     ------------------------------------------------------------------------ */
  const servicePills = document.querySelectorAll('.service-select-pill');
  const serviceInput = document.getElementById('selectedServiceInput');

  servicePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      servicePills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const selected = pill.getAttribute('data-service');
      if (serviceInput) serviceInput.value = selected;
    });
  });

  /* ------------------------------------------------------------------------
     7. Copy Email with Animated Tooltip
     ------------------------------------------------------------------------ */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyTooltip = document.getElementById('copyTooltip');
  const emailText = document.getElementById('emailText');

  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', () => {
      const textToCopy = emailText.textContent.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        copyTooltip.classList.add('show');
        showToast('Email address copied to clipboard!');
        setTimeout(() => {
          copyTooltip.classList.remove('show');
        }, 2200);
      }).catch(() => {
        showToast('Email: muhammedsahl92@gmail.com');
      });
    });
  }

  /* ------------------------------------------------------------------------
     8. Toast Notification System
     ------------------------------------------------------------------------ */
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimeout = null;

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  /* ------------------------------------------------------------------------
     9. Interactive Contact Form Submission
     ------------------------------------------------------------------------ */
  const inquiryForm = document.getElementById('inquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userName = document.getElementById('userName').value;
      const userEmail = document.getElementById('userEmail').value;
      const service = serviceInput ? serviceInput.value : 'AI Video Creation';
      const details = document.getElementById('projectDetails').value;

      // Construct mailto link as fallback for immediate email client opening
      const subject = encodeURIComponent(`Project Inquiry: ${service} for ${userName}`);
      const body = encodeURIComponent(`Hi Muhammed Sahl,\n\nMy name is ${userName} (${userEmail}).\n\nI am interested in your ${service} services.\n\nProject details:\n${details}\n\nLooking forward to collaborating!`);
      
      showToast(`Thank you, ${userName}! Opening your email client...`);

      setTimeout(() => {
        window.location.href = `mailto:muhammedsahl92@gmail.com?subject=${subject}&body=${body}`;
        inquiryForm.reset();
      }, 900);
    });
  }

  /* ------------------------------------------------------------------------
     10. 3D Tilt Effect on Desktop
     ------------------------------------------------------------------------ */
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  /* ------------------------------------------------------------------------
     11. Back to Top Smooth Scroll
     ------------------------------------------------------------------------ */
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------------
     12. About Section Scroll Reveal (Rising Lines & Zoom-in Animation)
     ------------------------------------------------------------------------ */
  const aboutRevealItems = document.querySelectorAll('.about-reveal');
  if (aboutRevealItems.length > 0) {
    if ('IntersectionObserver' in window) {
      const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          } else if (entry.boundingClientRect.top > window.innerHeight) {
            // Re-arm animation when scrolled back up above the section
            entry.target.classList.remove('is-revealed');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      });

      aboutRevealItems.forEach((item) => {
        aboutObserver.observe(item);
      });
    } else {
      aboutRevealItems.forEach((item) => item.classList.add('is-revealed'));
    }
  }

  /* ------------------------------------------------------------------------
     13. Interactive Hanging Spider on Web (From 2nd Page to Last Page Descent)
     ------------------------------------------------------------------------ */
  const spiderContainer = document.getElementById('scrollSpider');
  const spiderThread = document.getElementById('spiderThread');
  const spiderBody = document.getElementById('spiderBody');
  const aboutSection = document.getElementById('about');

  if (spiderContainer && spiderThread && spiderBody && aboutSection) {
    let targetSpiderY = 35;
    let currentSpiderY = 35;
    let swingAngle = 0;
    let isMoving = false;
    let scareOffset = 0;
    let lastScrollY = window.pageYOffset;

    function updateSpider() {
      const scrollY = window.pageYOffset;
      const windowH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const aboutTop = aboutSection.offsetTop;

      // Start descending as soon as user approaches Page 2 (About section)
      const startDescent = Math.max(aboutTop - windowH * 0.4, 50);
      const endDescent = Math.max(docH - windowH - 20, startDescent + 200);

      // Check if user is at or past Page 2 (About)
      if (scrollY >= startDescent) {
        spiderContainer.classList.add('is-active');
        const progress = Math.min(Math.max((scrollY - startDescent) / (endDescent - startDescent), 0), 1);

        // Maximum travel range on viewport: descends from top of viewport to bottom
        const isMobile = window.innerWidth <= 768;
        const spiderHeight = isMobile ? 36 : 64;
        const minY = isMobile ? 25 : 35;
        const maxY = Math.max(windowH - spiderHeight - (isMobile ? 35 : 55), minY + 60);

        targetSpiderY = minY + progress * (maxY - minY) + scareOffset;
      } else {
        // In Hero section (Page 1): Hide spider above viewport
        spiderContainer.classList.remove('is-active');
        targetSpiderY = -90;
      }

      // Smooth descent physics (Lerp)
      const diff = targetSpiderY - currentSpiderY;
      currentSpiderY += diff * 0.085;

      // Dynamic velocity calculation for swing physics
      const scrollDelta = scrollY - lastScrollY;
      lastScrollY = scrollY;
      isMoving = Math.abs(diff) > 0.8 || Math.abs(scrollDelta) > 0.5;

      // Realistic pendulum swing motion when scrolling
      const time = Date.now() / 220;
      const swingIntensity = isMoving ? Math.min(Math.abs(scrollDelta) * 0.25 + 5.5, 12) : 1.8;
      swingAngle = Math.sin(time) * swingIntensity;

      // Apply transform to spider and stretch the silk thread
      spiderBody.style.transform = `translateX(-50%) translateY(${currentSpiderY.toFixed(1)}px) rotate(${swingAngle.toFixed(2)}deg)`;
      const threadH = Math.max(currentSpiderY + (window.innerWidth <= 768 ? 16 : 28), 0);
      spiderThread.style.height = `${threadH.toFixed(1)}px`;

      requestAnimationFrame(updateSpider);
    }

    // Playful mouse interactivity on spider (desktop)
    spiderBody.addEventListener('mouseenter', () => {
      scareOffset = -50; // jumps up on surprise
      setTimeout(() => {
        scareOffset = 0;
      }, 650);
    });

    spiderBody.addEventListener('click', () => {
      scareOffset = -70;
      setTimeout(() => {
        scareOffset = 0;
      }, 700);
    });

    updateSpider();
  }
});
