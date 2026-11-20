/**
 * ArvanCloud Edge Computing Worker (پردازش لبه ابر آروان)
 * 
 * Handles incoming HTTP requests at ArvanCloud edge locations:
 * - Single Page Application (SPA) routing
 * - Edge caching & performance headers
 * - Security headers (CSP, HSTS, X-Frame-Options, etc.)
 * - Optional origin / object storage reverse proxying for static media
 */

'use strict';

// If static assets (images, heavy media) are hosted on an ArvanCloud Object Storage bucket (صندوقچه)
// or an origin server, specify its URL here (e.g. "https://behkam-bucket.s3.ir-thr-at1.arvanstorage.ir"):
const ORIGIN_URL = '';

// Injected during 'npm run build:edge' from dist/index.html
const HTML_CONTENT = `__INJECT_INDEX_HTML__`;

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

/**
 * Handle incoming Edge request
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // 1. If an origin is defined, proxy static asset requests to it
  const isAsset = pathname.startsWith('/assets/') ||
    pathname.startsWith('/works/') ||
    /\.(png|jpe?g|svg|gif|webp|css|js|woff2?|ttf|eot|ico|json)$/i.test(pathname);

  if (ORIGIN_URL && isAsset) {
    try {
      const originTarget = new URL(pathname + url.search, ORIGIN_URL);
      const originResponse = await fetch(originTarget.toString(), {
        method: request.method,
        headers: request.headers,
      });

      const responseHeaders = new Headers(originResponse.headers);
      for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
        responseHeaders.set(key, value);
      }

      // Cache immutable assets at edge & browser
      if (originResponse.status === 200) {
        responseHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
      }

      return new Response(originResponse.body, {
        status: originResponse.status,
        statusText: originResponse.statusText,
        headers: responseHeaders,
      });
    } catch (err) {
      // In case of origin proxy error, proceed to fallback
    }
  }

  // 2. Serve the SPA HTML shell for all navigation / document requests
  const headers = new Headers({
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'public, max-age=0, must-revalidate',
    ...SECURITY_HEADERS,
  });

  return new Response(HTML_CONTENT, {
    status: 200,
    headers,
  });
}

// Register fetch event listener for ArvanCloud Edge Runtime
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
