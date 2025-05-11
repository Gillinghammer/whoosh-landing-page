/**
 * The handler function for the Cloudflare Worker.
 * This serves the static Whoosh website with any additional processing if needed.
 */
export default {
  async fetch(request, env) {
    // Use the static assets handler provided by Cloudflare
    try {
      return await env.ASSETS.fetch(request);
    } catch (e) {
      // If the static asset isn't found, return a 404
      return new Response("Not Found", { status: 404 });
    }
  }
}; 