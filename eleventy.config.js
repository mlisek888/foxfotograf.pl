import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  // Każde <img> na stronie jest automatycznie zmniejszane i konwertowane do AVIF/WebP.
  // Dzięki temu w panelu można wrzucać pełne pliki prosto z aparatu.
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp", "jpeg"],
    widths: [480, 960, 1600, 2400, "auto"],
    failOnError: false,
    htmlOptions: {
      imgAttributes: { loading: "lazy", decoding: "async", sizes: "100vw" },
      pictureAttributes: {},
    },
  });

  eleventyConfig.addGlobalData("rok", new Date().getFullYear());
  eleventyConfig.addGlobalData("wersja", Date.now().toString(36));
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  eleventyConfig.addCollection("wpisy", (api) =>
    api.getFilteredByGlob("src/wpisy/*.md").sort((a, b) => b.date - a.date)
  );

  const miesiace = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
  eleventyConfig.addFilter("dataPL", (d) => {
    const x = new Date(d);
    return `${x.getDate()} ${miesiace[x.getMonth()]} ${x.getFullYear()}`;
  });
  eleventyConfig.addFilter("dataISO", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("telLink", (t) => "+48" + String(t).replace(/\D/g, "").slice(-9));
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
