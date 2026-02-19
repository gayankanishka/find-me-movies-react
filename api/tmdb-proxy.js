export default async function handler(req, res) {
  try {
    const path = req.query.path.join('/');
    const query = new URLSearchParams(req.query).toString();

    const url = `https://api.themoviedb.org/3/${path}?${query}`;

    const tmdbRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await tmdbRes.text();

    res.status(tmdbRes.status);
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: String(err) });
  }
}
