/**
 * Cloudflare Worker for serving static assets from the site bucket
 */

export default {
  async fetch(request, env, ctx) {
    // Create a URL object to easily extract path components
    const url = new URL(request.url);
    let path = url.pathname;
    
    // Handle root requests by serving index.html
    if (path === "/" || path === "") {
      path = "/index.html";
    }
    
    // Construct a new Request to fetch from the static namespace
    const assetRequest = new Request(
      `${url.origin}${path}`,
      request
    );
    
    // Fetch from the static assets
    try {
      // Use Cloudflare's built-in asset handler
      return await env.ASSETS.fetch(assetRequest);
    } catch (e) {
      // If the asset is not found, return a 404
      return new Response("Not Found", { status: 404 });
    }
  }
}; 