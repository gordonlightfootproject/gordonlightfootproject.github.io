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

const renderVideos = () => {
  const target = document.querySelector("[data-video-options]");

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
          data-date="${escapeHtml(video.date)}"
          data-note="${escapeHtml(video.note)}"
          data-embed="${escapeHtml(video.embed)}"
          data-poster="${escapeHtml(video.poster)}"
          aria-pressed="${index === 0 ? "true" : "false"}"
        >
          <span class="performance-selector__thumb" aria-hidden="true">
            ${
              video.poster
                ? `<img src="${escapeHtml(video.poster)}" alt="" loading="lazy" decoding="async">`
                : ""
            }
          </span>
          <span>
            <strong>${escapeHtml(video.title)}</strong>
            <small>${escapeHtml(video.date)}</small>
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const parsePerformanceDate = (date) => {
    const parsed = new Date(`${date} 00:00:00`);
    parsed.setHours(0, 0, 0, 0);
    return parsed;
  };

  const performances = content.performances
    .map((performance) => ({
      ...performance,
      dateValue: parsePerformanceDate(performance.date)
    }))
    .filter((performance) => !Number.isNaN(performance.dateValue.getTime()));

  const upcoming = performances
    .filter((performance) => performance.dateValue >= today)
    .sort((a, b) => a.dateValue - b.dateValue);
  const previous = performances
    .filter((performance) => performance.dateValue < today)
    .sort((a, b) => b.dateValue - a.dateValue);

  const renderPerformance = (performance, group) => `
    <article class="performance-item performance-item--${group}">
      <span class="performance-date">${escapeHtml(performance.date)}</span>
      <div>
        <h3>${escapeHtml(performance.venue)}</h3>
        ${group === "upcoming" && performance.startTime ? `<p>${escapeHtml(performance.startTime)}</p>` : ""}
        ${performance.note ? `<p class="performance-note">${escapeHtml(performance.note)}</p>` : ""}
        ${
          group === "upcoming" && performance.link
            ? `<p><a href="${escapeHtml(performance.link.href)}">${escapeHtml(performance.link.label)}</a></p>`
            : ""
        }
      </div>
    </article>
  `;

  target.innerHTML = `
    <div class="performance-group-heading">Upcoming</div>
    ${
      upcoming.length
        ? upcoming.map((performance) => renderPerformance(performance, "upcoming")).join("")
        : `<article class="performance-item performance-item--upcoming performance-item--empty">
            <span class="performance-date">Soon</span>
            <div>
              <h3>New dates to be announced</h3>
              <p>Concert and listening-room details will appear here.</p>
            </div>
          </article>`
    }
    ${
      previous.length
        ? `<div class="performance-group-heading performance-group-heading--previous">
            <span aria-hidden="true"></span>
            Previous
          </div>
          ${previous.map((performance) => renderPerformance(performance, "previous")).join("")}`
        : ""
    }
  `;
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
  const videoDate = document.querySelector("[data-video-date]");
  const videoOptions = document.querySelectorAll("[data-video-option]");

  const autoplayEmbed = (embed) => {
    const url = new URL(embed, window.location.href);
    url.searchParams.set("autoplay", "1");
    url.searchParams.set("playsinline", "1");
    return url.toString();
  };

  const renderVideoFrame = ({ embed, title }) => {
    videoPlayer.innerHTML = `
      <iframe
        src="${escapeHtml(autoplayEmbed(embed))}"
        title="${escapeHtml(title)}"
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
      ></iframe>
    `;
  };

  const renderFeaturedVideo = (option) => {
    if (!videoPlayer || !videoTitle || !videoVocalist || !videoVenue || !videoDate) {
      return;
    }

    const { title, vocalist, venue, date, note, embed, poster } = option.dataset;

    videoTitle.textContent = title;
    videoVocalist.textContent = vocalist;
    videoVenue.textContent = venue;
    videoDate.textContent = date;

    if (embed) {
      videoPlayer.innerHTML = `
        <button class="featured-player__poster" type="button" aria-label="Play ${escapeHtml(title)}">
          ${
            poster
              ? `<img src="${escapeHtml(poster)}" alt="" loading="eager" decoding="async">`
              : ""
          }
          <span class="featured-player__poster-shade" aria-hidden="true"></span>
          <span class="featured-player__pick" aria-hidden="true">
            <svg viewBox="0 0 100 100" focusable="false">
              <path d="M 0,50 C 0,44 2,7.1 27,7.1 52,7.1 100,42.3 100,50 100,57.7 52,92.9 27,92.9 2,92.9 0,56 0,50 Z"></path>
            </svg>
          </span>
        </button>
      `;

      const posterButton = videoPlayer.querySelector(".featured-player__poster");
      posterButton?.addEventListener("click", () => {
        renderVideoFrame({ embed, title });
      });
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
