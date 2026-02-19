export default async function handler(req, res) {
  try {
    const { path, ...queryParams } = req.query;
    const tmdbPath = Array.isArray(path) ? path.join('/') : path;
    const query = new URLSearchParams(queryParams).toString();

    const url = `https://api.themoviedb.org/3/${tmdbPath}${query ? `?${query}` : ''}`;

    const apiKey = process.env.TMDB_API_KEY || process.env.REACT_APP_TMDB_API_KEY;

    const tmdbRes = await fetch(url, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await tmdbRes.text();

    res.status(tmdbRes.status);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('CDN-Cache-Control', 'no-store');
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: String(err) });
  }
}
