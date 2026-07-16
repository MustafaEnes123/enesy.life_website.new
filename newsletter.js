(function () {
  const CSS = `
    /* ── NEWSLETTER MODAL ── */
    .nl-wrap {
      max-width: 900px;
      margin: 0 auto;
    }

    .nl-header-img {
      width: 100%;
      max-height: 350px;
      object-fit: cover;
      border: 2px solid #000;
      margin-bottom: 36px;
      display: block;
    }

    /* ── FEATURED GRID ── */
    .nl-featured {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 2px;
      background: #000;
      border: 2px solid #000;
      margin-bottom: 56px;
    }

    .nl-card {
      background: #fff;
      padding: 28px 28px 24px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      min-height: 220px;
      position: relative;
      overflow: hidden;
      cursor: default;
      transition: background 0.2s ease;
    }
    .nl-card:hover { background: #f7f7f7; }

    .nl-card-hero {
      grid-column: 1;
      grid-row: 1 / 3;
      min-height: 440px;
    }

    .nl-card-accent {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 4px;
    }

    .nl-card-tag {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #aaa;
      margin-bottom: 10px;
    }

    .nl-card-title {
      font-size: clamp(17px, 1.8vw, 22px);
      font-weight: 800;
      color: #000;
      letter-spacing: -0.03em;
      line-height: 1.2;
      margin-bottom: 10px;
    }

    .nl-card-hero .nl-card-title {
      font-size: clamp(22px, 2.4vw, 30px);
    }

    .nl-card-excerpt {
      font-size: 13px;
      color: #666;
      line-height: 1.6;
      margin-bottom: 16px;
    }

    .nl-card-meta {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      color: #bbb;
      text-transform: uppercase;
    }

    /* ── NEWS LIST ── */
    .nl-list-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.13em;
      color: #aaa;
      padding-bottom: 14px;
      border-bottom: 2px solid #000;
      margin-bottom: 0;
    }

    .nl-list { list-style: none; }

    .nl-list-item {
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: 20px;
      padding: 22px 0;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      transition: background 0.15s;
    }
    .nl-list-item:last-child { border-bottom: none; }

    .nl-list-date {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      color: #bbb;
      text-transform: uppercase;
      padding-top: 3px;
      line-height: 1.4;
    }

    .nl-list-body {}

    .nl-list-tag {
      display: inline-block;
      font-size: 9.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #fff;
      background: #000;
      padding: 2px 8px;
      border-radius: 2px;
      margin-bottom: 7px;
    }

    .nl-list-item-title {
      font-size: 16px;
      font-weight: 800;
      color: #000;
      letter-spacing: -0.025em;
      line-height: 1.25;
      margin-bottom: 5px;
    }

    .nl-list-item-excerpt {
      font-size: 13px;
      color: #777;
      line-height: 1.55;
    }

    /* ── MOBILE ── */
    @media (max-width: 640px) {
      .nl-featured {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
      }
      .nl-card-hero { grid-column: 1; grid-row: 1; min-height: 280px; }
      .nl-card { min-height: 180px; padding: 20px; }
      .nl-list-item { grid-template-columns: 1fr; gap: 6px; }
      .nl-list-date { padding-top: 0; }
    }
  `;

  /* Inject CSS once */
  if (!document.getElementById('nl-styles')) {
    const style = document.createElement('style');
    style.id = 'nl-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  /* ── FEATURED ARTICLES ── */
  const FEATURED = [
    {
      tag: 'Milestone',
      title: 'Acceptance to The Knowledge Society: New era for next 10-months',
      excerpt: 'Starting a new journey at TKS to dive deep into emerging technologies, leadership, and solving the world\'s biggest problems over the next 10 months.',
      date: 'Jun 2026',
      accent: '#000',
      hero: true,
    },
    {
      tag: 'Publication',
      title: 'New article published: AI-Supported Learning Environments',
      excerpt: 'Exploring how artificial intelligence can transform educational workflows and create personalized, scalable learning systems for students.',
      date: 'Jun 2026',
      accent: '#000',
    },
    {
      tag: 'Education',
      title: 'Harvard\'s Computer Science: From a student\'s review',
      excerpt: 'A comprehensive look back at the CS50 curriculum, its rigorous problem sets, and how it laid the foundational engineering mindset for my projects.',
      date: 'Jun 2026',
      accent: '#000',
    },
  ];

  /* ── NEWS LIST ── */
  const NEWS_LIST = [
    {
      date: 'Apr 2026',
      tag: 'Event',
      title: 'Microsoft Student Ambassadors Event: Amazing Event with student developers',
      excerpt: 'Recap of a fantastic gathering where we shared ideas, built projects, and connected with fellow passionate developers in the Microsoft ecosystem.',
    },
    {
      date: 'Mar 2026',
      tag: 'Productivity',
      title: 'Beginning From Simple: Notion',
      excerpt: 'How mastering the basics of organization with tools like Notion can eventually scale into complex, automated team management systems.',
    },
    {
      date: 'Mar 2026',
      tag: 'Design',
      title: 'New version of command center: New black-white era!',
      excerpt: 'Unveiling the completely redesigned, ultra-minimalist interface for our core operations hub, focusing on contrast, speed, and focus.',
    },
  ];

  window.buildNewsletterHTML = function () {
    const featuredHTML = FEATURED.map((a, i) => `
      <div class="nl-card ${a.hero ? 'nl-card-hero' : ''}">
        <div class="nl-card-accent" style="background:${a.accent}"></div>
        <div class="nl-card-tag">${a.tag}</div>
        <div class="nl-card-title">${a.title}</div>
        ${a.excerpt ? `<div class="nl-card-excerpt">${a.excerpt}</div>` : ''}
        <div class="nl-card-meta">${a.date}</div>
      </div>
    `).join('');

    const listHTML = NEWS_LIST.map(n => `
      <li class="nl-list-item">
        <div class="nl-list-date">${n.date}</div>
        <div class="nl-list-body">
          <span class="nl-list-tag">${n.tag}</span>
          <div class="nl-list-item-title">${n.title}</div>
          <div class="nl-list-item-excerpt">${n.excerpt}</div>
        </div>
      </li>
    `).join('');

    return `
      <div class="nl-wrap">
        <h1 class="modal-title">Newsletter</h1>
        <img src="image.jpg" alt="Newsletter Cover" class="nl-header-img">
        <div class="nl-featured">${featuredHTML}</div>
        <div class="nl-list-title">All Articles</div>
        <ul class="nl-list">${listHTML}</ul>
      </div>
    `;
  };
})();
