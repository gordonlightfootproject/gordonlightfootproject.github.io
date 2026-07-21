import { escapeHtml } from "../utils/escape-html.js";

export const renderStagePlot = ({ stagePlot }) => {
  const diagram = document.querySelector("[data-stage-diagram]");
  const tech = document.querySelector("[data-stage-tech]");

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
