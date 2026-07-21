export const renderSiteSettings = ({ site }) => {
  const email = site?.bookingEmail;

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
