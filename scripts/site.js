const content = window.GLP_CONTENT || {};

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const renderSiteSettings = () => {
  const email = content.site?.bookingEmail;

  if (!email) {
    return;
  }

  document.querySelectorAll("[data-booking-email]").forEach((link) => {
    link.href = `mailto:${email}`;
    link.textContent = email;
  });

  document.querySelectorAll("[data-booking-copy]").forEach((button) => {
    button.dataset.copy = email;
  });
};

const renderAbout = () => {
  const target = document.querySelector("[data-about-content]");
  const about = content.site?.about;

  if (!target || !about) {
    return;
  }

  target.innerHTML = `
    <figure class="about-portrait">
      <img
        src="${escapeHtml(about.image)}"
        alt="${escapeHtml(about.imageAlt)}"
        loading="lazy"
        decoding="async"
      >
    </figure>

    <div class="about-copy">
      <p class="eyebrow">${escapeHtml(about.eyebrow)}</p>
      <h2 id="about-title">${escapeHtml(about.title)}</h2>
      ${about.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    </div>
  `;
};

const renderVideos = () => {
  const intro = document.querySelector("[data-featured-video-intro]");
  const target = document.querySelector("[data-video-options]");

  if (intro && content.site?.featuredVideoIntro) {
    intro.textContent = content.site.featuredVideoIntro;
  }

  if (!target || !content.videos?.length) {
    return;
  }

  target.innerHTML = content.videos
    .map(
      (video, index) => `
        <button
          class="performance-selector__item${index === 0 ? " is-active" : ""}"
          type="button"
          data-video-option
          data-title="${escapeHtml(video.title)}"
          data-vocalist="${escapeHtml(video.vocalist)}"
          data-venue="${escapeHtml(video.venue)}"
          data-note="${escapeHtml(video.note)}"
          data-embed="${escapeHtml(video.embed)}"
          aria-pressed="${index === 0 ? "true" : "false"}"
        >
          <span class="performance-selector__thumb" aria-hidden="true"></span>
          <span>
            <strong>${escapeHtml(video.title)}</strong>
            <small>${escapeHtml(video.label)}</small>
          </span>
        </button>
      `
    )
    .join("");
};

const renderMusicians = () => {
  const target = document.querySelector("[data-musicians]");

  if (!target || !content.musicians?.length) {
    return;
  }

  target.innerHTML = content.musicians
    .map((musician) => {
      const hasAudioEmbed = Boolean(musician.audio?.embed);

      return `
        <article class="profile-card">
          <img
            class="portrait-image"
            src="${escapeHtml(musician.image)}"
            alt="${escapeHtml(musician.name)}"
            loading="lazy"
            decoding="async"
          >
          <div class="profile-card__body">
            <p class="profile-card__role">${escapeHtml(musician.role)}</p>
            <h3>${escapeHtml(musician.name)}</h3>
            <p>${escapeHtml(musician.bio)}</p>
            <p class="reflection">
              <span>Musical connection</span>
              ${escapeHtml(musician.reflection)}
            </p>
            <div class="audio-teaser${hasAudioEmbed ? "" : " audio-teaser--empty"}" aria-label="Featured audio placeholder">
              <span class="audio-teaser__icon" aria-hidden="true"></span>
              <div>
                <strong>${escapeHtml(musician.audio?.title)}</strong>
                <small>${escapeHtml(musician.audio?.label)}</small>
              </div>
              ${
                hasAudioEmbed
                  ? `<iframe
                      class="soundcloud-player"
                      title="${escapeHtml(musician.audio.title)} on SoundCloud"
                      scrolling="no"
                      loading="lazy"
                      allow="autoplay"
                      src="${escapeHtml(musician.audio.embed)}"
                    ></iframe>`
                  : ""
              }
            </div>
          </div>
        </article>
      `;
    })
    .join("");
};

const renderPerformances = () => {
  const target = document.querySelector("[data-performances]");

  if (!target || !content.performances?.length) {
    return;
  }

  target.innerHTML = content.performances
    .map(
      (performance) => `
        <article class="performance-item${performance.featured ? " performance-item--booking" : ""}">
          <time datetime="${escapeHtml(performance.datetime)}">${escapeHtml(performance.label)}</time>
          <div>
            <h3>${escapeHtml(performance.title)}</h3>
            <p>${escapeHtml(performance.body)}</p>
            ${performance.note ? `<p class="performance-note">${escapeHtml(performance.note)}</p>` : ""}
          </div>
        </article>
      `
    )
    .join("");
};

const renderEpkCards = () => {
  const target = document.querySelector("[data-epk-cards]");
  const cards = content.site?.epkCards;
  const email = content.site?.bookingEmail || "booking@example.com";

  if (!target || !cards?.length) {
    return;
  }

  target.innerHTML = cards
    .map((card) => {
      const listItems = [
        ...(card.links || []).map(
          (link) => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`
        ),
        ...(card.items || []).map((item) => `<li>${escapeHtml(item)}</li>`)
      ].join("");

      return `
        <article class="info-card">
          <p class="eyebrow">${escapeHtml(card.eyebrow)}</p>
          <h2>${escapeHtml(card.title)}</h2>
          ${card.body ? `<p>${escapeHtml(card.body)}</p>` : ""}
          ${listItems ? `<ul class="plain-list">${listItems}</ul>` : ""}
          ${
            card.contact
              ? `<p><a href="mailto:${escapeHtml(email)}" data-booking-email>${escapeHtml(email)}</a></p>
                 <button class="copy-button copy-button--dark" type="button" data-copy="${escapeHtml(email)}" data-booking-copy aria-live="polite">
                   Copy email
                 </button>`
              : ""
          }
        </article>
      `;
    })
    .join("");
};

const renderStagePlot = () => {
  const diagram = document.querySelector("[data-stage-diagram]");
  const tech = document.querySelector("[data-stage-tech]");
  const stagePlot = content.stagePlot;

  if (diagram && stagePlot?.positions?.length) {
    diagram.innerHTML = `
      <div class="stage-diagram__back">Backline / shared instruments</div>
      ${stagePlot.positions.map((position) => `<div>${escapeHtml(position)}</div>`).join("")}
      <div class="stage-diagram__front">Audience</div>
    `;
  }

  if (tech && stagePlot) {
    tech.innerHTML = `
      <article>
        <h2>Baseline needs</h2>
        <ul class="plain-list">
          ${stagePlot.baselineNeeds.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>

      <article>
        <h2>Notes</h2>
        <p>${escapeHtml(stagePlot.note)}</p>
      </article>
    `;
  }
};

const renderContent = () => {
  renderSiteSettings();
  renderAbout();
  renderVideos();
  renderMusicians();
  renderPerformances();
  renderEpkCards();
  renderStagePlot();
};

const initReveal = () => {
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
};

const initFeaturedVideo = () => {
  const videoPlayer = document.querySelector("[data-video-player]");
  const videoTitle = document.querySelector("[data-video-title]");
  const videoVocalist = document.querySelector("[data-video-vocalist]");
  const videoVenue = document.querySelector("[data-video-venue]");
  const videoOptions = document.querySelectorAll("[data-video-option]");

  const renderFeaturedVideo = (option) => {
    if (!videoPlayer || !videoTitle || !videoVocalist || !videoVenue) {
      return;
    }

    const { title, vocalist, venue, note, embed } = option.dataset;

    videoTitle.textContent = title;
    videoVocalist.textContent = vocalist;
    videoVenue.textContent = venue;

    if (embed) {
      videoPlayer.innerHTML = `
        <iframe
          src="${escapeHtml(embed)}"
          title="${escapeHtml(title)}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      `;
    } else {
      videoPlayer.innerHTML = `
        <div class="featured-player__slate">
          <span class="featured-player__play" aria-hidden="true"></span>
          <p data-video-slate>${escapeHtml(note)}</p>
        </div>
      `;
    }
  };

  videoOptions.forEach((option) => {
    option.addEventListener("click", () => {
      videoOptions.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-pressed", "false");
      });

      option.classList.add("is-active");
      option.setAttribute("aria-pressed", "true");
      renderFeaturedVideo(option);
    });
  });

  if (videoOptions.length) {
    renderFeaturedVideo(videoOptions[0]);
  }
};

const initCopyButtons = () => {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    const originalText = button.textContent.trim();

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        button.textContent = "Copied";
        window.setTimeout(() => {
          button.textContent = originalText;
        }, 1800);
      } catch {
        button.textContent = button.dataset.copy;
      }
    });
  });
};

renderContent();
initReveal();
initFeaturedVideo();
initCopyButtons();
