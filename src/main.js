import { initCopyButtons } from "./behavior/copy-buttons.js";
import { initReveal } from "./behavior/reveal.js";
import { musicians } from "./content/musicians.js";
import { performances } from "./content/performances.js";
import { site } from "./content/site-content.js";
import { stagePlot } from "./content/stage-plot.js";
import { videos } from "./content/videos.js";
import { renderEpkCards } from "./render/epk-cards.js";
import { renderMusicians } from "./render/musicians.js";
import { renderPerformances } from "./render/performances.js";
import { renderSiteSettings } from "./render/site-settings.js";
import { renderStagePlot } from "./render/stage-plot.js";
import { initFeaturedVideo, renderVideos } from "./render/videos.js";

renderSiteSettings({ site });
renderVideos({ videos });
renderMusicians({ musicians });
renderPerformances({ performances });
renderEpkCards({ site });
renderStagePlot({ stagePlot });

initReveal();
initFeaturedVideo();
initCopyButtons();
