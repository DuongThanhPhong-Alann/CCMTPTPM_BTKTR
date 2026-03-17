const fs = require("node:fs");
const path = require("node:path");

function loadSlides() {
  const slideshowDir = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "public",
    "Images",
    "slideshow",
  );

  try {
    const files = fs
      .readdirSync(slideshowDir, { withFileTypes: true })
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name)
      .filter((name) => /\.(jpe?g|png|webp)$/i.test(name))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    if (files.length > 0) {
      return files.map((name) => ({
        src: `/Images/slideshow/${encodeURIComponent(name)}`,
        alt: `Slide ${name}`,
      }));
    }
  } catch {
    // Ignore and fall back below.
  }

  return ["01.jpg", "02.jpg", "03.jpg", "04.jpg"].map((name) => ({
    src: `/Images/slideshow/${name}`,
    alt: `Slide ${name}`,
  }));
}

function index(req, res) {
  res.render("home/index", {
    title: "GreenAge",
    slides: loadSlides(),
    projects: [
      {
        title: "ullam ut neque neque",
        imageSrc: "/Images/tooplate_image_01.jpg",
        text: "Etiam ut nibh et urna cursus ultrices nec vel nunc. In hac habitasse platea dictumst.",
      },
      {
        title: "Sed aliquam mauris",
        imageSrc: "/Images/tooplate_image_02.jpg",
        text: "Donec ullamcorper feugiat nunc ut tempus. Sed sodales, nibh ut ultrices pulvinar.",
      },
      {
        title: "Aliquam aliquet sem",
        imageSrc: "/Images/tooplate_image_03.jpg",
        text: "Praesent auctor quam quis libero venenatis dapibus. Donec ullamcorper feugiat nunc.",
      },
    ],
  });
}

module.exports = { index };
