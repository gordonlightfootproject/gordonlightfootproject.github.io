import { escapeHtml } from "../utils/escape-html.js";

export const renderPerformances = ({ performances }) => {
  const target = document.querySelector("[data-performances]");

  if (!target || !performances?.length) {
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const parsePerformanceDate = (date) => {
    const parsed = new Date(`${date} 00:00:00`);
    parsed.setHours(0, 0, 0, 0);
    return parsed;
  };

  const datedPerformances = performances
    .map((performance) => ({
      ...performance,
      dateValue: parsePerformanceDate(performance.date)
    }))
    .filter((performance) => !Number.isNaN(performance.dateValue.getTime()));

  const upcoming = datedPerformances
    .filter((performance) => performance.dateValue >= today)
    .sort((a, b) => a.dateValue - b.dateValue);
  const previous = datedPerformances
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
