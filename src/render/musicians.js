import { escapeHtml } from "../utils/escape-html.js";

export const renderMusicians = ({ musicians }) => {
  const target = document.querySelector("[data-musicians]");

  if (!target || !musicians?.length) {
    return;
  }

  target.innerHTML = musicians
    .map(
      (musician) => `
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
            <p class="profile-card__bio">${escapeHtml(musician.bio)}</p>
            <p class="reflection">
              <span>Musical connection</span>
              ${escapeHtml(musician.reflection)}
            </p>
          </div>
        </article>
      `
    )
    .join("");
};
