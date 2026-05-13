const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const videoPlayer = document.querySelector("[data-video-player]");
const videoTitle = document.querySelector("[data-video-title]");
const videoVocalist = document.querySelector("[data-video-vocalist]");
const videoVenue = document.querySelector("[data-video-venue]");
const videoSlate = document.querySelector("[data-video-slate]");
const videoOptions = document.querySelectorAll("[data-video-option]");

const renderFeaturedVideo = (option) => {
  if (!videoPlayer || !videoTitle || !videoVocalist || !videoVenue || !videoSlate) {
    return;
  }

  const { title, vocalist, venue, note, embed } = option.dataset;

  videoTitle.textContent = title;
  videoVocalist.textContent = vocalist;
  videoVenue.textContent = venue;

  if (embed) {
    videoPlayer.innerHTML = `
      <iframe
        src="${embed}"
        title="${title}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    `;
  } else {
    videoPlayer.innerHTML = `
      <div class="featured-player__slate">
        <span class="featured-player__play" aria-hidden="true"></span>
        <p data-video-slate>${note}</p>
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
