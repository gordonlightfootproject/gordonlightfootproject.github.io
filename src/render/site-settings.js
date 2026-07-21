export const renderSiteSettings = ({ site }) => {
  const email = site?.bookingEmail;

  if (!email) {
    document
      .querySelectorAll("[data-booking-email], [data-booking-copy]")
      .forEach((element) => {
        element.hidden = true;
      });
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
