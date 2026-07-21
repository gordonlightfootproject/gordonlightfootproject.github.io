import { escapeHtml } from "../utils/escape-html.js";

export const renderVideos = ({ videos }) => {
  const target = document.querySelector("[data-video-options]");

  if (!target || !videos?.length) {
    return;
  }

  target.innerHTML = videos
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

export const initFeaturedVideo = () => {
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
