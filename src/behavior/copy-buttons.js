export const initCopyButtons = () => {
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
