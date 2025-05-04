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
    
    try {
      // Use Cloudflare's built-in asset handler for Workers Sites
      // The __STATIC_CONTENT binding is automatically created by Wrangler
      return await env.__STATIC_CONTENT.fetch(new Request(url.pathname === '/' ? '/index.html' : url.pathname, request));
    } catch (e) {
      // If the asset is not found, return a 404
      return new Response("Not Found", { status: 404 });
    }
  }
}; 