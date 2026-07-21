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
            <h3 class="profile-card__name">${escapeHtml(musician.name)}</h3>
            <div class="profile-card__role">${escapeHtml(musician.role)}</div>
            <p>${escapeHtml(musician.bio)}</p>
            <p class="reflection">
              <span>Musical connection</span>
              ${escapeHtml(musician.reflection)}
            </p>
            <span class="audio-teaser__heading">Selected Song</span>
            <div class="audio-teaser${hasAudioEmbed ? "" : " audio-teaser--empty"}" aria-label="Selected song">
              <span class="audio-teaser__icon" aria-hidden="true"></span>
              <div>
                <strong>${escapeHtml(musician.audio?.title)}</strong>
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
