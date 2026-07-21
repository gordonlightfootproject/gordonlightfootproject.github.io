import { escapeHtml } from "../utils/escape-html.js";

export const renderMusicians = ({ musicians }) => {
  const target = document.querySelector("[data-musicians]");

  if (!target || !musicians?.length) {
    return;
  }

  target.innerHTML = musicians
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
