/**
 * Cloudflare Worker for serving static assets
 */

export default {
  async fetch(request, env, ctx) {
    try {
      // Get the URL path
      const url = new URL(request.url);
      
      // Set the default path to index.html for root requests
      if (url.pathname === '/' || url.pathname === '') {
        return fetch(`${url.origin}/index.html`);
      }
      
      // Serve the requested file
      return fetch(`${url.origin}${url.pathname}`);
    } catch (e) {
      // Return a 404 for any errors
      return new Response('Not Found', { status: 404 });
    }
  }
}; 