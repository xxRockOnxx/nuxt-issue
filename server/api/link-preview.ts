import createMetascraper from "metascraper";
import MetascraperImage from "metascraper-image";

const metascraper = createMetascraper([MetascraperImage()]);

export default defineEventHandler((event) => {
  const query = getQuery<{ url: string }>(event);

  if (!query.url) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing url query parameter",
    });
  }

  const finalUrl = query.url;

  return $fetch<string>(query.url, {
    redirect: "follow",
    responseType: "text",
  }).then((html) => {
    return metascraper({ html, url: finalUrl });
  });
});
