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
  const drawerLinks = document.querySelectorAll('.drawer-link');

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
     4. Projects Filtering
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     5. Project Lightbox & Interactive Video Player Simulation
     ------------------------------------------------------------------------ */
  const projectData = {
    nesto: {
      title: 'NESTO ADS',
      subtitle: 'Dynamic Commercial Brand Showcase',
      category: 'Brand Commercial',
      year: '2026 Commercial Production',
      image: 'assets/images/project-nesto.jpg',
      tools: ['Kling AI', 'OmniFlash', 'Photoshop', 'CapCut'],
      description: 'A dynamic AI-driven retail commercial spot built to showcase hyper-engaging consumer products, energetic transitions, and vibrant ambient retail lighting. Created to maximize conversion and attention on Instagram Reels and Meta Ads.',
      conceptBrief: 'The client needed scroll-stopping visual energy without the prohibitive logistical costs of booking multiple supermarket soundstages. By synthesizing photorealistic environments with dynamic camera trajectories in Kling and OmniFlash, we achieved high-fashion commercial energy.',
      deliverables: ['15s Hook Version (9:16)', '30s Full Campaign Commercial (16:9)', 'High-Res Digital Banner Stills'],
      duration: '0:30'
    },
    abba: {
      title: 'ABBA PERFUME',
      subtitle: 'Luxury Fragrance Atmospheric Commercial',
      category: 'Luxury Brand Ad',
      year: '2026 Brand Campaign',
      image: 'assets/images/project-abba-perfume.jpg',
      tools: ['Nano Banana', 'OmniFlash', 'Adobe Photoshop', 'Flow'],
      description: 'A sensual, high-prestige perfume commercial highlighting the tactile beauty of geometric flacon glass, amber liquid luminance, and suspended golden mist particles in zero-gravity motion.',
      conceptBrief: 'Engineered specifically for luxury digital marketing. The concept focuses on sensory visual cues: refraction, shimmering droplets, and rich dark obsidian reflections, elevating brand prestige and positioning.',
      deliverables: ['Cinematic Brand Reveal', 'Looping Luxury Social Teasers', 'Print-Ready 8K Campaign Stills'],
      duration: '0:25'
    },
    dinosaur: {
      title: 'DINOSAUR STORY',
      subtitle: 'Photorealistic Prehistoric AI Short Film',
      category: 'Cinematic Narrative',
      year: '2026 Film Experiment',
      image: 'assets/images/project-dinosaur.jpg',
      tools: ['Seedance', 'Kling AI', 'Claude 3.7', 'CapCut Pro'],
      description: 'A breathtaking cinematic still-to-motion journey into primeval Earth. Follows a towering Tyrannosaurus Rex navigating dense foggy Jurassic jungles with volumetric lighting and lifelike scale.',
      conceptBrief: 'Exploring multi-shot visual consistency and emotional camera framing. Claude was used to generate detailed visual worldbuilding prompts and narrative arc, which were rendered across Seedance and Kling with 35mm anamorphic film simulation.',
      deliverables: ['Full Short Film Sequence', 'Cinematic Sound Design & Pacing', 'Worldbuilding Concept Art Deck'],
      duration: '1:15'
    },
    noah: {
      title: 'NOAH ARC STORY TELLING',
      subtitle: 'Epic Mythic Scale Visual Journey',
      category: 'Epic Visual Story',
      year: '2026 Narrative Production',
      image: 'assets/images/project-noah-arc.jpg',
      tools: ['Gemini', 'Kling AI', 'Flow', 'CapCut'],
      description: 'A colossal mythic drama depicting the biblical ark braving towering tempestuous oceans beneath stormy heavens illuminated by divine golden god-rays.',
      conceptBrief: 'A study in monumental scale and emotional lighting. Gemini assisted in historical research and script sequencing, while generative fluid physics and atmospheric volumetric shaders brought the roaring ocean waves and timber fortress to life.',
      deliverables: ['Episodic Visual Reel Series', 'Narrative Voiceover Integration', 'Cinematic Wallpapers'],
      duration: '1:45'
    },
    fahad: {
      title: 'FAHAD FASIL HIGGSFIELD',
      subtitle: 'AI Character Motion & Neo-Noir Portrait Reel',
      category: 'Experimental Reel',
      year: '2026 Character Study',
      image: 'assets/images/project-fahad-fasil.jpg',
      tools: ['Higgsfield', 'ChatGPT', 'Adobe Photoshop', 'CapCut'],
      description: 'A high-contrast cinematic tribute capturing actor Fahad Faasil\'s iconic expressive intensity. Utilizes AI motion synthesis, moody neo-noir rim lighting, and intense micro-expressions.',
      conceptBrief: 'Pioneering AI character acting consistency and nuanced facial emotional control. We used Higgsfield and custom prompt conditioning to reproduce realistic gaze shifts, pupil dilations, and dramatic shadows without the uncanny valley.',
      deliverables: ['High-Contrast Character Teaser', 'Facial Nuance Study', 'Editorial Poster Series'],
      duration: '0:20'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalBody.innerHTML = `
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

    // Simulated Video Player Logic
    initSimulatedPlayer(data.duration);

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

  // Attach card click triggers
  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const pId = card.getAttribute('data-project-id');
      openProjectModal(pId);
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
});
