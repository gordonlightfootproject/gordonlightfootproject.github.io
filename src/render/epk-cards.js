import { escapeHtml } from "../utils/escape-html.js";

export const renderEpkCards = ({ site }) => {
  const target = document.querySelector("[data-epk-cards]");
  const cards = site?.epkCards;
  const email = site?.bookingEmail;

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
            card.contact && email
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
